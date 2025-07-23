// src/components/Footer.tsx
"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-6">
            <img
              src="/images/cultura-inglesa-logo-lion-h-transparent.png"
              alt="Cultura Inglesa Teresina"
              className="h-16 w-auto"
            />
            <p className="text-gray-300 leading-relaxed pr-8">
              Há mais de 75 anos formando pessoas no Brasil inteiro que
              transformam o mundo através do inglês. E há 18 anos impactando a
              vida de pessoas através do inglês em Teresina.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Rua Deputado Vitorino Correia, 2489</div>
                  <div>São Cristóvão, Teresina - PI</div>
                  <div>CEP: 64052-320</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent-500 flex-shrink-0" />
                <span className="text-gray-300">(86) 3133-0700</span>
              </div>

              {/* <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent-500 flex-shrink-0" />
                <span className="text-gray-300">
                  contato@culturainglesa-teresina.com.br
                </span>
              </div> */}
            </div>
          </div>

          {/* Operating Hours */}
          {/* <div className="space-y-6">
            <h3 className="text-xl font-bold">Horário de Funcionamento</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-accent-500 flex-shrink-0" />
                <div>
                  <div>Segunda a Sexta: 7h às 21h</div>
                  <div>Sábado: 8h às 17h</div>
                  <div>Domingo: Fechado</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Quick Actions */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Fale Conosco</h3>
            <div className="space-y-4">
              <WhatsAppButton
                phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
                variant="inline"
                className="w-[75%] justify-center"
                message="Olá! Gostaria de mais informações sobre os cursos da Cultura Inglesa Teresina."
              />
              <button
                onClick={() => {
                  const formSection = document.getElementById("matriculas");
                  formSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-[75%] bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Preencher Formulário
              </button>
            </div>

            {/* <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                <strong>Matrículas abertas!</strong>
                <br />
                Condições especiais até julho 2025.
              </p>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Cultura Inglesa Teresina. Todos os direitos
              reservados.
            </div>
            {/* <div className="flex space-x-6 text-sm">
              <a
                href="/politica-privacidade"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos-uso"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="/lgpd"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LGPD
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
