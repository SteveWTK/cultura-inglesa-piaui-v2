"use client";

import React, { useState } from "react";
import { Play, X, Star, MessageCircle, Heart } from "lucide-react";

interface TestimonialItem {
  id: string;
  type: "video" | "image";
  name: string;
  role: string;
  content: string;
  src: string; // Video file or review screenshot
  thumbnail?: string; // For videos
  rating?: number;
  platform?: string; // Google, Facebook, Instagram
  color: string; // Background gradient
}

const testimonialData: TestimonialItem[] = [
  // Video testimonials
  // {
  //   id: "video-1",
  //   type: "video",
  //   name: "Maria Julia Passos",
  //   role: "Aluna",
  //   content:
  //     "Foi uma experiência muito forte na minha vida que me impactou muito!",
  //   src: "/videos/testimonials/testimonial-1.mp4",
  //   thumbnail: "/images/testimonials/testimonial-1.png",
  //   color: "from-pink-400 to-rose-500",
  // },
  // {
  //   id: "video-2",
  //   type: "video",
  //   name: "Maria Julia Passos",
  //   role: "Aluna",
  //   content: "",
  //   src: "/videos/testimonials/testimonial-2.mp4",
  //   thumbnail: "/images/testimonials/testimonial-2.png",
  //   color: "from-orange-400 to-red-500",
  // },
  // {
  //   id: "video-3",
  //   type: "video",
  //   name: "Maria Julia Passos",
  //   role: "Aluna",
  //   content: "",
  //   src: "/videos/testimonials/testimonial-3.mp4",
  //   thumbnail: "/images/testimonials/testimonial-3.png",
  //   color: "from-purple-400 to-pink-500",
  // },

  // Review screenshots
  {
    id: "review-1",
    type: "image",
    name: "Luan Pablo dos Santos Silva",
    role: "Google Reviews",
    content:
      "Não é apenas Escola de lingua, é uma imersão na cultura inglesa de forma lúdica e eficiente",
    src: "/images/testimonials/testimonial-4.jpeg",
    rating: 5,
    platform: "Google",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "review-2",
    type: "image",
    name: "Arsênio Almeida Martins",
    role: "Google Reviews",
    content:
      "Escola muito bem organizada, com alta tecnologia, boa qualidade de ensino, e um diferencial: tem pessoal para pegar e deixar as criancas nos carros, dando nos tranquilidade e comodidade ao deixar e pegar nossos filhos!",
    src: "/images/testimonials/testimonial-5.jpeg",
    rating: 5,
    platform: "Google",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "review-3",
    type: "image",
    name: "Renan Bona",
    role: "Google Reviews",
    content: "Excelente curso de inglês. Fiz ótimos amigos e aprendi bastante.",
    src: "/images/testimonials/testimonial-6.jpeg",
    rating: 5,
    platform: "Google",
    color: "from-yellow-400 to-orange-500",
  },
];

export const Testimonials: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<TestimonialItem | null>(
    null
  );

  const openModal = (testimonial: TestimonialItem) => {
    setSelectedMedia(testimonial);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nossos alunos{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              amam
            </span>{" "}
            estudar aqui!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja depoimentos reais de quem já transformou sua vida com a Cultura
            Inglesa Teresina
          </p>
        </div>

        {/* 🎨 ALTERNATING STAGGERED LAYOUT */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`${
                  // Staggered heights for visual interest
                  index % 3 === 0
                    ? "lg:mt-0"
                    : index % 3 === 1
                    ? "lg:mt-8"
                    : "lg:mt-4"
                } transform hover:scale-105 transition-all duration-300`}
              >
                {testimonial.type === "video" ? (
                  /* 🎥 VIDEO TESTIMONIAL CARD */
                  <div
                    className="group cursor-pointer"
                    onClick={() => openModal(testimonial)}
                  >
                    <div
                      className={`relative h-80 md:h-96 bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      {/* Video thumbnail background */}
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                            <Play
                              className="h-8 w-8 text-white ml-1"
                              fill="currentColor"
                            />
                          </div>
                          <h3 className="font-bold text-lg mb-2">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm opacity-90 mb-2">
                            {testimonial.role}
                          </p>
                          <p className="text-sm leading-relaxed opacity-95">
                            {testimonial.content}
                          </p>
                        </div>
                      </div>

                      {/* Video thumbnail overlay */}
                      {testimonial.thumbnail && (
                        <img
                          src={testimonial.thumbnail}
                          alt={`${testimonial.name} video thumbnail`}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                        />
                      )}

                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                          <Play
                            className="h-10 w-10 text-white ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>

                      {/* Video badge */}
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>VÍDEO</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 📱 REVIEW SCREENSHOT CARD */
                  <div
                    className="group cursor-pointer"
                    onClick={() => openModal(testimonial)}
                  >
                    <div
                      className={`relative bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1`}
                    >
                      {/* Inner white card for review */}
                      <div className="bg-white rounded-2xl p-6 h-80 md:h-96 flex flex-col">
                        {/* Platform badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              testimonial.platform === "Google"
                                ? "bg-blue-100 text-blue-700"
                                : testimonial.platform === "Facebook"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {testimonial.platform}
                          </div>
                          {testimonial.rating && (
                            <div className="flex space-x-1">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-yellow-400"
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Review content */}
                        <div className="flex-1 flex flex-col justify-center">
                          <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                            &quot;{testimonial.content}&quot;
                          </blockquote>

                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center`}
                            >
                              <span className="text-white font-bold text-sm">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {testimonial.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Screenshot badge */}
                        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                          <MessageCircle className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Background hearts */}
            <div className="absolute inset-0 opacity-10">
              <Heart className="absolute top-4 left-4 h-8 w-8" />
              <Heart className="absolute top-8 right-8 h-6 w-6" />
              <Heart className="absolute bottom-6 left-8 h-7 w-7" />
              <Heart className="absolute bottom-4 right-6 h-5 w-5" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Seja o próximo caso de sucesso!
              </h3>
              <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                Junte-se a centenas de alunos que já transformaram suas vidas
                com a Cultura Inglesa Teresina
              </p>

              <button
                onClick={() => {
                  const formSection = document.getElementById("matriculas");
                  formSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Quero Me Matricular Agora! ❤️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🎥 IMPROVED MEDIA MODAL (Video + Image) - FIXED SIZE */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col">
            {/* FIXED Close Button - Now more visible */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-2 text-white hover:text-red-400 transition-colors z-30 bg-black/50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-full">
              {selectedMedia.type === "video" ? (
                /* FIXED Video Player - Smaller size */
                <div
                  className="relative bg-black flex-shrink-0"
                  style={{ aspectRatio: "9/16", maxHeight: "60vh" }}
                >
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    playsInline
                    poster={selectedMedia.thumbnail}
                    onError={(e) => {
                      console.error("Video failed to load:", selectedMedia.src);
                    }}
                    onLoadedData={() => {
                      console.log(
                        "Video loaded successfully:",
                        selectedMedia.src
                      );
                    }}
                  >
                    <source src={selectedMedia.src} type="video/mp4" />
                    <source src={selectedMedia.src} type="video/webm" />
                    <p className="text-white p-4">
                      Seu navegador não suporta vídeos HTML5.
                      <a
                        href={selectedMedia.src}
                        className="underline text-blue-300"
                      >
                        Clique aqui para baixar o vídeo.
                      </a>
                    </p>
                  </video>
                </div>
              ) : (
                /* Review Screenshot - Same as before */
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                  <img
                    src={selectedMedia.src}
                    alt={`Review de ${selectedMedia.name}`}
                    className="w-full max-h-96 object-contain mx-auto rounded-lg"
                    onError={() =>
                      console.error(
                        "Review image failed to load:",
                        selectedMedia.src
                      )
                    }
                  />
                </div>
              )}

              {/* FIXED Caption - Scrollable if needed */}
              {/* <div className="p-4 bg-gradient-to-r from-gray-50 to-white flex-shrink-0 max-h-32 overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {selectedMedia.name}
                </h3>
                <p className="text-gray-600 mb-2 text-sm">
                  {selectedMedia.role}
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {selectedMedia.content}
                </p>

                {selectedMedia.rating && (
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="flex space-x-1">
                      {[...Array(selectedMedia.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      • {selectedMedia.platform}
                    </span>
                  </div>
                )}
              </div> */}
            </div>

            {/* Mobile-friendly close hint */}
            <div className="text-center mt-4 text-white/70 text-sm">
              Pressione ESC ou clique no X para fechar
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// export const Testimonials: React.FC = () => {
//   const [selectedMedia, setSelectedMedia] = useState<TestimonialItem | null>(
//     null
//   );

//   const openModal = (testimonial: TestimonialItem) => {
//     setSelectedMedia(testimonial);
//   };

//   const closeModal = () => {
//     setSelectedMedia(null);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Nossos alunos{" "}
//             <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
//               amam
//             </span>{" "}
//             estudar aqui!
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Veja depoimentos reais de quem já transformou sua vida com a Cultura
//             Inglesa Teresina
//           </p>
//         </div>

//         {/* 🎨 ALTERNATING STAGGERED LAYOUT */}
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {testimonialData.map((testimonial, index) => (
//               <div
//                 key={testimonial.id}
//                 className={`${
//                   // Staggered heights for visual interest
//                   index % 3 === 0
//                     ? "lg:mt-0"
//                     : index % 3 === 1
//                     ? "lg:mt-8"
//                     : "lg:mt-4"
//                 } transform hover:scale-105 transition-all duration-300`}
//               >
//                 {testimonial.type === "video" ? (
//                   /* 🎥 VIDEO TESTIMONIAL CARD */
//                   <div
//                     className="group cursor-pointer"
//                     onClick={() => openModal(testimonial)}
//                   >
//                     <div
//                       className={`relative h-80 md:h-96 bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
//                     >
//                       {/* Video thumbnail background */}
//                       <div className="absolute inset-0 flex items-center justify-center text-white">
//                         <div className="text-center p-6">
//                           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
//                             <Play
//                               className="h-8 w-8 text-white ml-1"
//                               fill="currentColor"
//                             />
//                           </div>
//                           <h3 className="font-bold text-lg mb-2">
//                             {testimonial.name}
//                           </h3>
//                           <p className="text-sm opacity-90 mb-2">
//                             {testimonial.role}
//                           </p>
//                           <p className="text-sm leading-relaxed opacity-95">
//                             {testimonial.content}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Video thumbnail overlay */}
//                       {testimonial.thumbnail && (
//                         <img
//                           src={testimonial.thumbnail}
//                           alt={`${testimonial.name} video thumbnail`}
//                           className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
//                         />
//                       )}

//                       {/* Play button overlay */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
//                           <Play
//                             className="h-10 w-10 text-white ml-1"
//                             fill="currentColor"
//                           />
//                         </div>
//                       </div>

//                       {/* Video badge */}
//                       <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
//                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                         <span>VÍDEO</span>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   /* 📱 REVIEW SCREENSHOT CARD */
//                   <div
//                     className="group cursor-pointer"
//                     onClick={() => openModal(testimonial)}
//                   >
//                     <div
//                       className={`relative bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1`}
//                     >
//                       {/* Inner white card for review */}
//                       <div className="bg-white rounded-2xl p-6 h-80 md:h-96 flex flex-col">
//                         {/* Platform badge */}
//                         <div className="flex items-center justify-between mb-4">
//                           <div
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               testimonial.platform === "Google"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : testimonial.platform === "Facebook"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-gray-100 text-gray-700"
//                             }`}
//                           >
//                             {testimonial.platform}
//                           </div>
//                           {testimonial.rating && (
//                             <div className="flex space-x-1">
//                               {[...Array(testimonial.rating)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className="h-4 w-4 text-yellow-400"
//                                   fill="currentColor"
//                                 />
//                               ))}
//                             </div>
//                           )}
//                         </div>

//                         {/* Review content */}
//                         <div className="flex-1 flex flex-col justify-center">
//                           <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
//                             &quot;{testimonial.content}&quot;
//                           </blockquote>

//                           <div className="flex items-center space-x-3">
//                             <div
//                               className={`w-10 h-10 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center`}
//                             >
//                               <span className="text-white font-bold text-sm">
//                                 {testimonial.name.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="font-semibold text-gray-900">
//                                 {testimonial.name}
//                               </div>
//                               <div className="text-sm text-gray-600">
//                                 {testimonial.role}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Screenshot badge */}
//                         <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
//                           <MessageCircle className="h-4 w-4" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="mt-20 text-center">
//           <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
//             {/* Background hearts */}
//             <div className="absolute inset-0 opacity-10">
//               <Heart className="absolute top-4 left-4 h-8 w-8" />
//               <Heart className="absolute top-8 right-8 h-6 w-6" />
//               <Heart className="absolute bottom-6 left-8 h-7 w-7" />
//               <Heart className="absolute bottom-4 right-6 h-5 w-5" />
//             </div>

//             <div className="relative z-10">
//               <h3 className="text-3xl lg:text-4xl font-bold mb-4">
//                 Seja o próximo caso de sucesso!
//               </h3>
//               <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
//                 Junte-se a centenas de alunos que já transformaram suas vidas
//                 com a Cultura Inglesa Teresina
//               </p>

//               <button
//                 onClick={() => {
//                   const formSection = document.getElementById("matriculas");
//                   formSection?.scrollIntoView({ behavior: "smooth" });
//                 }}
//                 className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
//               >
//                 Quero Me Matricular Agora! ❤️
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🎥 IMPROVED MEDIA MODAL (Video + Image) */}
//       {selectedMedia && (
//         <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-2xl w-full">
//             <button
//               onClick={closeModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
//             >
//               <X className="h-8 w-8" />
//             </button>

//             <div className="relative bg-white rounded-2xl overflow-hidden">
//               {selectedMedia.type === "video" ? (
//                 /* Enhanced Video Player */
//                 <div className="aspect-[9/16] bg-black relative">
//                   {" "}
//                   {/* Portrait aspect ratio */}
//                   <video
//                     className="w-full h-full object-cover"
//                     controls
//                     autoPlay
//                     playsInline
//                     poster={selectedMedia.thumbnail}
//                     onError={(e) => {
//                       console.error("Video failed to load:", selectedMedia.src);
//                       console.log(
//                         "Trying to load video from:",
//                         selectedMedia.src
//                       );
//                     }}
//                     onLoadedData={() => {
//                       console.log(
//                         "Video loaded successfully:",
//                         selectedMedia.src
//                       );
//                     }}
//                   >
//                     <source src={selectedMedia.src} type="video/mp4" />
//                     <source src={selectedMedia.src} type="video/webm" />
//                     <p className="text-white p-4">
//                       Seu navegador não suporta vídeos HTML5.
//                       <a
//                         href={selectedMedia.src}
//                         className="underline text-blue-300"
//                       >
//                         Clique aqui para baixar o vídeo.
//                       </a>
//                     </p>
//                   </video>
//                   {/* Fallback if video doesn't load */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
//                     <div className="text-center p-8">
//                       <h3 className="text-xl font-bold mb-2">
//                         {selectedMedia.name}
//                       </h3>
//                       <p className="mb-4">{selectedMedia.content}</p>
//                       <p className="text-sm opacity-75">
//                         Vídeo em carregamento...
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* Review Screenshot */
//                 <div className="p-8 max-h-[80vh] overflow-y-auto">
//                   <img
//                     src={selectedMedia.src}
//                     alt={`Review de ${selectedMedia.name}`}
//                     className="w-full max-h-96 object-contain mx-auto rounded-lg"
//                     onError={() =>
//                       console.error(
//                         "Review image failed to load:",
//                         selectedMedia.src
//                       )
//                     }
//                   />
//                 </div>
//               )}

//               {/* Caption */}
//               <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {selectedMedia.name}
//                 </h3>
//                 <p className="text-gray-600 mb-3">{selectedMedia.role}</p>
//                 <p className="text-gray-700 leading-relaxed">
//                   {selectedMedia.content}
//                 </p>

//                 {selectedMedia.rating && (
//                   <div className="flex items-center space-x-2 mt-4">
//                     <div className="flex space-x-1">
//                       {[...Array(selectedMedia.rating)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-5 w-5 text-yellow-400"
//                           fill="currentColor"
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">
//                       • {selectedMedia.platform}
//                     </span>
//                   </div>
//                 )}

//                 {/* Debug info for videos */}
//                 {selectedMedia.type === "video" && (
//                   <div className="mt-4 text-xs text-gray-500">
//                     Video path: {selectedMedia.src}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// "use client";

// import React, { useState } from "react";
// import { Play, X, Star, MessageCircle, Heart } from "lucide-react";
// import { SimpleVideoPlayer } from "./SimpleVideoPlayer"; // Import the working video component

// interface TestimonialItem {
//   id: string;
//   type: "video" | "image";
//   name: string;
//   role: string;
//   content: string;
//   src: string;
//   thumbnail?: string;
//   rating?: number;
//   platform?: string;
//   color: string;
// }

// const testimonialData: TestimonialItem[] = [
//   // Video testimonials
//   {
//     id: "video-1",
//     type: "video",
//     name: "Maria Julia Passos",
//     role: "Aluna",
//     content:
//       "Foi uma experiência muito forte na minha vida que me impactou muito!",
//     src: "/videos/testimonial-1.mp4",
//     thumbnail: "/images/testimonials/testimonial-1.png",
//     color: "from-pink-400 to-rose-500",
//   },
//   {
//     id: "video-2",
//     type: "video",
//     name: "Maria Julia Passos",
//     role: "Aluna",
//     content: "",
//     src: "/videos/testimonial-2.mp4",
//     thumbnail: "/images/testimonials/testimonial-2.png",
//     color: "from-orange-400 to-red-500",
//   },
//   {
//     id: "video-3",
//     type: "video",
//     name: "Maria Julia Passos",
//     role: "Aluna",
//     content: "",
//     src: "/videos/testimonial-3.mp4",
//     thumbnail: "/images/testimonials/testimonial-3.png",
//     color: "from-purple-400 to-pink-500",
//   },

//   // Review screenshots
//   {
//     id: "review-1",
//     type: "image",
//     name: "Luan Pablo dos Santos Silva",
//     role: "Google Reviews",
//     content:
//       "Não é apenas Escola de lingua, é uma imersão na cultura inglesa de forma lúdica e eficiente",
//     src: "/images/testimonials/testimonial-4.jpeg",
//     rating: 5,
//     platform: "Google",
//     color: "from-blue-400 to-indigo-500",
//   },
//   {
//     id: "review-2",
//     type: "image",
//     name: "Arsênio Almeida Martins",
//     role: "Google Reviews",
//     content:
//       "Escola muito bem organizada, com alta tecnologia, boa qualidade de ensino, e um diferencial: tem pessoal para pegar e deixar as criancas nos carros, dando nos tranquilidade e comodidade ao deixar e pegar nossos filhos!",
//     src: "/images/testimonials/testimonial-5.jpeg",
//     rating: 5,
//     platform: "Google",
//     color: "from-green-400 to-emerald-500",
//   },
//   {
//     id: "review-3",
//     type: "image",
//     name: "Renan Bona",
//     role: "Google Reviews",
//     content: "Excelente curso de inglês. Fiz ótimos amigos e aprendi bastante.",
//     src: "/images/testimonials/testimonial-6.jpeg",
//     rating: 5,
//     platform: "Google",
//     color: "from-yellow-400 to-orange-500",
//   },
// ];

// export const Testimonials: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<TestimonialItem | null>(
//     null
//   );

//   const openImageModal = (testimonial: TestimonialItem) => {
//     if (testimonial.type === "image") {
//       setSelectedImage(testimonial);
//     }
//     // Videos will be handled by SimpleVideoPlayer directly
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
//       <div className="container mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Nossos alunos{" "}
//             <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
//               amam
//             </span>{" "}
//             estudar aqui!
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Veja depoimentos reais de quem já transformou sua vida com a Cultura
//             Inglesa Teresina
//           </p>
//         </div>

//         {/* 🎨 ALTERNATING STAGGERED LAYOUT */}
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {testimonialData.map((testimonial, index) => (
//               <div
//                 key={testimonial.id}
//                 className={`${
//                   index % 3 === 0
//                     ? "lg:mt-0"
//                     : index % 3 === 1
//                     ? "lg:mt-8"
//                     : "lg:mt-4"
//                 } transform hover:scale-105 transition-all duration-300`}
//               >
//                 {testimonial.type === "video" ? (
//                   /* 🎥 VIDEO WITH SIMPLE VIDEO PLAYER */
//                   <div className="group">
//                     <SimpleVideoPlayer
//                       src={testimonial.src}
//                       poster={testimonial.thumbnail}
//                       title={`${testimonial.name} - ${testimonial.role}`}
//                       className="h-80 md:h-96 rounded-3xl shadow-xl"
//                       type="mp4"
//                     />

//                     {/* Video info overlay */}
//                     <div
//                       className={`-mt-20 mx-4 relative z-10 bg-gradient-to-r ${testimonial.color} rounded-2xl p-4 text-white shadow-lg`}
//                     >
//                       <h3 className="font-bold text-lg">{testimonial.name}</h3>
//                       <p className="text-sm opacity-90 mb-2">
//                         {testimonial.role}
//                       </p>
//                       <p className="text-sm leading-relaxed">
//                         {testimonial.content}
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   /* 📱 REVIEW SCREENSHOT CARD */
//                   <div
//                     className="group cursor-pointer"
//                     onClick={() => openImageModal(testimonial)}
//                   >
//                     <div
//                       className={`relative bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1`}
//                     >
//                       {/* Inner white card for review */}
//                       <div className="bg-white rounded-2xl p-6 h-80 md:h-96 flex flex-col">
//                         {/* Platform badge */}
//                         <div className="flex items-center justify-between mb-4">
//                           <div
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               testimonial.platform === "Google"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : testimonial.platform === "Facebook"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-gray-100 text-gray-700"
//                             }`}
//                           >
//                             {testimonial.platform}
//                           </div>
//                           {testimonial.rating && (
//                             <div className="flex space-x-1">
//                               {[...Array(testimonial.rating)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className="h-4 w-4 text-yellow-400"
//                                   fill="currentColor"
//                                 />
//                               ))}
//                             </div>
//                           )}
//                         </div>

//                         {/* Review content */}
//                         <div className="flex-1 flex flex-col justify-center">
//                           <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
//                             &quot;{testimonial.content}&quot;
//                           </blockquote>

//                           <div className="flex items-center space-x-3">
//                             <div
//                               className={`w-10 h-10 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center`}
//                             >
//                               <span className="text-white font-bold text-sm">
//                                 {testimonial.name.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="font-semibold text-gray-900">
//                                 {testimonial.name}
//                               </div>
//                               <div className="text-sm text-gray-600">
//                                 {testimonial.role}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Screenshot badge */}
//                         <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
//                           <MessageCircle className="h-4 w-4" />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className="mt-20 text-center">
//           <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
//             {/* Background hearts */}
//             <div className="absolute inset-0 opacity-10">
//               <Heart className="absolute top-4 left-4 h-8 w-8" />
//               <Heart className="absolute top-8 right-8 h-6 w-6" />
//               <Heart className="absolute bottom-6 left-8 h-7 w-7" />
//               <Heart className="absolute bottom-4 right-6 h-5 w-5" />
//             </div>

//             <div className="relative z-10">
//               <h3 className="text-3xl lg:text-4xl font-bold mb-4">
//                 Seja o próximo caso de sucesso!
//               </h3>
//               <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
//                 Junte-se a centenas de alunos que já transformaram suas vidas
//                 com a Cultura Inglesa Teresina
//               </p>

//               <button
//                 onClick={() => {
//                   const formSection = document.getElementById("matriculas");
//                   formSection?.scrollIntoView({ behavior: "smooth" });
//                 }}
//                 className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
//               >
//                 Quero Me Matricular Agora! ❤️
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🎥 IMPROVED MEDIA MODAL (Video + Image) */}
//       {selectedMedia && (
//         <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-2xl w-full">
//             <button
//               onClick={closeModal}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
//             >
//               <X className="h-8 w-8" />
//             </button>

//             <div className="relative bg-white rounded-2xl overflow-hidden">
//               {selectedMedia.type === "video" ? (
//                 /* Enhanced Video Player */
//                 <div className="aspect-[9/16] bg-black relative">
//                   {" "}
//                   {/* Portrait aspect ratio */}
//                   <video
//                     className="w-full h-full object-cover"
//                     controls
//                     autoPlay
//                     playsInline
//                     poster={selectedMedia.thumbnail}
//                     onError={(e) => {
//                       console.error("Video failed to load:", selectedMedia.src);
//                       console.log(
//                         "Trying to load video from:",
//                         selectedMedia.src
//                       );
//                     }}
//                     onLoadedData={() => {
//                       console.log(
//                         "Video loaded successfully:",
//                         selectedMedia.src
//                       );
//                     }}
//                   >
//                     <source src={selectedMedia.src} type="video/mp4" />
//                     <source src={selectedMedia.src} type="video/webm" />
//                     <p className="text-white p-4">
//                       Seu navegador não suporta vídeos HTML5.
//                       <a
//                         href={selectedMedia.src}
//                         className="underline text-blue-300"
//                       >
//                         Clique aqui para baixar o vídeo.
//                       </a>
//                     </p>
//                   </video>
//                   {/* Fallback if video doesn't load */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
//                     <div className="text-center p-8">
//                       <h3 className="text-xl font-bold mb-2">
//                         {selectedMedia.name}
//                       </h3>
//                       <p className="mb-4">{selectedMedia.content}</p>
//                       <p className="text-sm opacity-75">
//                         Vídeo em carregamento...
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* Review Screenshot */
//                 <div className="p-8 max-h-[80vh] overflow-y-auto">
//                   <img
//                     src={selectedMedia.src}
//                     alt={`Review de ${selectedMedia.name}`}
//                     className="w-full max-h-96 object-contain mx-auto rounded-lg"
//                     onError={() =>
//                       console.error(
//                         "Review image failed to load:",
//                         selectedMedia.src
//                       )
//                     }
//                   />
//                 </div>
//               )}

//               {/* Caption */}
//               <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {selectedMedia.name}
//                 </h3>
//                 <p className="text-gray-600 mb-3">{selectedMedia.role}</p>
//                 <p className="text-gray-700 leading-relaxed">
//                   {selectedMedia.content}
//                 </p>

//                 {selectedMedia.rating && (
//                   <div className="flex items-center space-x-2 mt-4">
//                     <div className="flex space-x-1">
//                       {[...Array(selectedMedia.rating)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-5 w-5 text-yellow-400"
//                           fill="currentColor"
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">
//                       • {selectedMedia.platform}
//                     </span>
//                   </div>
//                 )}

//                 {/* Debug info for videos */}
//                 {selectedMedia.type === "video" && (
//                   <div className="mt-4 text-xs text-gray-500">
//                     Video path: {selectedMedia.src}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
