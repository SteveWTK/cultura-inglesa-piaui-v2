import { NextRequest, NextResponse } from "next/server";
import { supabaseOperations } from "@/lib/supabase";
import { contactFormSchema } from "@/lib/validations";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received form data:", body); // Debug log

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);
    console.log("Validated data:", validatedData); // Debug log

    // Get UTM parameters from body
    const utmParams = body.utmParams || {};

    // Prepare lead data for database
    const leadData = {
      ...validatedData,
      // Set defaults for optional fields
      age_group: validatedData.age_group || "Não especificado",
      course_interest: validatedData.course_interest || "Informações gerais",
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
    };

    console.log("Lead data to insert:", leadData); // Debug log

    // Insert lead into database
    const result = await supabaseOperations.insertLead(leadData);
    console.log("Supabase result:", result); // Debug log

    return NextResponse.json({
      success: true,
      data: result,
      message: "Lead saved successfully",
    });
  } catch (error) {
    console.error("API Error:", error);

    // More detailed error handling
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

// Add GET method for testing
export async function GET() {
  return NextResponse.json({
    message: "API está funcionando!",
    timestamp: new Date().toISOString(),
  });
}

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseOperations } from "@/lib/supabase";
// import { contactFormSchema } from "@/lib/validations";
// // import { getUTMParameters } from "@/lib/utils";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Validate the form data
//     const validatedData = contactFormSchema.parse(body);

//     // Get UTM parameters from headers or body
//     const utmParams = body.utmParams || {};

//     // Prepare lead data for database
//     const leadData = {
//       ...validatedData,
//       utm_source: utmParams.utm_source,
//       utm_medium: utmParams.utm_medium,
//       utm_campaign: utmParams.utm_campaign,
//     };

//     // Insert lead into database
//     const result = await supabaseOperations.insertLead(leadData);

//     return NextResponse.json({
//       success: true,
//       data: result,
//       message: "Lead saved successfully",
//     });
//   } catch (error) {
//     console.error("API Error:", error);

//     if (error instanceof Error) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message,
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }
