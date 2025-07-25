"use client";

import React, { useState } from "react";
import { Star, MessageCircle, Heart } from "lucide-react";
import { InstagramCard } from "./InstagramCard";

interface TestimonialItem {
  id: string;
  type: "instagram" | "image";
  name: string;
  role: string;
  content: string;
  src: string;
  thumbnail?: string; // For Instagram cards
  rating?: number;
  platform?: string;
  color: string;
}

const testimonialData: TestimonialItem[] = [
  // Instagram video testimonials with your actual URLs
  {
    id: "instagram-1",
    type: "instagram",
    name: "Maria Julia Passos",
    role: "ex aluna",
    content:
      "Foi uma experiência muito forte na minha vida que me impactou muito!",
    src: "https://www.instagram.com/reel/DGddXlUO1Q1/?utm_source=ig_web_copy_link",
    thumbnail: "/images/testimonials/testimonial-v1.png", // Optional screenshot
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "instagram-2",
    type: "instagram",
    name: "Taynan",
    role: "aluna",
    content:
      "A Cultura Inglesa preza mais pela conversação e prepara mais a gente para o dia a dia!",
    src: "https://www.instagram.com/reel/C-VUas0gX75/?igsh=b2t1czFjaGQweWNn",
    thumbnail: "/images/testimonials/testimonial-v2.png",
    color: "from-orange-400 to-red-500",
  },
  // {
  //   id: "instagram-3",
  //   type: "instagram",
  //   name: "Vitor",
  //   role: "ex aluno; estudante universitário na Florida",
  //   content:
  //     "Fazer o curso foi importante tanto para eu me adaptar nos Estados Unidos quanto para fazer o exame de proficiência.",
  //   src: "https://www.instagram.com/reel/C7zt_4uvsnV/?utm_source=ig_web_copy_link",
  //   thumbnail: "/images/testimonials/testimonial-v3.png",
  //   color: "from-purple-400 to-pink-500",
  // },

  {
    id: "instagram-4",
    type: "instagram",
    name: "Emilia",
    role: "mãe de aluna",
    content:
      "A gente sempre teve a Cultura Inglesa como modelo de cursos de idiomas aqui em Teresina!",
    src: "https://www.instagram.com/reel/C-Ats4dOjku/?utm_source=ig_web_copy_link",
    thumbnail: "/images/testimonials/testimonial-v4.png",
    color: "from-purple-400 to-pink-500",
  },
  // Review screenshots (same as before)
  {
    id: "review-1",
    type: "image",
    name: "Luan Pablo dos Santos Silva",
    role: "Google Reviews",
    content:
      "Não é apenas Escola de lingua, é uma imersão na cultura inglesa de forma lúdica e eficiente",
    src: "/images/testimonials/testimonial-s1.jpeg",
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
    src: "/images/testimonials/testimonial-s2.jpeg",
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
    src: "/images/testimonials/testimonial-s3.jpeg",
    rating: 5,
    platform: "Google",
    color: "from-yellow-400 to-orange-500",
  },
];

export const Testimonials: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<TestimonialItem | null>(
    null
  );

  const openImageModal = (testimonial: TestimonialItem) => {
    if (testimonial.type === "image") {
      setSelectedImage(testimonial);
    }
    // Instagram videos will open directly in new tab
  };

  const closeImageModal = () => {
    setSelectedImage(null);
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

        {/* Staggered Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`${
                  index % 3 === 0
                    ? "lg:mt-0"
                    : index % 3 === 1
                    ? "lg:mt-8"
                    : "lg:mt-4"
                }`}
              >
                {testimonial.type === "instagram" ? (
                  /* Instagram Card */
                  <InstagramCard
                    name={testimonial.name}
                    role={testimonial.role}
                    content={testimonial.content}
                    instagramUrl={testimonial.src}
                    color={testimonial.color}
                    thumbnail={testimonial.thumbnail}
                  />
                ) : (
                  /* Review Card - Same as before */
                  <div
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    onClick={() => openImageModal(testimonial)}
                  >
                    <div
                      className={`relative bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1`}
                    >
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

                        {/* Review badge */}
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

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
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

      {/* Image Modal (for reviews only) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col">
            <button
              onClick={closeImageModal}
              className="absolute -top-10 right-2 text-white hover:text-red-400 transition-colors z-30 bg-black/50 rounded-full p-2"
            >
              ✕
            </button>

            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-8">
                <img
                  src={selectedImage.src}
                  alt={`Review de ${selectedImage.name}`}
                  className="w-full max-h-96 object-contain mx-auto rounded-lg"
                />
              </div>

              {/* <div className="p-4 bg-gray-50">
                <h3 className="font-bold text-lg text-gray-900">
                  {selectedImage.name}
                </h3>
                <p className="text-gray-600 text-sm">{selectedImage.role}</p>
                <p className="text-gray-700 mt-2 italic">
                  &quot;{selectedImage.content}&quot;
                </p>

                {selectedImage.rating && (
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="flex space-x-1">
                      {[...Array(selectedImage.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      • {selectedImage.platform}
                    </span>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// "use client";

// import React, { useState } from "react";
// import { X, Star, MessageCircle, Heart, Instagram } from "lucide-react";
// import { InstagramEmbed } from "./InstagramEmbed";

// interface TestimonialItem {
//   id: string;
//   type: "instagram" | "image";
//   name: string;
//   role: string;
//   content: string;
//   src: string; // Instagram URL or review screenshot
//   rating?: number;
//   platform?: string;
//   color: string;
// }

// const testimonialData: TestimonialItem[] = [
//   // Instagram video testimonials
//   {
//     id: "instagram-1",
//     type: "instagram",
//     name: "Maria Julia Passos",
//     role: "Aluna",
//     content:
//       "Foi uma experiência muito forte na minha vida que me impactou muito!",
//     src: "https://www.instagram.com/reel/DGddXlUO1Q1/?utm_source=ig_web_copy_link", // Replace with actual Instagram URL
//     color: "from-pink-400 to-rose-500",
//   },
//   {
//     id: "instagram-2",
//     type: "instagram",
//     name: "Taynan",
//     role: "Aluna",
//     content: "",
//     src: "https://www.instagram.com/reel/C-VUas0gX75/?igsh=b2t1czFjaGQweWNn", // Replace with actual Instagram URL
//     color: "from-orange-400 to-red-500",
//   },
//   {
//     id: "instagram-3",
//     type: "instagram",
//     name: "Emília, mãe da Letícia,",
//     role: "Mãe de aluna",
//     content: "",
//     src: "https://www.instagram.com/reel/C-Ats4dOjku/?utm_source=ig_web_copy_link", // Replace with actual Instagram URL
//     color: "from-purple-400 to-pink-500",
//   },

//   // Review screenshots (keep small images)
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

//         {/* Staggered Layout */}
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
//                 {testimonial.type === "instagram" ? (
//                   /* 📱 INSTAGRAM VIDEO CARD */
//                   <div className="group">
//                     <div
//                       className={`relative bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1 cursor-pointer`}
//                       onClick={() => openModal(testimonial)}
//                     >
//                       {/* Instagram Embed Container */}
//                       <div className="bg-white rounded-2xl overflow-hidden h-80 md:h-96 relative">
//                         <InstagramEmbed
//                           url={testimonial.src}
//                           className="w-full h-full"
//                         />

//                         {/* Overlay with testimonial info */}
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
//                           <h3 className="font-bold text-lg">
//                             {testimonial.name}
//                           </h3>
//                           <p className="text-sm opacity-90">
//                             {testimonial.role}
//                           </p>
//                         </div>

//                         {/* Instagram badge */}
//                         <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full">
//                           <Instagram className="h-4 w-4" />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Quote below video */}
//                     <div className="mt-4 text-center">
//                       <p className="text-gray-700 italic">
//                         &quot;{testimonial.content}&quot;
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   /* 📝 REVIEW CARD - Same as before */
//                   <div
//                     className="group cursor-pointer"
//                     onClick={() => openModal(testimonial)}
//                   >
//                     <div
//                       className={`relative bg-gradient-to-br ${testimonial.color} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 p-1`}
//                     >
//                       <div className="bg-white rounded-2xl p-6 h-80 md:h-96 flex flex-col">
//                         {/* Platform badge */}
//                         <div className="flex items-center justify-between mb-4">
//                           <div
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               testimonial.platform === "Google"
//                                 ? "bg-blue-100 text-blue-700"
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
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="mt-20 text-center">
//           <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
//             <div className="absolute inset-0 opacity-10">
//               <Heart className="absolute top-4 left-4 h-8 w-8" />
//               <Heart className="absolute top-8 right-8 h-6 w-6" />
//               <Heart className="absolute bottom-6 left-8 h-7 w-7" />
//             </div>

//             <div className="relative z-10">
//               <h3 className="text-3xl lg:text-4xl font-bold mb-4">
//                 Seja o próximo caso de sucesso!
//               </h3>
//               <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
//                 Junte-se a centenas de alunos que já transformaram suas vidas
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

//       {/* Modal for larger view */}
//       {selectedMedia && (
//         <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
//           <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col">
//             <button
//               onClick={closeModal}
//               className="absolute -top-10 right-2 text-white hover:text-red-400 transition-colors z-30 bg-black/50 rounded-full p-2"
//             >
//               <X className="h-6 w-6" />
//             </button>

//             <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
//               {selectedMedia.type === "instagram" ? (
//                 <div className="h-96">
//                   <InstagramEmbed
//                     url={selectedMedia.src}
//                     className="w-full h-full"
//                   />
//                 </div>
//               ) : (
//                 <div className="p-8">
//                   <img
//                     src={selectedMedia.src}
//                     alt={`Review de ${selectedMedia.name}`}
//                     className="w-full max-h-96 object-contain mx-auto rounded-lg"
//                   />
//                 </div>
//               )}

//               {/* <div className="p-4 bg-gray-50">
//                 <h3 className="font-bold text-lg text-gray-900">
//                   {selectedMedia.name}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{selectedMedia.role}</p>
//                 <p className="text-gray-700 mt-2 italic">
//                   &quot;{selectedMedia.content}&quot;
//                 </p>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };
