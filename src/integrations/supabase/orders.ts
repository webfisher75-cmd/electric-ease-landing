import { supabase } from "./client";
import type { Database } from "./types";

export type OrderInsert = Database['public']['Tables']['orders']['Insert'];

export const createOrder = async (orderData: OrderInsert) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw error;
  }

  return data;
};
