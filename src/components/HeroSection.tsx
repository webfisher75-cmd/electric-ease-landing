import heroImg from "@/assets/cooktop-hero.png";

interface HeroSectionProps {
  onOrderClick: () => void;
}

const HeroSection = ({ onOrderClick }: HeroSectionProps) => {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Gas Cylinder Shortage?{" "}
            <span className="text-primary">Switch to Electric Cooking Today.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto md:mx-0">
            A simple and reliable cooktop that helps you cook easily at home without depending on gas cylinders.
          </p>
          <div className="mb-6">
            <span className="text-3xl font-bold text-primary">₹3,999</span>
            <span className="ml-3 text-xl line-through text-price-strike">₹5,999</span>
            <span className="ml-2 text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">33% OFF</span>
          </div>
          <button
            onClick={onOrderClick}
            className="w-full md:w-auto bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Order Now
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img src={heroImg} alt="Greenchef JAWA Cooktop" className="w-72 md:w-96 drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
