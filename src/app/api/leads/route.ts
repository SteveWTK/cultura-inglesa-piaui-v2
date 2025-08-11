import { NextRequest, NextResponse } from "next/server";
import { supabaseOperations } from "@/lib/supabase";
import { contactFormSchema } from "@/lib/validations";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received form data:", body);

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    console.log("Validated data:", validatedData);

    // Get UTM parameters from body
    const utmParams = body.utmParams || {};

    // Prepare lead data for database
    const leadData = {
      ...validatedData,
      age_group: validatedData.age_group || "Não especificado",
      course_interest: validatedData.course_interest || "Informações gerais",
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
    };

    console.log("Lead data to insert:", leadData);

    // Insert lead into database
    const result = await supabaseOperations.insertLead(leadData);
    console.log("Supabase result:", result);

    // 🔹 Send to webhook if configured
    const webhookUrl =
      process.env.LEAD_WEBHOOK_URL ||
      "https://webhook.vbn.digital/webhook/culturapi_leads";
    if (webhookUrl) {
      try {
        // Capture extra metadata
        const metadata = {
          submitted_at: new Date().toISOString(),
          ip_address:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "Unknown",
          user_agent: request.headers.get("user-agent") || "Unknown",
        };

        const payload = {
          ...leadData,
          ...metadata,
        };

        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        console.log("Webhook sent successfully");
      } catch (webhookError) {
        console.error("Failed to send to webhook:", webhookError);
      }
    } else {
      console.log("No webhook URL configured. Skipping webhook send.");
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: "Lead saved successfully",
    });
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados do formulário inválidos",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: "Erro interno do servidor",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Erro desconhecido",
        details: "Tente novamente em alguns minutos",
      },
      { status: 500 }
    );
  }
}

// Simple GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: "API está funcionando!",
    timestamp: new Date().toISOString(),
  });
}

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseOperations } from "@/lib/supabase";
// import { contactFormSchema } from "@/lib/validations";
// import z from "zod";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     console.log("Received form data:", body); // Debug log

//     // Validate the form data
//     const validatedData = contactFormSchema.parse(body);
//     console.log("Validated data:", validatedData); // Debug log

//     // Get UTM parameters from body
//     const utmParams = body.utmParams || {};

//     // Prepare lead data for database
//     const leadData = {
//       ...validatedData,
//       age_group: validatedData.age_group || "Não especificado",
//       course_interest: validatedData.course_interest || "Informações gerais",
//       utm_source: utmParams.utm_source,
//       utm_medium: utmParams.utm_medium,
//       utm_campaign: utmParams.utm_campaign,
//     };

//     console.log("Lead data to insert:", leadData); // Debug log

//     // Insert lead into Supabase
//     const result = await supabaseOperations.insertLead(leadData);
//     console.log("Supabase result:", result); // Debug log

//     // Send data to external webhook (replace with provided URL)
//     try {
//       const webhookUrl =
//         process.env.LEAD_WEBHOOK_URL ||
//         "https://webhook.vbn.digital/webhook/culturapi_leads";
//       if (webhookUrl && webhookUrl !== "WEBHOOK_URL_HERE") {
//         const webhookResponse = await fetch(webhookUrl, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(leadData),
//         });

//         if (!webhookResponse.ok) {
//           console.error(`Webhook error: ${webhookResponse.statusText}`);
//         } else {
//           console.log("Webhook sent successfully");
//         }
//       }
//     } catch (webhookError) {
//       console.error("Error sending webhook:", webhookError);
//     }

//     return NextResponse.json({
//       success: true,
//       data: result,
//       message: "Lead saved successfully and webhook sent",
//     });
//   } catch (error) {
//     console.error("API Error:", error);

//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Dados do formulário inválidos",
//           details: error.issues,
//         },
//         { status: 400 }
//       );
//     }

//     if (error instanceof Error) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message,
//           details: "Erro interno do servidor",
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Erro desconhecido",
//         details: "Tente novamente em alguns minutos",
//       },
//       { status: 500 }
//     );
//   }
// }

// // Add GET method for testing
// export async function GET() {
//   return NextResponse.json({
//     message: "API está funcionando!",
//     timestamp: new Date().toISOString(),
//   });
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     console.log("Received form data:", body); // Debug log

//     // Validate the form data
//     const validatedData = contactFormSchema.parse(body);
//     console.log("Validated data:", validatedData); // Debug log

//     // Get UTM parameters from body
//     const utmParams = body.utmParams || {};

//     // Prepare lead data for database
//     const leadData = {
//       ...validatedData,
//       // Set defaults for optional fields
//       age_group: validatedData.age_group || "Não especificado",
//       course_interest: validatedData.course_interest || "Informações gerais",
//       utm_source: utmParams.utm_source,
//       utm_medium: utmParams.utm_medium,
//       utm_campaign: utmParams.utm_campaign,
//     };

//     console.log("Lead data to insert:", leadData); // Debug log

//     // Insert lead into database
//     const result = await supabaseOperations.insertLead(leadData);
//     console.log("Supabase result:", result); // Debug log

//     return NextResponse.json({
//       success: true,
//       data: result,
//       message: "Lead saved successfully",
//     });
//   } catch (error) {
//     console.error("API Error:", error);

//     // More detailed error handling
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Dados do formulário inválidos",
//           details: error.issues,
//         },
//         { status: 400 }
//       );
//     }

//     if (error instanceof Error) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message,
//           details: "Erro interno do servidor",
//         },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Erro desconhecido",
//         details: "Tente novamente em alguns minutos",
//       },
//       { status: 500 }
//     );
//   }
// }
