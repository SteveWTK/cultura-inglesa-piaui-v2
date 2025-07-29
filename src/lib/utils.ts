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

// Generate WhatsApp message (updated)
export function generateWhatsAppMessage(data: {
  name: string;
  email?: string; // 🔄 CHANGED: Made optional
  whatsapp: string;
  course_interest: string;
  message?: string;
}): string {
  let message = `Olá! Meu nome é ${data.name} e tenho interesse em fazer um curso na Cultura Inglesa Teresina.\n\n`;

  // 🔄 CHANGED: Only include email if provided
  // if (data.email && data.email.trim()) {
  //   message += `📧 Email: ${data.email}\n`;
  // }

  // message += `📱 WhatsApp: ${data.whatsapp}\n`;
  // message += `📚 Curso de interesse: ${data.course_interest}\n`;

  // if (data.message) {
  //   message += `\n💬 Mensagem adicional: ${data.message}\n`;
  // }

  message += `\n Gostaria de receber mais informações sobre matrículas e horários disponíveis. Obrigado!`;

  return encodeURIComponent(message);
}

// Get UTM parameters from URL
export function getUTMParameters(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);

  return {
    utm_source: urlParams.get("utm_source") || undefined,
    utm_medium: urlParams.get("utm_medium") || undefined,
    utm_campaign: urlParams.get("utm_campaign") || undefined,
  };
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

// // Utility for combining CSS classes (useful with Tailwind)
// export function cn(...inputs: ClassValue[]) {
//   return clsx(inputs);
// }

// // Format phone number for WhatsApp link
// export function formatWhatsAppNumber(phone: string): string {
//   // Remove all non-numeric characters
//   const cleaned = phone.replace(/\D/g, "");

//   // Add country code if not present
//   if (cleaned.length === 11 && cleaned.startsWith("0")) {
//     return `55${cleaned.substring(1)}`;
//   }
//   if (cleaned.length === 11) {
//     return `55${cleaned}`;
//   }
//   if (cleaned.length === 13 && cleaned.startsWith("55")) {
//     return cleaned;
//   }

//   return cleaned;
// }

// // Generate WhatsApp message
// export function generateWhatsAppMessage(data: {
//   name: string;
//   email: string;
//   whatsapp: string;
//   course_interest: string;
//   message?: string;
// }): string {
//   let message = `Olá! Meu nome é ${data.name} e tenho interesse em fazer um curso na Cultura Inglesa Teresina.\n\n`;
//   message += `📧 Email: ${data.email}\n`;
//   message += `📱 WhatsApp: ${data.whatsapp}\n`;
//   message += `📚 Curso de interesse: ${data.course_interest}\n`;

//   if (data.message) {
//     message += `\n💬 Mensagem adicional: ${data.message}\n`;
//   }

//   message += `\nGostaria de receber mais informações sobre matrículas e horários disponíveis.`;

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

// // Format Brazilian phone number for display
// export function formatBrazilianPhone(phone: string): string {
//   const cleaned = phone.replace(/\D/g, "");

//   if (cleaned.length === 11) {
//     return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
//   }
//   if (cleaned.length === 10) {
//     return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
//   }

//   return phone;
// }

// // Validate Brazilian phone number
// export function isValidBrazilianPhone(phone: string): boolean {
//   const cleaned = phone.replace(/\D/g, "");
//   return cleaned.length === 10 || cleaned.length === 11;
// }
