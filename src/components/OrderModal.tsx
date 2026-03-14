import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: { orderId: string; amount: number }) => void;
}

const PRICE = 3499;
const PRODUCT_NAME = "Greenchef JAWA Cooktop";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

const OrderModal = ({ open, onClose, onSuccess }: OrderModalProps) => {
  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalPrice = PRICE * quantity;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = "Enter valid 10-digit phone";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state) errs.state = "Select a state";
    if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter valid 6-digit pincode";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-order", {
        body: { ...form, quantity, price: totalPrice },
      });

      if (error || !data?.success) {
        throw new Error(data?.error || "Failed to place order");
      }

      onSuccess({ orderId: data.order_id, amount: totalPrice });
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-input rounded-lg px-4 py-3 text-base font-body focus:outline-none focus:ring-2 focus:ring-ring";
  const errorClass = "text-price-strike text-xs mt-1";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Place Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className={inputClass} maxLength={100} />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className={inputClass} maxLength={10} />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
          <div>
            <textarea name="address" placeholder="Full Address" value={form.address} onChange={handleChange} className={inputClass} rows={2} maxLength={500} />
            {errors.address && <p className={errorClass}>{errors.address}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input name="city" placeholder="City" value={form.city} onChange={handleChange} className={inputClass} maxLength={100} />
              {errors.city && <p className={errorClass}>{errors.city}</p>}
            </div>
            <div>
              <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className={inputClass} maxLength={6} />
              {errors.pincode && <p className={errorClass}>{errors.pincode}</p>}
            </div>
          </div>
          <div>
            <select name="state" value={form.state} onChange={handleChange} className={inputClass}>
              <option value="">Select State</option>
              {indianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.state && <p className={errorClass}>{errors.state}</p>}
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Quantity</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-input flex items-center justify-center font-bold text-lg">−</button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(5, quantity + 1))} className="w-10 h-10 rounded-lg border border-input flex items-center justify-center font-bold text-lg">+</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-section-alt rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-sm">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>{PRODUCT_NAME} × {quantity}</span>
              <span className="font-semibold">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Payment</span>
              <span className="font-medium text-primary">Cash on Delivery</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              `Place Order — ₹${totalPrice.toLocaleString("en-IN")}`
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
