// src/components/FormSection.tsx

"use client";

import React from "react";
import { ContactForm } from "./ContactForm";
import { ImageCarousel } from "./ui/ImageCarousel";
import { CheckCircle, Award, Users, Clock, MessageCircle } from "lucide-react";

export const FormSection: React.FC = () => {
  const scrollToForm = () => {
    const formElement = document.querySelector("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      // Focus on the first input field
      const firstInput = formElement.querySelector(
        'input[name="name"]'
      ) as HTMLInputElement;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

  // School carousel images
  const schoolImages = [
    {
      src: "/images/school-front-1.jpeg",
      alt: "Fachada da Cultura Inglesa Teresina",
      title: "Nossa Escola",
      description: "Localização de fácil acesso",
    },
    {
      src: "/images/school-2.jpg", // You'll need to add this image
      alt: "Recepção da Cultura Inglesa",
      title: "Salas Modernas",
      description: "Ambiente preparado para o melhor aprendizado",
    },
    {
      src: "/images/form-image-2.jpeg", // You'll need to add this image
      alt: "Alunos da Cultura Inglesa Teresina",
      title: "Recursos Completos",
      description: "Alunos da Cultura Inglesa de Teresina",
    },
  ];

  return (
    <section id="matriculas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Call to Action & Benefits */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Garanta a sua vaga
                <span className="block text-primary-600">
                  Matrículas 2025.2
                </span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                Não perca a oportunidade de fazer parte da maior rede de ensino
                de inglês do Brasil.
                <strong className="text-primary-700"> Vagas limitadas!</strong>
              </p>
            </div>

            {/* School Images Carousel */}
            <div className="relative">
              <ImageCarousel
                images={schoolImages}
                className="w-full h-80 lg:h-96"
                imageClassName="h-80"
                autoPlay={true}
                autoPlayInterval={4500}
                showDots={true}
                showArrows={true}
              />
            </div>

            {/* Benefits List */}
            {/* <div className="bg-primary-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Por que escolher a Cultura Inglesa?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    75+ anos de tradição no ensino de inglês
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    Professores certificados e experientes
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    Certificação Cambridge reconhecida mundialmente
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700">
                    Turmas para todas as idades (3 anos+)
                  </span>
                </div>
              </div>
            </div> */}

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle className="h-6 w-6" />
                <h3 className="text-xl font-bold">
                  Fale Conosco Pelo WhatsApp
                </h3>
              </div>
              <p className="text-primary-100 mb-4">
                Para receber atendimento personalizado, preencha o formulário ao
                lado. Após enviar seus dados, você será direcionado
                automaticamente para o nosso WhatsApp!
              </p>
              <button
                onClick={scrollToForm}
                className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Preencher Formulário
              </button>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:sticky lg:top-8">
            <ContactForm showMessageField={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

// src/components/FormSection.tsx

// "use client";

// import React from "react";
// import { ContactForm } from "./ContactForm";
// import { CheckCircle, Award, Users, Clock, MessageCircle } from "lucide-react";

// export const FormSection: React.FC = () => {
//   const scrollToForm = () => {
//     const formElement = document.querySelector("form");
//     if (formElement) {
//       formElement.scrollIntoView({ behavior: "smooth", block: "center" });
//       // Focus on the first input field
//       const firstInput = formElement.querySelector(
//         'input[name="name"]'
//       ) as HTMLInputElement;
//       if (firstInput) {
//         setTimeout(() => firstInput.focus(), 500);
//       }
//     }
//   };

//   return (
//     <section id="matriculas" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//           {/* Left Side - Call to Action & Benefits */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//                 Garanta a sua vaga
//                 <span className="block text-primary-600">Matrículas 2025</span>
//               </h2>

//               <p className="text-xl text-gray-600 leading-relaxed">
//                 Não perca a oportunidade de fazer parte da maior rede de ensino
//                 de inglês do Brasil.
//                 <strong className="text-primary-700"> Vagas limitadas!</strong>
//               </p>
//             </div>

//             {/* Image/Video Placeholder */}
//             <div className="relative rounded-2xl overflow-hidden shadow-xl">
//               <div className="w-full h-78 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
//                 <div className="text-center">
//                   <h3 className="text-xl font-bold mb-2">
//                     Conheça Nossa Escola
//                   </h3>
//                   <img
//                     src="/images/form-image-1.jpeg"
//                     alt="Fachada da Cultura Inglesa"
//                     className="rounded-2xl shadow-2xl w-fit py-1"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Benefits List */}
//             <div className="bg-primary-50 rounded-2xl p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">
//                 Por que escolher a Cultura Inglesa?
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
//                   <span className="text-gray-700">
//                     75+ anos de tradição no ensino de inglês
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
//                   <span className="text-gray-700">
//                     Professores certificados e experientes
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
//                   <span className="text-gray-700">
//                     Certificação Cambridge reconhecida mundialmente
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
//                   <span className="text-gray-700">
//                     Turmas para todas as idades (3 anos+)
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Call to Action */}
//             <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white rounded-2xl p-6">
//               <div className="flex items-center space-x-3 mb-3">
//                 <MessageCircle className="h-6 w-6" />
//                 <h3 className="text-xl font-bold">
//                   Fale Conosco Pelo WhatsApp
//                 </h3>
//               </div>
//               <p className="text-primary-100 mb-4">
//                 Para receber atendimento personalizado, preencha o formulário ao
//                 lado. Após enviar seus dados, você será direcionado
//                 automaticamente para o nosso WhatsApp!
//               </p>
//               <button
//                 onClick={scrollToForm}
//                 className="bg-white text-primary-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
//               >
//                 Preencher Formulário
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Contact Form */}
//           <div className="lg:sticky lg:top-8">
//             <ContactForm showMessageField={false} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
