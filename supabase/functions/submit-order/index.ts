import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, address, city, state, pincode, quantity, price } = await req.json();

    // Validate required fields
    if (!name || !phone || !address || !city || !state || !pincode || !quantity || !price) {
      throw new Error("All fields are required");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save order to database
    const { data: order, error: dbError } = await supabase
      .from("orders")
      .insert({
        name,
        phone,
        address,
        city,
        state,
        pincode,
        quantity,
        price,
        payment_id: `COD_${Date.now()}`,
        payment_status: "confirmed",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      throw new Error("Failed to save order");
    }

    // Send notification email
    try {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      if (LOVABLE_API_KEY) {
        const emailBody = `
New Order Received!

Order ID: ${order.id}
Name: ${name}
Phone: ${phone}
Address: ${address}, ${city}, ${state} - ${pincode}
Quantity: ${quantity}
Total Price: ₹${price.toLocaleString("en-IN")}
Date: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        `.trim();

        // Try to send via enqueue if email infra exists
        const { error: emailError } = await supabase.rpc("enqueue_email", {
          p_queue_name: "transactional_emails",
          p_to_email: "trendnest099@gmail.com",
          p_subject: `New Order #${order.id.slice(0, 8)} - ${name}`,
          p_html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${emailBody}</pre>`,
          p_message_id: `order-${order.id}`,
        });

        if (emailError) {
          console.log("Email enqueue not available (infra may not be set up yet):", emailError.message);
        }
      }
    } catch (emailErr: unknown) {
      const message = emailErr instanceof Error ? emailErr.message : String(emailErr);
      console.log("Email notification skipped:", message);
    }

    return new Response(
      JSON.stringify({ success: true, order_id: order.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error submitting order:", message);
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
