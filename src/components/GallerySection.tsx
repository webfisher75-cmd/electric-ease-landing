import topView from "@/assets/cooktop-top-view.png";
import controlPanel from "@/assets/cooktop-control-panel.png";
import modes from "@/assets/cooktop-modes.png";
import cooking from "@/assets/cooktop-cooking.jpg";

const images = [
  { src: topView, alt: "Product Top View" },
  { src: controlPanel, alt: "Control Panel Close-up" },
  { src: modes, alt: "Cooking Mode Icons" },
  { src: cooking, alt: "Cooking Example" },
];

const GallerySection = () => {
  return (
    <section className="bg-section-alt py-12 md:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Product Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {images.map((img) => (
            <div key={img.alt} className="bg-background rounded-xl overflow-hidden shadow-sm aspect-square flex items-center justify-center p-4">
              <img src={img.src} alt={img.alt} className="w-full h-full object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
