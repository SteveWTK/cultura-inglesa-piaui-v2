// src\lib\types.ts
// Database Types - Update Lead interface
export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  email?: string; // 🔄 CHANGED: Made optional
  whatsapp: string;
  age_group?: string;
  course_interest?: string;
  message?: string;
  email_consent?: boolean; // 🔄 CHANGED: Made optional
  whatsapp_consent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

// Form Types - Update ContactFormData interface
export interface ContactFormData {
  name: string;
  email?: string; // 🔄 CHANGED: Made optional
  whatsapp: string;
  age_group?: string;
  course_interest?: string;
  message?: string;
  email_consent?: boolean; // 🔄 CHANGED: Made optional
  whatsapp_consent: boolean;
}

// Rest of the file stays the same...
export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
}

export interface BenefitData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WhatsAppMessageData {
  name: string;
  email?: string; // 🔄 CHANGED: Made optional
  whatsapp: string;
  course_interest: string;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const AGE_GROUPS: SelectOption[] = [
  { value: "", label: "Não especificado" },
  { value: "familia", label: "Para família (várias idades)" },
  { value: "criancas-4-6", label: "Crianças (4-6 anos)" },
  { value: "criancas-7-10", label: "Crianças (7-10 anos)" },
  { value: "adolescentes-11-14", label: "Adolescentes (11-14 anos)" },
  { value: "jovens-15-17", label: "Jovens (15-17 anos)" },
  { value: "adultos-18-plus", label: "Adultos (18+ anos)" },
];

export const COURSE_INTERESTS: SelectOption[] = [
  { value: "", label: "Informações gerais" },
  { value: "ingles-geral", label: "Inglês Geral" },
  { value: "preparatorio-cambridge", label: "Preparatório Cambridge" },
  { value: "conversacao", label: "Conversação" },
  { value: "business-english", label: "Business English" },
  { value: "intensivo", label: "Curso Intensivo" },
  { value: "online", label: "Aulas Online" },
  { value: "kids", label: "Inglês para Crianças" },
];
