interface PriceSectionProps {
  onOrderClick: () => void;
}

const PriceSection = ({ onOrderClick }: PriceSectionProps) => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Yours Today</h2>
        <p className="text-muted-foreground mb-6">Greenchef JAWA Cooktop</p>
        <div className="mb-8">
          <span className="text-4xl font-bold text-primary">₹3,999</span>
          <span className="ml-3 text-2xl line-through text-price-strike">₹5,999</span>
        </div>
        <button
          onClick={onOrderClick}
          className="bg-primary text-primary-foreground font-bold text-lg px-12 py-4 rounded-lg hover:bg-primary/90 transition-colors w-full max-w-md"
        >
          Order Now — ₹3,999
        </button>
        <p className="text-sm text-muted-foreground mt-3">Prepaid Only • Free Delivery</p>
      </div>
    </section>
  );
};

export default PriceSection;
