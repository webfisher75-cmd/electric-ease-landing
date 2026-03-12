import { CheckCircle } from "lucide-react";

interface OrderConfirmationProps {
  orderId: string;
  paymentId: string;
  amount: number;
}

const OrderConfirmation = ({ orderId, paymentId, amount }: OrderConfirmationProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold font-display mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">Your order has been confirmed.</p>

        <div className="bg-section-alt rounded-xl p-5 space-y-3 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-medium text-xs">{orderId.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment ID</span>
            <span className="font-mono font-medium text-xs">{paymentId}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-border pt-3">
            <span className="font-semibold">Total Paid</span>
            <span className="font-bold text-primary text-lg">₹{amount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          You will receive a confirmation call on your registered phone number.
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
