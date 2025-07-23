"use client";

import React from "react";
import { ContactForm } from "./ContactForm";
import { WhatsAppButton } from "./WhatsAppButton";
import { CheckCircle, Award, Users, Clock } from "lucide-react";

export const FormSection: React.FC = () => {
  return (
    <section id="matriculas" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Call to Action & Benefits */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Garanta a sua vaga
                <span className="block text-primary-600">Matrículas 2025</span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                Não perca a oportunidade de fazer parte da maior rede de ensino
                de inglês do Brasil.
                <strong className="text-primary-700"> Vagas limitadas!</strong>
              </p>
            </div>

            {/* Key Benefits */}
            {/* <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Por que se matricular agora?
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Condições Especiais
                    </h4>
                    <p className="text-gray-600">
                      Descontos exclusivos para matrículas até dezembro
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Certificação Cambridge
                    </h4>
                    <p className="text-gray-600">
                      Reconhecida em mais de 150 países
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-accent-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Turmas Reduzidas
                    </h4>
                    <p className="text-gray-600">
                      Máximo 12 alunos por turma para atenção personalizada
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Horários Flexíveis
                    </h4>
                    <p className="text-gray-600">
                      Manhã, tarde e noite - escolha o que funciona para você
                    </p>
                  </div>
                </li>
              </ul>
            </div> */}

            {/* Image/Video Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-78 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">
                    Conheça Nossa Escola
                  </h3>
                  <img
                    src="/images/form-image-1.jpeg"
                    alt="Fachada da Cultura Inglesa"
                    className="rounded-2xl shadow-2xl w-fit py-1"
                  />
                  {/* <p className="text-primary-100">
                    Imagem/vídeo será adicionada aqui
                  </p> */}
                </div>
              </div>

              {/* Play button overlay for future video */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                </div>
              </div> */}
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-primary-600 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Precisa de informações rápidas?
              </h3>
              <p className="text-primary-100 mb-4">
                Fale conosco agora mesmo pelo WhatsApp!
              </p>
              <WhatsAppButton
                phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
                variant="inline"
                className="bg-white text-primary-700 hover:bg-gray-100 border-0"
                message="Olá! Vi o site da Cultura Inglesa Teresina e gostaria de informações sobre as matrículas 2025."
              />
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
