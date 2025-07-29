// src\components\WhatsAppButton.tsx

"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { formatWhatsAppNumber } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/analytics";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  variant?: "floating" | "inline";
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Olá! Gostaria de saber mais sobre os cursos da Cultura Inglesa Teresina.",
  className = "",
  variant = "floating",
}) => {
  const handleWhatsAppClick = () => {
    const formattedNumber = formatWhatsAppNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

    // Track conversion event safely
    trackWhatsAppClick(
      variant === "floating" ? "floating_button" : "inline_button"
    );

    window.open(whatsappURL, "_blank");
  };

  if (variant === "floating") {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 whatsapp-pulse ${className}`}
        aria-label="Entrar em contato via WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${className}`}
    >
      <MessageCircle size={20} className="mr-2" />
      Falar no WhatsApp
    </button>
  );
};
