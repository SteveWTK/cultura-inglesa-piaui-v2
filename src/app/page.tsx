import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { FormSection } from "@/components/FormSection";
import { VideoSection } from "@/components/VideoSection";
import { ImageGallery } from "@/components/ImageGallery";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
// import { ImageDebug } from "@/components/ImageDebug";
// import { ImageDebugAdvanced } from "@/components/ImageDebugAdvanced";
// import { SimpleVideoPlayerDebug } from "@/components/SimpleVideoPlayerDebug";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* <ImageDebug /> */}
      <FormSection />
      <section id="benefits">
        <Benefits />
      </section>
      {/* <ImageDebugAdvanced />
      <SimpleVideoPlayerDebug /> */}
      <VideoSection />
      <section id="galeria">
        <ImageGallery />
      </section>
      <FAQ /> {/* Add the FAQ here */}
      <section id="depoimentos">
        <Testimonials />
      </section>
      <Footer />
    </main>
  );
}

// import { Hero } from "@/components/Hero";
// import { Benefits } from "@/components/Benefits";
// import { FormSection } from "@/components/FormSection";
// import { VideoSection } from "@/components/VideoSection";
// import { ImageGallery } from "@/components/ImageGallery";
// import { Testimonials } from "@/components/Testimonials";
// import { Footer } from "@/components/Footer";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen">
//       <Hero />
//       <FormSection />
//       <Benefits />
//       <VideoSection />
//       <ImageGallery />
//       <Testimonials />
//       <Footer />
//     </main>
//   );
// }
