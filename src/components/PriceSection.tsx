import { CountdownTimer } from "@/components/CountdownTimer";

interface PriceSectionProps {
  onOrderClick: () => void;
}

const PriceSection = ({ onOrderClick }: PriceSectionProps) => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Yours Today</h2>
        <p className="text-muted-foreground mb-6">Greenchef JAWA Cooktop</p>
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary">₹3,499</span>
          <span className="ml-3 text-2xl line-through text-price-strike">₹5,999</span>
        </div>
        <div className="mb-3 text-sm font-semibold text-red-600">⚠️ Only Few Pieces Left In Stock — Only 7 units left!</div>
        <div className="mb-5 max-w-sm mx-auto">
          <CountdownTimer />
        </div>
        <button
          onClick={onOrderClick}
          className="bg-primary text-primary-foreground font-bold text-lg px-12 py-4 rounded-lg hover:bg-primary/90 transition-colors w-full max-w-md"
        >
          Order Now — ₹3,499
        </button>
        <p className="text-sm text-muted-foreground mt-3">Cash on Delivery • Free Delivery</p>
      </div>
    </section>
  );
};

export default PriceSection;
