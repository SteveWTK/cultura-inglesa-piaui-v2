// src/app/api/leads/route.ts - Enhanced with full UTM tracking

import { NextRequest, NextResponse } from "next/server";
import { supabaseOperations } from "@/lib/supabase";
import { contactFormSchema } from "@/lib/validations";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📝 Received form data:", body);

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    console.log("✅ Validated data:", validatedData);

    // 🆕 ENHANCED UTM PARAMETERS - Get all 5 parameters
    const utmParams = body.utmParams || {};

    // Prepare lead data for database with all UTM parameters
    const leadData = {
      ...validatedData,
      age_group: validatedData.age_group || "Não especificado",
      course_interest: validatedData.course_interest || "Informações gerais",

      // 🆕 ALL UTM PARAMETERS (including new ones)
      utm_source: utmParams.utm_source || null,
      utm_medium: utmParams.utm_medium || null,
      utm_campaign: utmParams.utm_campaign || null,
      utm_content: utmParams.utm_content || null, // NEW
      url_referrer: utmParams.url_referrer || null, // NEW
    };

    console.log("🎯 Lead data with enhanced UTM tracking:", leadData);

    // Insert lead into database
    const result = await supabaseOperations.insertLead(leadData);
    console.log("💾 Supabase result:", result);

    // 🔹 Enhanced webhook payload with all UTM data
    const webhookUrl =
      process.env.LEAD_WEBHOOK_URL ||
      "https://webhook.vbn.digital/webhook/culturapi_leads";

    if (webhookUrl) {
      try {
        // 🆕 Enhanced metadata including better tracking
        const metadata = {
          submitted_at: new Date().toISOString(),
          ip_address:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "Unknown",
          user_agent: request.headers.get("user-agent") || "Unknown",
          referer: request.headers.get("referer") || "Direct",

          // 🆕 UTM Summary for quick analysis
          utm_summary: {
            has_utm_data: !!(
              utmParams.utm_source ||
              utmParams.utm_medium ||
              utmParams.utm_campaign
            ),
            campaign_name: utmParams.utm_campaign,
            traffic_source: utmParams.utm_source,
            traffic_medium: utmParams.utm_medium,
            content_variant: utmParams.utm_content,
            full_landing_url: utmParams.url_referrer,
          },
        };

        const payload = {
          ...leadData,
          ...metadata,
        };

        console.log("🌐 Sending enhanced webhook payload:", payload);

        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (webhookResponse.ok) {
          console.log("✅ Webhook sent successfully");
        } else {
          console.error("⚠️ Webhook response not OK:", webhookResponse.status);
        }
      } catch (webhookError) {
        console.error("❌ Failed to send to webhook:", webhookError);
        // Don't fail the entire request if webhook fails
      }
    } else {
      console.log("⚠️ No webhook URL configured. Skipping webhook send.");
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: "Lead saved successfully",
      utm_captured: {
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        url_referrer: utmParams.url_referrer
          ? "✅ Captured"
          : "❌ Not available",
      },
    });
  } catch (error) {
    console.error("❌ API Error:", error);

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
    utm_tracking: "Enhanced UTM tracking enabled",
    supported_parameters: [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "url_referrer",
    ],
  });
}

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseOperations } from "@/lib/supabase";
// import { contactFormSchema } from "@/lib/validations";
// import z from "zod";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     console.log("Received form data:", body);

//     // Validate the form data
//     const validatedData = contactFormSchema.parse(body);
//     console.log("Validated data:", validatedData);

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

//     console.log("Lead data to insert:", leadData);

//     // Insert lead into database
//     const result = await supabaseOperations.insertLead(leadData);
//     console.log("Supabase result:", result);

//     // 🔹 Send to webhook if configured
//     const webhookUrl =
//       process.env.LEAD_WEBHOOK_URL ||
//       "https://webhook.vbn.digital/webhook/culturapi_leads";
//     if (webhookUrl) {
//       try {
//         // Capture extra metadata
//         const metadata = {
//           submitted_at: new Date().toISOString(),
//           ip_address:
//             request.headers.get("x-forwarded-for") ||
//             request.headers.get("x-real-ip") ||
//             "Unknown",
//           user_agent: request.headers.get("user-agent") || "Unknown",
//         };

//         const payload = {
//           ...leadData,
//           ...metadata,
//         };

//         await fetch(webhookUrl, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });

//         console.log("Webhook sent successfully");
//       } catch (webhookError) {
//         console.error("Failed to send to webhook:", webhookError);
//       }
//     } else {
//       console.log("No webhook URL configured. Skipping webhook send.");
//     }

//     return NextResponse.json({
//       success: true,
//       data: result,
//       message: "Lead saved successfully",
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

// // Simple GET endpoint for testing
// export async function GET() {
//   return NextResponse.json({
//     message: "API está funcionando!",
//     timestamp: new Date().toISOString(),
//   });
// }
