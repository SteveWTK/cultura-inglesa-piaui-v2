// src\components\Benefits.tsx
import React from "react";
import { Sparkles, Users, Award, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Espaços que Inspiram",
    description:
      "Curso de inglês presencial com espaços que estimulam o aprendizado e criatividade, como o Cultura Maker.",
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    icon: Users,
    title: "Aulas Divertidas e Estimulantes",
    description:
      "Aulas sempre divertidas e estimulantes, que exploram diferentes formas de aprendizado, com momentos de recreação, atividades de descompressão que aliviam o estresse e muito mais.",
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    icon: Award,
    title: "Certificação Internacional",
    description:
      "Todos os nossos professores são certificados e preparamos você para exames internacionais reconhecidos em mais de 150 países.",
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: MessageCircle,
    title: "Foco na Conversação",
    description:
      "Atividades práticas que estimulam a comunicação em situações reais do dia a dia para que você fale inglês com confiança desde o primeiro dia.",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

export const Benefits: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Por que escolher a{" "}
            <span className="text-primary-600">Cultura Inglesa?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 90 anos formando pessoas que transformam o mundo através do
            inglês. Descubra os diferenciais que fazem da Cultura Inglesa a
            escola de idiomas mais respeitada do Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className={`group p-8 ${benefit.bgColor} rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${benefit.borderColor} hover:scale-105`}
              >
                <div className="mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-gray-700 leading-relaxed text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent">
                90+
              </div>
              <div className="text-sm text-gray-600">Anos de experiência</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                150+
              </div>
              <div className="text-sm text-gray-600">Países reconhecem</div>
            </div>
            {/* <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Cambridge
              </div>
              <div className="text-sm text-gray-600">Parceria oficial</div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

// import React from "react";
// import {
//   Award,
//   Users,
//   BookOpen,
//   Clock,
//   Globe2,
//   MessageCircle,
// } from "lucide-react";

// const benefits = [
//   {
//     icon: Award,
//     title: "Professores Certificados Cambridge",
//     description:
//       "Todos os nossos professores possuem certificação pela Cambridge English e estão sempre em atualização para oferecer o melhor em ensino de inglês.",
//   },
//   {
//     icon: BookOpen,
//     title: "Metodologia Comprovada",
//     description:
//       "Método alinhado às diretrizes da UNESCO para o desenvolvimento das habilidades do século 21, promovendo criatividade e pensamento crítico.",
//   },
//   {
//     icon: Users,
//     title: "Para Todas as Idades",
//     description:
//       "Cursos especializados desde crianças de 4 anos até adultos, com atividades e abordagens adequadas para cada faixa etária.",
//   },
//   {
//     icon: MessageCircle,
//     title: "Foco na Conversação",
//     description:
//       "Atividades práticas que estimulam a comunicação em situações reais do dia a dia para que você fale inglês com confiança.",
//   },
//   {
//     icon: Clock,
//     title: "Horários Flexíveis",
//     description:
//       "Turmas com horários diversos para se encaixar na sua rotina, incluindo manhã, tarde e noite.",
//   },
//   {
//     icon: Globe2,
//     title: "Certificação Internacional",
//     description:
//       "Prepare-se para os exames de Cambridge e tenha seu inglês reconhecido em mais de 150 países ao redor do mundo.",
//   },
// ];

// export const Benefits: React.FC = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Por que escolher a{" "}
//             <span className="text-primary-600">Cultura Inglesa?</span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Mais de 75 anos formando pessoas que transformam o mundo através do
//             inglês. Descubra os diferenciais que fazem da Cultura Inglesa a
//             escola de idiomas mais respeitada do Brasil.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {benefits.map((benefit, index) => {
//             const IconComponent = benefit.icon;
//             return (
//               <div
//                 key={index}
//                 className="group p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 hover:scale-105 transition-all duration-300 cursor-pointer"
//               >
//                 <div className="mb-6">
//                   <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
//                     <IconComponent className="h-8 w-8 text-primary-600" />
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors">
//                   {benefit.title}
//                 </h3>

//                 <p className="text-gray-600 leading-relaxed">
//                   {benefit.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Trust indicators */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex items-center space-x-8 bg-gray-100 rounded-2xl px-8 py-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-primary-600">75+</div>
//               <div className="text-sm text-gray-600">Anos de experiência</div>
//             </div>
//             <div className="w-px h-12 bg-gray-300"></div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-primary-600">150+</div>
//               <div className="text-sm text-gray-600">Países reconhecem</div>
//             </div>
//             <div className="w-px h-12 bg-gray-300"></div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-primary-600">
//                 Cambridge
//               </div>
//               <div className="text-sm text-gray-600">Parceria oficial</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
