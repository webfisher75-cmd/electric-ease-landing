import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import GallerySection from "@/components/GallerySection";
import PriceSection from "@/components/PriceSection";
import OrderModal from "@/components/OrderModal";
import OrderConfirmation from "@/components/OrderConfirmation";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    orderId: string;
    amount: number;
  } | null>(null);

  if (confirmation) {
    return <OrderConfirmation {...confirmation} />;
  }

  return (
    <>
      <HeroSection onOrderClick={() => setModalOpen(true)} />
      <ProblemSection />
      <BenefitsSection />
      <GallerySection />
      <PriceSection onOrderClick={() => setModalOpen(true)} />
      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={(data) => {
          setModalOpen(false);
          setConfirmation(data);
        }}
      />
    </>
  );
};

export default Index;
