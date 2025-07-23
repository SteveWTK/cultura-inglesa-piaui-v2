// src/components/ContactForm.tsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { WhatsAppButton } from "./WhatsAppButton";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
import { AGE_GROUPS, COURSE_INTERESTS } from "@/lib/types";
import { generateWhatsAppMessage, getUTMParameters } from "@/lib/utils";
import { trackFormSubmit } from "@/lib/analytics";

interface ContactFormProps {
  showMessageField?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  showMessageField = true,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      age_group: "",
      course_interest: "",
      message: "",
      email: "", // 🔄 CHANGED: Default empty string
      email_consent: false,
      whatsapp_consent: false,
    },
  });

  const watchedData = watch();

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);

    try {
      console.log("Submitting form data:", data);

      // Get UTM parameters
      const utmParams = getUTMParameters();

      // Submit to API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          utmParams,
        }),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (!result.success) {
        throw new Error(result.error || "Erro ao enviar formulário");
      }

      trackFormSubmit("contact_form");

      toast.success(
        "✅ Informações enviadas com sucesso! Redirecionando para WhatsApp..."
      );

      // Generate WhatsApp message
      const ageGroupLabel =
        AGE_GROUPS.find((a) => a.value === data.age_group)?.label ||
        "Não especificado";
      const courseLabel =
        COURSE_INTERESTS.find((c) => c.value === data.course_interest)?.label ||
        "Informações gerais";

      const whatsappMessage = generateWhatsAppMessage({
        name: data.name,
        email: data.email || "", // 🔄 CHANGED: Handle optional email
        whatsapp: data.whatsapp,
        course_interest: courseLabel,
        message: data.message,
      });

      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
      if (whatsappNumber) {
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        setTimeout(() => {
          window.open(whatsappURL, "_blank");
        }, 1500);
      }

      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        `❌ ${
          error instanceof Error
            ? error.message
            : "Erro ao enviar formulário. Tente novamente."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Matrículas Abertas 2025
        </h2>
        <p className="text-lg text-gray-600">
          Preencha o formulário e fale conosco no WhatsApp para garantir sua
          vaga!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome completo"
            placeholder="Seu nome completo"
            required
            {...register("name")}
            error={errors.name?.message}
          />

          {/* 🔄 CHANGED: Email is now optional */}
          <Input
            label="Email (opcional)"
            type="email"
            placeholder="seu@email.com (opcional)"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <Input
          label="WhatsApp"
          placeholder="(86) 99999-9999"
          required
          {...register("whatsapp")}
          error={errors.whatsapp?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Faixa etária (opcional)"
            placeholder="Selecione ou deixe em branco"
            options={AGE_GROUPS}
            {...register("age_group")}
            error={errors.age_group?.message}
          />

          <Select
            label="Curso de interesse (opcional)"
            placeholder="Selecione ou deixe em branco"
            options={COURSE_INTERESTS}
            {...register("course_interest")}
            error={errors.course_interest?.message}
          />
        </div>

        {showMessageField && (
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mensagem adicional (opcional)
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Conte-nos mais sobre seus objetivos ou dúvidas..."
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {/* 🔄 CHANGED: Email consent is now conditional */}
          {watchedData.email && (
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="email_consent"
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                {...register("email_consent")}
              />
              <label htmlFor="email_consent" className="text-sm text-gray-700">
                Autorizo receber comunicações da Cultura Inglesa por{" "}
                <strong>email</strong>.
              </label>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="whatsapp_consent"
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              {...register("whatsapp_consent")}
            />
            <label htmlFor="whatsapp_consent" className="text-sm text-gray-700">
              Autorizo receber comunicações da Cultura Inglesa por{" "}
              <strong>WhatsApp</strong>. *
            </label>
          </div>
          {errors.whatsapp_consent && (
            <p className="text-sm text-red-600">
              {errors.whatsapp_consent.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar e Falar no WhatsApp"}
          </Button>

          <div className="text-center text-gray-600 text-sm">ou</div>

          <WhatsAppButton
            phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
            variant="inline"
            className="w-full"
            message={
              watchedData.name
                ? `Olá! Meu nome é ${watchedData.name} e gostaria de saber mais sobre os cursos da Cultura Inglesa Teresina.`
                : "Olá! Gostaria de saber mais sobre os cursos da Cultura Inglesa Teresina."
            }
          />
        </div>
      </form>

      <div className="mt-6 text-xs text-gray-500 text-center">
        Seus dados estão protegidos de acordo com a LGPD. Utilizamos apenas para
        entrar em contato sobre nossos cursos.
      </div>
    </div>
  );
};

// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { Input } from "./ui/Input";
// import { Select } from "./ui/Select";
// import { Button } from "./ui/Button";
// import { WhatsAppButton } from "./WhatsAppButton";
// import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
// import { AGE_GROUPS, COURSE_INTERESTS } from "@/lib/types";
// import { generateWhatsAppMessage, getUTMParameters } from "@/lib/utils";
// import { trackFormSubmit } from "@/lib/analytics";
// // import { DebugSupabase } from "./DebugSupabase";

// interface ContactFormProps {
//   showMessageField?: boolean;
// }

// export const ContactForm: React.FC<ContactFormProps> = ({
//   showMessageField = true,
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm<ContactFormInput>({
//     resolver: zodResolver(contactFormSchema),
//     defaultValues: {
//       age_group: "",
//       course_interest: "",
//       message: "",
//       email_consent: false,
//       whatsapp_consent: false,
//     },
//   });

//   const watchedData = watch();

//   const onSubmit = async (data: ContactFormInput) => {
//     setIsSubmitting(true);

//     try {
//       console.log("Submitting form data:", data); // Debug log

//       // Get UTM parameters
//       const utmParams = getUTMParameters();

//       // Submit to API
//       const response = await fetch("/api/leads", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...data,
//           utmParams,
//         }),
//       });

//       const result = await response.json();
//       console.log("API response:", result); // Debug log

//       if (!result.success) {
//         throw new Error(result.error || "Erro ao enviar formulário");
//       }

//       // Track conversion safely
//       trackFormSubmit("contact_form");

//       toast.success(
//         "✅ Informações enviadas com sucesso! Redirecionando para WhatsApp..."
//       );

//       // Generate WhatsApp message and redirect
//       const ageGroupLabel =
//         AGE_GROUPS.find((a) => a.value === data.age_group)?.label ||
//         "Não especificado";
//       const courseLabel =
//         COURSE_INTERESTS.find((c) => c.value === data.course_interest)?.label ||
//         "Informações gerais";

//       const whatsappMessage = generateWhatsAppMessage({
//         name: data.name,
//         email: data.email,
//         whatsapp: data.whatsapp,
//         course_interest: courseLabel,
//         message: data.message,
//       });

//       const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
//       if (whatsappNumber) {
//         const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

//         // Small delay before redirect
//         setTimeout(() => {
//           window.open(whatsappURL, "_blank");
//         }, 1500);
//       }

//       reset();
//     } catch (error) {
//       console.error("Form submission error:", error);
//       toast.error(
//         `❌ ${
//           error instanceof Error
//             ? error.message
//             : "Erro ao enviar formulário. Tente novamente."
//         }`
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
//       {/* <DebugSupabase /> */}
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           Matrículas Abertas 2025
//         </h2>
//         <p className="text-lg text-gray-600">
//           Fale conosco no WhatsApp para garantir sua vaga!
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Input
//             label="Nome completo"
//             // placeholder="Seu nome completo"
//             required
//             {...register("name")}
//             error={errors.name?.message}
//           />

//           <Input
//             label="Email"
//             type="email"
//             // placeholder="seu@email.com"
//             required
//             {...register("email")}
//             error={errors.email?.message}
//           />
//         </div>

//         <Input
//           label="WhatsApp"
//           // placeholder="(86) 99999-9999 ou +55 86 99999-9999"
//           required
//           {...register("whatsapp")}
//           error={errors.whatsapp?.message}
//         />

//         <div className="text-xs text-gray-500 mt-1">
//           📱 Aceita números brasileiros e internacionais. Ex: (86) 99999-9999 ou
//           +44 7700 900123
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Select
//             label="Faixa etária (opcional)"
//             placeholder="Selecione ou deixe em branco"
//             className="text-gray-700"
//             options={AGE_GROUPS}
//             {...register("age_group")}
//             error={errors.age_group?.message}
//           />

//           <Select
//             label="Curso de interesse (opcional)"
//             placeholder="Selecione ou deixe em branco"
//             className="text-gray-700"
//             options={COURSE_INTERESTS}
//             {...register("course_interest")}
//             error={errors.course_interest?.message}
//           />
//         </div>

//         {showMessageField && (
//           <div>
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Mensagem adicional (opcional)
//             </label>
//             <textarea
//               id="message"
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
//               placeholder="Conte-nos mais sobre seus objetivos ou dúvidas..."
//               {...register("message")}
//             />
//             {errors.message && (
//               <p className="text-sm text-red-600 mt-1">
//                 {errors.message.message}
//               </p>
//             )}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="email_consent"
//               className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//               {...register("email_consent")}
//             />
//             <label htmlFor="email_consent" className="text-sm text-gray-700">
//               Autorizo receber comunicações da Cultura Inglesa por{" "}
//               <strong>email</strong>. *
//             </label>
//           </div>
//           {errors.email_consent && (
//             <p className="text-sm text-red-600">
//               {errors.email_consent.message}
//             </p>
//           )}

//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="whatsapp_consent"
//               className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//               {...register("whatsapp_consent")}
//             />
//             <label htmlFor="whatsapp_consent" className="text-sm text-gray-700">
//               Concordo em receber comunicações da Cultura Inglesa por{" "}
//               <strong>WhatsApp</strong>. *
//             </label>
//           </div>
//           {errors.whatsapp_consent && (
//             <p className="text-sm text-red-600">
//               {errors.whatsapp_consent.message}
//             </p>
//           )}
//         </div>

//         <div className="space-y-4">
//           <Button
//             type="submit"
//             variant="primary"
//             size="lg"
//             className="w-full"
//             isLoading={isSubmitting}
//           >
//             {isSubmitting ? "Enviando..." : "Enviar e Falar no WhatsApp"}
//           </Button>

//           <div className="text-center text-gray-600 text-sm">ou</div>

//           <WhatsAppButton
//             phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}
//             variant="inline"
//             className="w-full"
//             message={
//               watchedData.name
//                 ? `Olá! Meu nome é ${watchedData.name} e gostaria de saber mais sobre os cursos da Cultura Inglesa Teresina.`
//                 : "Olá! Gostaria de saber mais sobre os cursos da Cultura Inglesa Teresina."
//             }
//           />
//         </div>
//       </form>

//       <div className="mt-6 text-xs text-gray-500 text-center">
//         Seus dados estão protegidos de acordo com a LGPD. Utilizamos apenas para
//         entrar em contato sobre nossos cursos.
//       </div>
//     </div>
//   );
// };
