import { ChefHat, Utensils, Briefcase, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: ChefHat,
    title: "Easy Cooking at Home",
    desc: "Simple controls and fast heating for everyday meals.",
  },
  {
    icon: Utensils,
    title: "Works with Stick & Non-Stick",
    desc: "Use any of your existing cookware — stick or non-stick utensils.",
    highlight: true,
  },
  {
    icon: Briefcase,
    title: "Portable Cooking Solution",
    desc: "Lightweight and compact. Use it anywhere — kitchen, hostel, or office.",
  },
  {
    icon: ShieldCheck,
    title: "Useful During Gas Shortage",
    desc: "Never worry about gas availability again. Just plug in and cook.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose Greenchef JAWA?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {benefits.map((b) => (
            <div
              key={b.title}
              className={`rounded-xl p-6 border transition-shadow ${
                b.highlight
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background shadow-sm"
              }`}
            >
              <b.icon className={`w-8 h-8 mb-3 ${b.highlight ? "text-primary" : "text-foreground"}`} />
              <h3 className="font-semibold text-lg mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
