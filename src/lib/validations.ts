import { z } from "zod";

// Brazilian phone number validation (more flexible)
const flexiblePhoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const brazilianPhoneRegex =
  /^(\+55\s?)?(\(?[0-9]{2}\)?\s?)?[0-9]{4,5}-?[0-9]{4}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),

  // 🔄 CHANGED: Email is now optional
  email: z.string().email("Email inválido").optional().or(z.literal("")), // Allow empty string

  whatsapp: z
    .string()
    .min(1, "WhatsApp é obrigatório")
    .refine((phone) => {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone.length < 8 || cleanPhone.length > 15) {
        return false;
      }
      return (
        flexiblePhoneRegex.test(phone.replace(/\D/g, "")) ||
        brazilianPhoneRegex.test(phone)
      );
    }, "Número inválido. Use formato brasileiro (86 99999-9999) ou internacional (+55 86 99999-9999)"),

  age_group: z.string().optional(),

  course_interest: z.string().optional(),

  message: z
    .string()
    .max(500, "Mensagem deve ter no máximo 500 caracteres")
    .optional(),

  // 🔄 CHANGED: Only WhatsApp consent is required now
  email_consent: z.boolean().optional(), // Made optional since email is optional

  whatsapp_consent: z
    .boolean()
    .refine(
      (val) => val === true,
      "É necessário autorizar comunicação por WhatsApp"
    ),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// import { z } from "zod";

// // More flexible phone validation that accepts international numbers
// const flexiblePhoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// // Brazilian phone specifically (for validation hints)
// const brazilianPhoneRegex =
//   /^(\+55\s?)?(\(?[0-9]{2}\)?\s?)?[0-9]{4,5}-?[0-9]{4}$/;

// export const contactFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, "Nome deve ter pelo menos 2 caracteres")
//     .max(50, "Nome deve ter no máximo 50 caracteres"),

//   email: z.string().min(1, "Email é obrigatório").email("Email inválido"),

//   whatsapp: z
//     .string()
//     .min(1, "WhatsApp é obrigatório")
//     .refine((phone) => {
//       // Remove all non-numeric characters
//       const cleanPhone = phone.replace(/\D/g, "");

//       // Must have at least 8 digits and max 15 (international standard)
//       if (cleanPhone.length < 8 || cleanPhone.length > 15) {
//         return false;
//       }

//       // Allow international format or Brazilian format
//       return (
//         flexiblePhoneRegex.test(phone.replace(/\D/g, "")) ||
//         brazilianPhoneRegex.test(phone)
//       );
//     }, "Número inválido. Use formato brasileiro (86 99999-9999) ou internacional (+55 86 99999-9999)"),

//   age_group: z.string().optional(),

//   course_interest: z.string().optional(),

//   message: z
//     .string()
//     .max(500, "Mensagem deve ter no máximo 500 caracteres")
//     .optional(),

//   email_consent: z
//     .boolean()
//     .refine(
//       (val) => val === true,
//       "É necessário autorizar comunicação por email"
//     ),

//   whatsapp_consent: z
//     .boolean()
//     .refine(
//       (val) => val === true,
//       "É necessário autorizar comunicação por WhatsApp"
//     ),
// });

// export type ContactFormInput = z.infer<typeof contactFormSchema>;
