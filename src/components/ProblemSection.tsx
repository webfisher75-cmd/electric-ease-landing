import { Flame, Zap } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="bg-section-alt py-12 md:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tired of Waiting for Gas Cylinders?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Many households across India face frequent gas cylinder shortages and rising prices.
              Long waits, unpredictable delivery schedules, and increasing costs make daily cooking stressful.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Electric cooktops are the modern, convenient solution. Just plug in and start cooking — no gas cylinder, no waiting, no hassle.
            </p>
          </div>
          <div className="flex-1 flex justify-center gap-6">
            <div className="bg-background rounded-xl p-6 shadow-sm text-center flex-1 max-w-[180px]">
              <Flame className="w-10 h-10 text-price-strike mx-auto mb-3" />
              <p className="font-semibold text-sm">Gas Shortage</p>
              <p className="text-xs text-muted-foreground mt-1">Unpredictable supply</p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm text-center flex-1 max-w-[180px]">
              <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="font-semibold text-sm">Electric Cooking</p>
              <p className="text-xs text-muted-foreground mt-1">Always available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
