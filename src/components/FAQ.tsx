"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/Button";
import { WhatsAppButton } from "./WhatsAppButton";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Como ficar fluente em inglês?",
    answer:
      "Com atividades práticas, estimulamos a comunicação em situações reais do dia a dia para que crianças e adultos possam falar inglês com confiança. Para os níveis mais avançados, temos também aulas de conversação em inglês para viagens, estudos e muito mais.",
    icon: MessageCircle,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "2",
    question: "A partir de qual idade posso matricular meu filho?",
    answer:
      "Nosso curso de inglês para crianças começa a partir dos 4 anos, com atividades lúdicas e envolventes que despertam o interesse e criam uma relação afetuosa com o idioma, incentivando o aprendizado contínuo ao longo dos anos.",
    icon: Users,
    color: "from-green-400 to-green-600",
  },
  {
    id: "3",
    question: "Como saber em qual turma entrar?",
    answer:
      "O aluno passará por um teste de nivelamento para identificarmos a turma mais adequada ao seu nível de conhecimento e garantir uma experiência de aprendizado personalizada.",
    icon: BookOpen,
    color: "from-purple-400 to-purple-600",
  },

  // Easy to add more:
  // {
  //   id: '4',
  //   question: 'Qual é a duração dos cursos?',
  //   answer: 'A duração varia de acordo com o nível e objetivos do aluno...',
  //   icon: Clock,
  //   color: 'from-orange-400 to-orange-600'
  // }
];

export const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const openAll = () => {
    setOpenItems(new Set(faqData.map((item) => item.id)));
  };

  const closeAll = () => {
    setOpenItems(new Set());
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ainda com <span className="text-primary-600">dúvidas?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Saiba mais sobre os Cursos de Inglês da Cultura Inglesa Teresina
          </p>

          {/* Control buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={openAll}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium px-4 py-2 rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors"
            >
              Ver todas respostas
            </button>
            <button
              onClick={closeAll}
              className="text-sm text-gray-600 hover:text-gray-700 font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Fechar todas
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqData.map((item, index) => {
            const isOpen = openItems.has(item.id);
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Colorful Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                      >
                        {IconComponent && <IconComponent className="h-6 w-6" />}
                      </div>

                      {/* Question */}
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 pr-8">
                        {item.question}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronUp className="h-6 w-6 text-primary-600 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-400 transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <div className="px-6 pb-6">
                    <div className="pl-16">
                      {" "}
                      {/* Align with icon */}
                      <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary-300">
                        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-primary-600 rounded-2xl p-8 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-pattern opacity-10"></div>

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Fale conosco agora mesmo!
              </h3>
              <p className="text-xl text-blue-100 mb-6">
                Nossa equipe está pronta para ajudar você a escolher o melhor
                curso.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <WhatsAppButton
                  phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
                  variant="inline"
                  className="bg-green-500 hover:bg-green-600 border-0 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  message="Olá! Tenho algumas dúvidas sobre os cursos da Cultura Inglesa Teresina. Podem me ajudar?"
                />

                <span className="text-blue-200 text-sm">ou</span>

                <Button
                  onClick={() => {
                    const formSection = document.getElementById("matriculas");
                    formSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="secondary"
                  className="bg-white text-primary-700 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Preencher Formulário
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg">
            💡 <strong>Dica:</strong> Agende uma visita à nossa escola e conheça
            nossa metodologia de perto!
          </p>
        </div>
      </div>
    </section>
  );
};
