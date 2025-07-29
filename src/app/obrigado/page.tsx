// src/app/obrigado/page.tsx

// src/app/obrigado/page.tsx

"use client";

import React, { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

// Loading component for Suspense fallback
const ThankYouLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
    <div className="max-w-md w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Carregando...</h1>
        <p className="text-gray-600">
          Preparando seu redirecionamento para o WhatsApp.
        </p>
      </div>
    </div>
  </div>
);

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouLoading />}>
      <ThankYouContent />
    </Suspense>
  );
}
