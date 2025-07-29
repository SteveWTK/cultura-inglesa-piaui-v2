// src/app/obrigado/ThankYouContent.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, MessageCircle } from "lucide-react";
import { formatWhatsAppNumber } from "@/lib/utils";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function ThankYouContent() {
  const [countdown, setCountdown] = useState(5);
  const [hasRedirected, setHasRedirected] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the WhatsApp message from URL params
  const whatsappMessage = searchParams.get("message");
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  useEffect(() => {
    // If no message provided, redirect back to home
    if (!whatsappMessage) {
      router.replace("/");
      return;
    }

    // Start countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;

        // When countdown reaches 0, redirect to WhatsApp
        if (newCount <= 0 && !hasRedirected) {
          setHasRedirected(true);

          // Redirect to WhatsApp
          const formattedNumber = formatWhatsAppNumber(phoneNumber);
          const whatsappURL = `https://wa.me/${formattedNumber}?text=${whatsappMessage}`;

          // Track the conversion
          trackWhatsAppClick("thank_you_page_redirect");

          // Open WhatsApp
          window.open(whatsappURL, "_blank");

          // Redirect back to home after opening WhatsApp
          setTimeout(() => {
            router.replace("/");
          }, 1500);

          clearInterval(interval);
          return 0;
        }

        return newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [whatsappMessage, phoneNumber, router, hasRedirected]);

  const handleManualWhatsApp = () => {
    if (!whatsappMessage) return;

    setHasRedirected(true);
    const formattedNumber = formatWhatsAppNumber(phoneNumber);
    const whatsappURL = `https://wa.me/${formattedNumber}?text=${whatsappMessage}`;

    trackWhatsAppClick("thank_you_page_manual");
    window.open(whatsappURL, "_blank");

    setTimeout(() => {
      router.replace("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Thank You Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Obrigado por enviar suas informações!
          </h1>

          <p className="text-gray-600 mb-8">
            Recebemos seus dados com sucesso. Em breve entraremos em contato.
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                Em{" "}
                <strong className="text-primary-700 text-2xl">
                  {countdown}
                </strong>{" "}
                segundos, você será redirecionado para o WhatsApp.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Manual WhatsApp Button */}
          <button
            onClick={handleManualWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            disabled={hasRedirected}
          >
            <MessageCircle size={20} />
            Ir para WhatsApp Agora
          </button>

          {/* Back to Home Link */}
          <button
            onClick={() => router.replace("/")}
            className="w-full mt-4 text-gray-500 hover:text-primary-600 text-sm transition-colors duration-200"
          >
            Voltar ao site
          </button>
        </div>

        {/* Cultura Inglesa Branding */}
        <div className="text-center mt-6">
          <p className="text-primary-700 font-semibold">
            Cultura Inglesa Teresina
          </p>
          <p className="text-primary-600 text-sm">
            90+ anos ensinando inglês com excelência
          </p>
        </div>
      </div>
    </div>
  );
}
