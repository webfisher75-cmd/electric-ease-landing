import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadRazorpayScript } from "@/lib/razorpay";
import { createOrder } from "@/integrations/supabase/orders";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter complete address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  pincode: z.string().min(6, "Please enter a valid 6-digit PIN code"),
  quantity: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface OrderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productPrice: number;
}

export function OrderDialog({ isOpen, onOpenChange, productPrice }: OrderDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ id: string; amount: number; paymentId: string } | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      quantity: "1",
    },
  });

  const quantity = parseInt(form.watch("quantity") || "1");
  const totalPrice = productPrice * quantity;

  const onSubmit = async (values: FormData) => {
    setIsProcessing(true);
    try {
      const res = await loadRazorpayScript();

      if (!res) {
        toast({
          title: "Payment gateway loading failed",
          description: "Are you online? Please verify your connection.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // NOTE: In a real production app, create an order ID from the backend using Razorpay Credentials.
      // For this demo, and as per the prompt requirements asking for Razorpay frontend integration,
      // we'll initiate checkout. Normally, `order_id` is required here.
      
      const options = {
        key: "rzp_test_YourTestKeyHere", // We will let the user pass this via env later if needed
        amount: totalPrice * 100, // Amount in paise
        currency: "INR",
        name: "Electric Ease",
        description: "Greenchef JAWA Cooktop Order",
        handler: async function (response: any) {
          try {
            // Save to database on success
            const orderData = {
              name: values.name,
              phone: values.phone,
              address: values.address,
              city: values.city,
              state: values.state,
              pincode: values.pincode,
              quantity: parseInt(values.quantity),
              price: totalPrice,
              payment_id: response.razorpay_payment_id,
              payment_status: 'success',
            };

            const savedOrder = await createOrder(orderData);
            
            // Track Facebook Purchase Event
            if (typeof (window as any).fbq === 'function') {
              (window as any).fbq('track', 'Purchase', { currency: 'INR', value: totalPrice });
            }
            
            setOrderDetails({
              id: savedOrder.id,
              paymentId: response.razorpay_payment_id,
              amount: totalPrice
            });
            
            setIsSuccess(true);
            toast({
              title: "Payment Successful",
              description: "Your order has been confirmed.",
            });
          } catch (error) {
            console.error("Database error:", error);
            toast({
              title: "Order saving failed",
              description: "Payment successful but failed to save order details. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: values.name,
          contact: values.phone,
        },
        theme: {
          color: "#ea384c", // Matching the UI's primary red
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDialog = () => {
    setIsSuccess(false);
    setOrderDetails(null);
    form.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Small delay before reset to allow close animation to play out
      setTimeout(resetDialog, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isSuccess ? "Order Confirmed!" : "Complete Your Order"}</DialogTitle>
          {!isSuccess && <DialogDescription>
            Please fill in your details below. Payment is PREPAID only.
          </DialogDescription>}
        </DialogHeader>

        {isSuccess && orderDetails ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-gray-900">Payment Successful</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4 text-left space-y-2 w-full">
                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">Order ID:</span> {orderDetails.id}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">Payment ID:</span> {orderDetails.paymentId}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-900">Amount Paid:</span> ₹{orderDetails.amount}</p>
              </div>
            </div>
            <Button onClick={() => handleOpenChange(false)} className="w-full mt-4">
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Raj Kumar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="9876543210" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Flat No, Street, Landmark" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>Quantity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select quantity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Unit</SelectItem>
                          <SelectItem value="2">2 Units</SelectItem>
                          <SelectItem value="3">3 Units</SelectItem>
                          <SelectItem value="4">4 Units</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Greenchef JAWA Cooktop</span>
                  <span>₹{productPrice} × {quantity}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3 border-b border-gray-200 pb-3">
                  <span>Payment Method</span>
                  <span className="font-semibold text-red-600 hover:text-red-700">Prepaid Only</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-lg" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Initializing Payment...
                  </>
                ) : (
                  `Pay ₹${totalPrice} Now`
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
