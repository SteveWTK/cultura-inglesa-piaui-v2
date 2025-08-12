// src/components/ContactForm.tsx - Enhanced with UTM tracking

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
import { AGE_GROUPS, COURSE_INTERESTS } from "@/lib/types";
import {
  generateWhatsAppMessage,
  getStoredUTMParameters,
  storeUTMParameters,
  type UTMParameters,
} from "@/lib/utils";
import { trackFormSubmit } from "@/lib/analytics";
import { MessageCircle, Eye, EyeOff } from "lucide-react";

interface ContactFormProps {
  showMessageField?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  showMessageField = true,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [utmParams, setUtmParams] = useState<UTMParameters>({});
  const [showUTMDebug, setShowUTMDebug] = useState(false); // For debugging
  const router = useRouter();

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
      email: "",
      email_consent: false,
      whatsapp_consent: false,
    },
  });

  const watchedData = watch();

  // 🆕 CAPTURE UTM PARAMETERS ON COMPONENT MOUNT
  useEffect(() => {
    // Store UTM parameters from current URL
    storeUTMParameters();

    // Get UTM parameters (from current URL or stored)
    const capturedUTM = getStoredUTMParameters();
    setUtmParams(capturedUTM);

    console.log("📋 Form loaded with UTM parameters:", capturedUTM);
  }, []);

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);

    try {
      console.log("📝 Submitting form data:", data);
      console.log("🎯 With UTM parameters:", utmParams);

      // Submit to API with UTM parameters
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          utmParams, // 🆕 Enhanced UTM parameters
        }),
      });

      const result = await response.json();
      console.log("✅ API response:", result);

      if (!result.success) {
        throw new Error(result.error || "Erro ao enviar formulário");
      }

      trackFormSubmit("contact_form");

      toast.success("✅ Informações enviadas com sucesso! Redirecionando...");

      // Generate WhatsApp message
      const ageGroupLabel =
        AGE_GROUPS.find((a) => a.value === data.age_group)?.label ||
        "Não especificado";
      const courseLabel =
        COURSE_INTERESTS.find((c) => c.value === data.course_interest)?.label ||
        "Informações gerais";

      const whatsappMessage = generateWhatsAppMessage({
        name: data.name,
        email: data.email || "",
        whatsapp: data.whatsapp,
        course_interest: courseLabel,
        message: data.message,
      });

      // Reset form
      reset();

      // Redirect to thank you page with the message
      setTimeout(() => {
        router.push(`/obrigado?message=${whatsappMessage}`);
      }, 1000);
    } catch (error) {
      console.error("❌ Form submission error:", error);
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
          Preencha o formulário para garantir sua vaga e receber mais
          informações pelo WhatsApp!
        </p>
      </div>

      {/* 🆕 UTM DEBUG INFO (DEVELOPMENT ONLY) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <button
            type="button"
            onClick={() => setShowUTMDebug(!showUTMDebug)}
            className="flex items-center space-x-2 text-blue-700 text-sm font-medium"
          >
            {showUTMDebug ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span>UTM Debug Info</span>
          </button>

          {showUTMDebug && (
            <div className="mt-3 text-xs">
              <pre className="bg-blue-100 p-2 rounded text-blue-800 overflow-x-auto">
                {JSON.stringify(utmParams, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 🆕 HIDDEN UTM FIELDS */}
        <div className="hidden">
          <input
            type="hidden"
            value={utmParams.utm_source || ""}
            name="utm_source"
          />
          <input
            type="hidden"
            value={utmParams.utm_medium || ""}
            name="utm_medium"
          />
          <input
            type="hidden"
            value={utmParams.utm_campaign || ""}
            name="utm_campaign"
          />
          <input
            type="hidden"
            value={utmParams.utm_content || ""}
            name="utm_content"
          />
          <input
            type="hidden"
            value={utmParams.url_referrer || ""}
            name="url_referrer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nome completo"
            placeholder=""
            required
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Email (opcional)"
            type="email"
            placeholder=""
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <Input
          label="WhatsApp"
          placeholder=""
          required
          {...register("whatsapp")}
          error={errors.whatsapp?.message}
        />

        <div className="text-xs text-gray-500 mt-1">
          📱 Aceita números brasileiros e internacionais. Ex: (86) 99999-9999 ou
          +44 7700 900123
        </div>

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
          {/* Email consent checkbox - only show if email is provided */}
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

          {/* WhatsApp consent checkbox - required */}
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

        {/* Single submit button */}
        <div className="space-y-4">
          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
          >
            <MessageCircle size={20} className="mr-2" />
            {isSubmitting ? "Enviando..." : "Enviar e Falar no WhatsApp"}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-xs text-gray-500 text-center">
        Seus dados estão protegidos de acordo com a LGPD. Utilizamos apenas para
        entrar em contato sobre nossos cursos.
      </div>

      {/* 🆕 UTM STATUS INDICATOR (VISIBLE ONLY IF UTM DETECTED) */}
      {Object.keys(utmParams).length > 0 && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>
              Campanha detectada:{" "}
              {utmParams.utm_campaign ||
                utmParams.utm_source ||
                "Rastreamento ativo"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { Input } from "./ui/Input";
// import { Select } from "./ui/Select";
// import { Button } from "./ui/Button";
// import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
// import { AGE_GROUPS, COURSE_INTERESTS } from "@/lib/types";
// import { generateWhatsAppMessage, getUTMParameters } from "@/lib/utils";
// import { trackFormSubmit } from "@/lib/analytics";
// import { MessageCircle } from "lucide-react";

// interface ContactFormProps {
//   showMessageField?: boolean;
// }

// export const ContactForm: React.FC<ContactFormProps> = ({
//   showMessageField = true,
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

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
//       email: "",
//       email_consent: false,
//       whatsapp_consent: false,
//     },
//   });

//   const watchedData = watch();

//   const onSubmit = async (data: ContactFormInput) => {
//     setIsSubmitting(true);

//     try {
//       console.log("Submitting form data:", data);

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
//       console.log("API response:", result);

//       if (!result.success) {
//         throw new Error(result.error || "Erro ao enviar formulário");
//       }

//       trackFormSubmit("contact_form");

//       toast.success("✅ Informações enviadas com sucesso! Redirecionando...");

//       // Generate WhatsApp message
//       const ageGroupLabel =
//         AGE_GROUPS.find((a) => a.value === data.age_group)?.label ||
//         "Não especificado";
//       const courseLabel =
//         COURSE_INTERESTS.find((c) => c.value === data.course_interest)?.label ||
//         "Informações gerais";

//       const whatsappMessage = generateWhatsAppMessage({
//         name: data.name,
//         email: data.email || "",
//         whatsapp: data.whatsapp,
//         course_interest: courseLabel,
//         message: data.message,
//       });

//       // Reset form
//       reset();

//       // Redirect to thank you page with the message
//       setTimeout(() => {
//         router.push(`/obrigado?message=${whatsappMessage}`);
//       }, 1000);
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
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">
//           Matrículas Abertas 2025
//         </h2>
//         <p className="text-lg text-gray-600">
//           Preencha o formulário para garantir sua vaga e receber mais
//           informações pelo WhatsApp!
//         </p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Input
//             label="Nome completo"
//             placeholder=""
//             required
//             {...register("name")}
//             error={errors.name?.message}
//           />

//           <Input
//             label="Email (opcional)"
//             type="email"
//             placeholder=""
//             {...register("email")}
//             error={errors.email?.message}
//           />
//         </div>

//         <Input
//           label="WhatsApp"
//           placeholder=""
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
//             options={AGE_GROUPS}
//             {...register("age_group")}
//             error={errors.age_group?.message}
//           />

//           <Select
//             label="Curso de interesse (opcional)"
//             placeholder="Selecione ou deixe em branco"
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
//           {/* Email consent checkbox - only show if email is provided */}
//           {watchedData.email && (
//             <div className="flex items-start space-x-3">
//               <input
//                 type="checkbox"
//                 id="email_consent"
//                 className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                 {...register("email_consent")}
//               />
//               <label htmlFor="email_consent" className="text-sm text-gray-700">
//                 Autorizo receber comunicações da Cultura Inglesa por{" "}
//                 <strong>email</strong>.
//               </label>
//             </div>
//           )}

//           {/* WhatsApp consent checkbox - required */}
//           <div className="flex items-start space-x-3">
//             <input
//               type="checkbox"
//               id="whatsapp_consent"
//               className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//               {...register("whatsapp_consent")}
//             />
//             <label htmlFor="whatsapp_consent" className="text-sm text-gray-700">
//               Autorizo receber comunicações da Cultura Inglesa por{" "}
//               <strong>WhatsApp</strong>. *
//             </label>
//           </div>
//           {errors.whatsapp_consent && (
//             <p className="text-sm text-red-600">
//               {errors.whatsapp_consent.message}
//             </p>
//           )}
//         </div>

//         {/* Single submit button */}
//         <div className="space-y-4">
//           <Button
//             type="submit"
//             variant="whatsapp"
//             size="lg"
//             className="w-full"
//             isLoading={isSubmitting}
//           >
//             <MessageCircle size={20} className="mr-2" />
//             {isSubmitting ? "Enviando..." : "Enviar e Falar no WhatsApp"}
//           </Button>
//         </div>
//       </form>

//       <div className="mt-6 text-xs text-gray-500 text-center">
//         Seus dados estão protegidos de acordo com a LGPD. Utilizamos apenas para
//         entrar em contato sobre nossos cursos.
//       </div>
//     </div>
//   );
// };
