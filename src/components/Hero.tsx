"use client";

import React from "react";
import { Button } from "./ui/Button";
import { WhatsAppButton } from "./WhatsAppButton";
import { Award, Users, Globe } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("matriculas");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-r from-primary-800 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Logo/Brand */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Matrículas
                <span className="block text-white">2025</span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-xl lg:text-2xl text-blue-100">
                Aprenda inglês com a <strong>tradição e qualidade</strong> da
                Cultura Inglesa em Teresina
              </p>

              <ul className="space-y-3 text-lg">
                <li className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-accent-500 flex-shrink-0" />
                  <span>Professores certificados</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-accent-500 flex-shrink-0" />
                  <span>Turmas para todas as idades (3 anos+)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-accent-500 flex-shrink-0" />
                  <span>Certificação reconhecida em 150+ países</span>
                </li>
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToForm}
                className="bg-primary-900 hover:bg-primary-950 text-white border-0"
              >
                Garantir Minha Vaga
              </Button>

              <WhatsAppButton
                phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
                variant="inline"
                className="border-1"
                message="Olá! Gostaria de saber mais sobre as matrículas 2025 da Cultura Inglesa Teresina."
              />
            </div>

            <div className="pt-6 border-t border-blue-400">
              <p className="text-blue-200 text-sm">
                <strong>🎯 Vagas limitadas!</strong> Garante sua matrícula com
                condições especiais.
              </p>
            </div>
          </div>

          {/* Right Column - Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Estudantes Cultura Inglesa
                  </h3>
                  <p className="text-primary-100">
                    Imagem será adicionada aqui
                  </p>
                </div>
              </div> */}
              <img
                src="/images/hero-new.jpeg"
                alt="Estudantes da Cultura Inglesa"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -left-4 bg-white text-red-800 p-4 rounded-xl shadow-lg z-20">
              <div className="text-2xl font-bold">75+</div>
              <div className="text-sm">Anos de tradição</div>
            </div>

            {/* <div className="absolute -bottom-4 -right-4 bg-primary-900 text-white p-4 rounded-xl shadow-lg z-20">
              <div className="text-2xl font-bold">Cambridge</div>
              <div className="text-sm">Certificação</div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

// "use client";

// import React from "react";
// import { Button } from "./ui/Button";
// import { WhatsAppButton } from "./WhatsAppButton";
// import { Award, Users, Globe } from "lucide-react";

// export const Hero: React.FC = () => {
//   const scrollToForm = () => {
//     const formSection = document.getElementById("matriculas");
//     formSection?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <section className="relative bg-gradient-to-br from-[#fc0404] via-[#fe0002] to-[#fc0814] text-white overflow-hidden">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

//       <div className="container mx-auto px-4 py-20 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Column - Content */}
//           <div className="space-y-8">
//             {/* Logo/Brand */}
//             <div className="space-y-4">
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
//                 Matrículas
//                 <span className="block text-white">2025</span>
//               </h1>
//             </div>

//             <div className="space-y-6">
//               <p className="text-xl lg:text-2xl text-blue-100">
//                 Aprenda inglês com a <strong>tradição e qualidade</strong> da
//                 Cultura Inglesa em Teresina
//               </p>

//               <ul className="space-y-3 text-lg">
//                 <li className="flex items-center space-x-3">
//                   <Award className="h-6 w-6 text-accent-500 flex-shrink-0" />
//                   <span>Professores certificados Cambridge</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                   <Users className="h-6 w-6 text-accent-500 flex-shrink-0" />
//                   <span>Turmas para todas as idades (4 anos+)</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                   <Globe className="h-6 w-6 text-accent-500 flex-shrink-0" />
//                   <span>Certificação reconhecida em 150+ países</span>
//                 </li>
//               </ul>
//             </div>

//             {/* CTAs */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 variant="secondary"
//                 size="lg"
//                 onClick={scrollToForm}
//                 className="bg-primary-900 hover:bg-primary-950 text-white border-0"
//               >
//                 Garantir Minha Vaga
//               </Button>

//               <WhatsAppButton
//                 phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
//                 variant="inline"
//                 className="border-2 bg-white  border-white text-green-600 hover:text-green-800"
//                 message="Olá! Gostaria de saber mais sobre as matrículas 2025 da Cultura Inglesa Teresina."
//               />
//             </div>

//             <div className="pt-6 border-t border-blue-400">
//               <p className="text-blue-200 text-sm">
//                 <strong>🎯 Vagas limitadas!</strong> Garante sua matrícula com
//                 condições especiais.
//               </p>
//             </div>
//           </div>

//           {/* Right Column - Image/Visual */}
//           <div className="relative">
//             <div className="relative z-10">
//               {/* <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white">
//                 <div className="text-center">
//                   <h3 className="text-2xl font-bold mb-2">
//                     Estudantes Cultura Inglesa
//                   </h3>
//                   <p className="text-primary-100">
//                     Imagem será adicionada aqui
//                   </p>
//                 </div>
//               </div> */}
//               <img
//                 src="/images/gallery/hero-student-smiling-younger.jpeg"
//                 alt="Estudantes da Cultura Inglesa"
//                 className="rounded-2xl shadow-2xl w-full"
//               />
//             </div>

//             {/* Floating cards */}
//             <div className="absolute -top-4 -left-4 bg-white text-red-800 p-4 rounded-xl shadow-lg z-20">
//               <div className="text-2xl font-bold">75+</div>
//               <div className="text-sm">Anos de tradição</div>
//             </div>

//             <div className="absolute -bottom-4 -right-4 bg-primary-900 text-white p-4 rounded-xl shadow-lg z-20">
//               <div className="text-2xl font-bold">Cambridge</div>
//               <div className="text-sm">Certificação</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom wave */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg
//           viewBox="0 0 1440 120"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
//             fill="white"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// };
