// src\components\ImageGallery.tsx

"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  height?: "short" | "medium" | "tall"; // For varied layout
}

// Update with your actual portrait images
const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/gallery/classroom-1.jpeg",
    alt: "Sala de aula moderna",
    caption: "Salas de aula modernas e equipadas",
    height: "tall",
  },
  {
    id: "2",
    src: "/images/gallery/gallery-5.jpeg",
    alt: "Alunos em aula",
    caption: "Alunos interagindo em aula dinâmica",
    height: "medium",
  },
  {
    id: "3",
    src: "/images/gallery/teachers-1.png",
    alt: "Professores certificados",
    caption: "Professores certificados",
    height: "short",
  },
  {
    id: "4",
    src: "/images/gallery/gallery-2.jpeg",
    alt: "Atividades especiais",
    caption: "Atividades especiais",
    height: "tall",
  },
  {
    id: "5",
    src: "/images/gallery/gallery-3.jpeg",
    alt: "",
    caption: "",
    height: "medium",
  },
  {
    id: "6",
    src: "/images/gallery/activities-1.jpeg",
    alt: "Cultura Maker",
    caption: "Espaço Cultura Maker",
    height: "short",
  },
  {
    id: "7",
    src: "/images/gallery/events-1.png",
    alt: "Eventos especiais ",
    caption: "Eventos e celebrações na escola",
    height: "medium",
  },
  {
    id: "8",
    src: "/images/gallery/gallery-4.jpeg",
    alt: "",
    caption: "",
    height: "tall",
  },
];

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const handleImageError = (imageId: string) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  const getHeightClass = (height: string = "medium") => {
    switch (height) {
      case "short":
        return "h-64 md:h-72"; // Shorter portrait
      case "tall":
        return "h-80 md:h-96 lg:h-[28rem]"; // Taller portrait
      case "medium":
      default:
        return "h-72 md:h-80 lg:h-96"; // Standard portrait
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Conheça nossa <span className="text-primary-600">escola</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Espaços modernos e inspiradores criados especialmente para acelerar
            seu aprendizado de inglês
          </p>
        </div>

        {/* 🎨 PINTEREST-STYLE MASONRY GRID FOR PORTRAIT IMAGES */}
        <div className="max-w-7xl mx-auto">
          {/* Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div key={image.id} className="break-inside-avoid mb-4">
                <div
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${getHeightClass(
                    image.height
                  )}`}
                  onClick={() => openModal(index)}
                >
                  {/* Beautiful gradient background for portrait orientation */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="font-bold text-sm md:text-base mb-2 leading-tight">
                        {image.caption}
                      </h3>
                      <p className="text-xs md:text-sm text-primary-100 opacity-90">
                        {imageErrors[image.id]
                          ? "Imagem em breve"
                          : "Carregando..."}
                      </p>
                    </div>
                  </div>

                  {/* Portrait image overlay */}
                  {!imageErrors[image.id] && (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-30"
                      onError={() => handleImageError(image.id)}
                      onLoad={() =>
                        console.log("Gallery image loaded:", image.src)
                      }
                    />
                  )}

                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-40">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-sm md:text-base mb-1 leading-tight">
                        {image.caption}
                      </h3>
                      <div className="w-8 h-0.5 bg-accent-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Hover play icon for visual interest */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Venha conhecer nossa escola pessoalmente!
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Agende uma visita e veja de perto todos os nossos diferenciais
            </p>
            <button
              onClick={() => {
                const formSection = document.getElementById("matriculas");
                formSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Agendar Visita Gratuita
            </button>
          </div>
        </div>
      </div>

      {/* 📱 ENHANCED MODAL FOR PORTRAIT IMAGES */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Portrait Image Container */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              {imageErrors[galleryImages[selectedImage].id] ? (
                <div className="w-full h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <h3 className="text-2xl font-bold mb-2">
                      {galleryImages[selectedImage].caption}
                    </h3>
                    <p className="text-primary-100">
                      Imagem em alta resolução será exibida aqui
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full max-h-[80vh] object-contain"
                  onError={() =>
                    handleImageError(galleryImages[selectedImage].id)
                  }
                />
              )}

              {/* Caption Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
                <h3 className="text-xl font-bold mb-2">
                  {galleryImages[selectedImage].caption}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-1 bg-accent-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">
                    Cultura Inglesa Teresina
                  </span>
                </div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="text-center mt-4 text-white">
              <span className="text-sm bg-black/50 px-3 py-1 rounded-full">
                {selectedImage + 1} de {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// "use client";

// import React, { useState } from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// interface GalleryImage {
//   id: string;
//   src: string;
//   alt: string;
//   caption?: string;
// }

// // Update with your actual images
// const galleryImages: GalleryImage[] = [
//   {
//     id: "1",
//     src: "/images/gallery/classroom-1.jpeg",
//     alt: "Sala de aula moderna",
//     caption: "Salas de aula modernas e equipadas",
//   },
//   {
//     id: "2",
//     src: "/images/gallery/students-1.jpeg",
//     alt: "Alunos em aula",
//     caption: "Alunos interagindo em aula dinâmica",
//   },
//   {
//     id: "3",
//     src: "/images/gallery/teachers-1.png",
//     alt: "Professores certificados",
//     caption: "Professores certificados Cambridge",
//   },
//   {
//     id: "4",
//     src: "/images/gallery/activities-1.jpeg",
//     alt: "Atividades especiais",
//     caption: "Atividades especiais e cooking classes",
//   },
//   {
//     id: "5",
//     src: "/images/gallery/certificates-1.jpeg",
//     alt: "Certificações",
//     caption: "Alunos recebendo certificações",
//   },
//   {
//     id: "6",
//     src: "/images/gallery/events-1.png",
//     alt: "Eventos especiais",
//     caption: "Eventos e celebrações na escola",
//   },
// ];

// export const ImageGallery: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<number | null>(null);
//   const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
//     {}
//   );

//   const openModal = (index: number) => {
//     setSelectedImage(index);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const nextImage = () => {
//     if (selectedImage !== null) {
//       setSelectedImage((selectedImage + 1) % galleryImages.length);
//     }
//   };

//   const prevImage = () => {
//     if (selectedImage !== null) {
//       setSelectedImage(
//         selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
//       );
//     }
//   };

//   const handleImageError = (imageId: string) => {
//     setImageErrors((prev) => ({ ...prev, [imageId]: true }));
//   };

//   // Handle keyboard navigation
//   React.useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (selectedImage !== null) {
//         if (e.key === "Escape") closeModal();
//         if (e.key === "ArrowRight") nextImage();
//         if (e.key === "ArrowLeft") prevImage();
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [selectedImage]);

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Conheça nossa <span className="text-primary-600">escola</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Espaços modernos e inspiradores criados especialmente para acelerar
//             seu aprendizado de inglês
//           </p>
//         </div>

//         {/* Image Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-40">
//           {galleryImages.map((image, index) => (
//             <div
//               key={image.id}
//               className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-64"
//               onClick={() => openModal(index)}
//             >
//               {/* Always show background gradient */}
//               <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h3 className="font-semibold mb-1">{image.caption}</h3>
//                   <p className="text-sm text-primary-100">
//                     {imageErrors[image.id]
//                       ? "Imagem em breve"
//                       : "Carregando..."}
//                   </p>
//                 </div>
//               </div>

//               {/* Image overlay (if exists and loads) */}
//               {!imageErrors[image.id] && (
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 z-20"
//                   onError={() => handleImageError(image.id)}
//                   onLoad={() => console.log("Gallery image loaded:", image.src)}
//                 />
//               )}

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end z-40">
//                 <div className="w-full p-4 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <h3 className="font-semibold text-sm">{image.caption}</h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-12">
//           <p className="text-lg text-gray-600 mb-6">
//             Venha conhecer nossa escola pessoalmente!
//           </p>
//           <button
//             onClick={() => {
//               const formSection = document.getElementById("matriculas");
//               formSection?.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
//           >
//             Agendar Visita
//           </button>
//         </div>
//       </div>

//       {/* Modal for Full-Size Images */}
//       {selectedImage !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-4xl w-full">
//             {/* Close Button */}
//             <button
//               onClick={closeModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
//             >
//               <X className="h-8 w-8" />
//             </button>

//             {/* Navigation Buttons */}
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
//             >
//               <ChevronLeft className="h-8 w-8" />
//             </button>

//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
//             >
//               <ChevronRight className="h-8 w-8" />
//             </button>

//             {/* Image */}
//             <div className="relative">
//               {imageErrors[galleryImages[selectedImage].id] ? (
//                 <div className="w-full h-96 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
//                   <div className="text-center text-white">
//                     <h3 className="text-2xl font-bold mb-2">
//                       {galleryImages[selectedImage].caption}
//                     </h3>
//                     <p className="text-primary-100">
//                       Imagem em alta resolução será exibida aqui
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <img
//                   src={galleryImages[selectedImage].src}
//                   alt={galleryImages[selectedImage].alt}
//                   className="w-full max-h-[80vh] object-contain rounded-lg"
//                   onError={() =>
//                     handleImageError(galleryImages[selectedImage].id)
//                   }
//                 />
//               )}

//               {/* Caption */}
//               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 rounded-b-lg">
//                 <h3 className="text-lg font-semibold">
//                   {galleryImages[selectedImage].caption}
//                 </h3>
//               </div>
//             </div>

//             {/* Image Counter */}
//             <div className="text-center mt-4 text-white">
//               <span className="text-sm">
//                 {selectedImage + 1} de {galleryImages.length}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
