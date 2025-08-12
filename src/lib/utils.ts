// src/lib/utils.ts - Enhanced UTM tracking

import { type ClassValue, clsx } from "clsx";

// Utility for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Smart phone number formatting for WhatsApp
export function formatWhatsAppNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // If it starts with 55 (Brazil country code), use as is
  if (cleaned.startsWith("55") && cleaned.length >= 12) {
    return cleaned;
  }

  // If it's a Brazilian number without country code
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `55${cleaned.substring(1)}`;
  }
  if (cleaned.length === 11 && !cleaned.startsWith("0")) {
    return `55${cleaned}`;
  }
  if (cleaned.length === 10) {
    return `55${cleaned}`;
  }

  // For international numbers, keep as is (assume they included country code)
  if (cleaned.length >= 12) {
    return cleaned;
  }

  // Default: add Brazil country code if uncertain
  return `55${cleaned}`;
}

// Generate WhatsApp message
export function generateWhatsAppMessage(data: {
  name: string;
  email?: string;
  whatsapp: string;
  course_interest: string;
  message?: string;
}): string {
  let message = `Olá! Meu nome é ${data.name} e tenho interesse em fazer um curso na Cultura Inglesa Teresina.\n\n`;
  message += `\n Gostaria de receber mais informações sobre matrículas e horários disponíveis. Obrigado!`;
  return encodeURIComponent(message);
}

// 🆕 ENHANCED UTM PARAMETERS TRACKING
export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string; // NEW
  url_referrer?: string; // NEW - full original URL
}

// Get UTM parameters from URL + referrer information
export function getUTMParameters(): UTMParameters {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);

    // Get all UTM parameters
    const utmParams: UTMParameters = {
      utm_source: urlParams.get("utm_source") || undefined,
      utm_medium: urlParams.get("utm_medium") || undefined,
      utm_campaign: urlParams.get("utm_campaign") || undefined,
      utm_content: urlParams.get("utm_content") || undefined, // NEW
    };

    // Get full original URL with all parameters
    const fullUrl = window.location.href;
    if (fullUrl) {
      utmParams.url_referrer = fullUrl;
    }

    // Debug logging (remove in production if needed)
    console.log("🎯 UTM Parameters captured:", utmParams);

    return utmParams;
  } catch (error) {
    console.error("Error capturing UTM parameters:", error);
    return {};
  }
}

// 🆕 STORE UTM PARAMETERS IN SESSION STORAGE FOR PERSISTENCE
export function storeUTMParameters(): void {
  if (typeof window === "undefined") return;

  try {
    const utmParams = getUTMParameters();

    // Only store if we have at least one UTM parameter
    const hasUTMData = Object.values(utmParams).some(
      (value) => value !== undefined
    );

    if (hasUTMData) {
      // Store with timestamp for potential expiry
      const utmData = {
        ...utmParams,
        captured_at: new Date().toISOString(),
        page_captured: window.location.pathname,
      };

      sessionStorage.setItem("utm_parameters", JSON.stringify(utmData));
      console.log("🎯 UTM parameters stored in session:", utmData);
    }
  } catch (error) {
    console.error("Error storing UTM parameters:", error);
  }
}

// 🆕 GET STORED UTM PARAMETERS (FOR FORMS ON DIFFERENT PAGES)
export function getStoredUTMParameters(): UTMParameters {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem("utm_parameters");
    if (stored) {
      const utmData = JSON.parse(stored);
      console.log("🎯 Using stored UTM parameters:", utmData);

      // Return just the UTM parameters, not the metadata
      const { captured_at, page_captured, ...utmParams } = utmData;
      return utmParams;
    }

    // Fallback to current URL parameters
    return getUTMParameters();
  } catch (error) {
    console.error("Error retrieving stored UTM parameters:", error);
    return getUTMParameters();
  }
}

// Format phone for display (works with international)
export function formatBrazilianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  // Brazilian format
  if (
    cleaned.length === 11 ||
    (cleaned.startsWith("55") && cleaned.length === 13)
  ) {
    const localNumber = cleaned.startsWith("55")
      ? cleaned.substring(2)
      : cleaned;
    if (localNumber.length === 11) {
      return localNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  }

  // International format - just add spaces for readability
  if (cleaned.length > 11) {
    return `+${cleaned}`;
  }

  // Fallback
  return phone;
}

// Validate any phone number (more permissive)
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 8 && cleaned.length <= 15;
}

// import { type ClassValue, clsx } from "clsx";

// // Utility for combining CSS classes
// export function cn(...inputs: ClassValue[]) {
//   return clsx(inputs);
// }

// // Smart phone number formatting for WhatsApp
// export function formatWhatsAppNumber(phone: string): string {
//   // Remove all non-numeric characters
//   const cleaned = phone.replace(/\D/g, "");

//   // If it starts with 55 (Brazil country code), use as is
//   if (cleaned.startsWith("55") && cleaned.length >= 12) {
//     return cleaned;
//   }

//   // If it's a Brazilian number without country code
//   if (cleaned.length === 11 && cleaned.startsWith("0")) {
//     return `55${cleaned.substring(1)}`;
//   }
//   if (cleaned.length === 11 && !cleaned.startsWith("0")) {
//     return `55${cleaned}`;
//   }
//   if (cleaned.length === 10) {
//     return `55${cleaned}`;
//   }

//   // For international numbers, keep as is (assume they included country code)
//   if (cleaned.length >= 12) {
//     return cleaned;
//   }

//   // Default: add Brazil country code if uncertain
//   return `55${cleaned}`;
// }

// // Generate WhatsApp message (updated)
// export function generateWhatsAppMessage(data: {
//   name: string;
//   email?: string; // 🔄 CHANGED: Made optional
//   whatsapp: string;
//   course_interest: string;
//   message?: string;
// }): string {
//   let message = `Olá! Meu nome é ${data.name} e tenho interesse em fazer um curso na Cultura Inglesa Teresina.\n\n`;

//   // 🔄 CHANGED: Only include email if provided
//   // if (data.email && data.email.trim()) {
//   //   message += `📧 Email: ${data.email}\n`;
//   // }

//   // message += `📱 WhatsApp: ${data.whatsapp}\n`;
//   // message += `📚 Curso de interesse: ${data.course_interest}\n`;

//   // if (data.message) {
//   //   message += `\n💬 Mensagem adicional: ${data.message}\n`;
//   // }

//   message += `\n Gostaria de receber mais informações sobre matrículas e horários disponíveis. Obrigado!`;

//   return encodeURIComponent(message);
// }

// // Get UTM parameters from URL
// export function getUTMParameters(): {
//   utm_source?: string;
//   utm_medium?: string;
//   utm_campaign?: string;
// } {
//   if (typeof window === "undefined") return {};

//   const urlParams = new URLSearchParams(window.location.search);

//   return {
//     utm_source: urlParams.get("utm_source") || undefined,
//     utm_medium: urlParams.get("utm_medium") || undefined,
//     utm_campaign: urlParams.get("utm_campaign") || undefined,
//   };
// }

// // Format phone for display (works with international)
// export function formatBrazilianPhone(phone: string): string {
//   const cleaned = phone.replace(/\D/g, "");

//   // Brazilian format
//   if (
//     cleaned.length === 11 ||
//     (cleaned.startsWith("55") && cleaned.length === 13)
//   ) {
//     const localNumber = cleaned.startsWith("55")
//       ? cleaned.substring(2)
//       : cleaned;
//     if (localNumber.length === 11) {
//       return localNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
//     }
//   }

//   // International format - just add spaces for readability
//   if (cleaned.length > 11) {
//     return `+${cleaned}`;
//   }

//   // Fallback
//   return phone;
// }

// // Validate any phone number (more permissive)
// export function isValidPhone(phone: string): boolean {
//   const cleaned = phone.replace(/\D/g, "");
//   return cleaned.length >= 8 && cleaned.length <= 15;
// }
