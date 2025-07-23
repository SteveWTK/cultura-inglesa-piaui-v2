import { createClient } from "@supabase/supabase-js";
import type { Lead } from "./types";

// Check if environment variables exist
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database operations
export const supabaseOperations = {
  // Test connection
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("count", { count: "exact" })
        .limit(1);

      if (error) {
        throw error;
      }

      return { success: true, message: "Connection successful" };
    } catch (error) {
      console.error("Supabase connection test failed:", error);

      if (error instanceof Error) {
        return { success: false, error: error.message };
      }

      return { success: false, error: "Erro desconhecido" };
    }
  },

  // Insert lead with better error handling
  async insertLead(leadData: Omit<Lead, "id" | "created_at">) {
    try {
      console.log("Attempting to insert lead:", leadData);

      const { data, error } = await supabase
        .from("leads")
        .insert([leadData])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);

        // Handle specific Supabase errors
        if (error.code === "PGRST116") {
          throw new Error(
            'Tabela "leads" não encontrada. Verifique a configuração do banco.'
          );
        }

        if (error.code === "42501") {
          throw new Error(
            "Permissão negada. Verifique as políticas RLS do Supabase."
          );
        }

        throw new Error(`Erro do banco: ${error.message}`);
      }

      console.log("Lead inserted successfully:", data);
      return data;
    } catch (error) {
      console.error("Error inserting lead:", error);
      throw error;
    }
  },

  // Get leads (for admin dashboard)
  async getLeads(limit = 50) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching leads:", error);
        throw new Error("Failed to fetch leads");
      }

      return data || [];
    } catch (error) {
      console.error("Error in getLeads:", error);
      throw error;
    }
  },
};

// import { createClient } from "@supabase/supabase-js";
// import type { Lead } from "./types";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Database operations
// export const supabaseOperations = {
//   // Insert lead
//   async insertLead(leadData: Omit<Lead, "id" | "created_at">) {
//     const { data, error } = await supabase
//       .from("leads")
//       .insert([leadData])
//       .select()
//       .single();

//     if (error) {
//       console.error("Error inserting lead:", error);
//       throw new Error("Failed to save lead information");
//     }

//     return data;
//   },

//   // Get leads (for admin dashboard later)
//   async getLeads(limit = 50) {
//     const { data, error } = await supabase
//       .from("leads")
//       .select("*")
//       .order("created_at", { ascending: false })
//       .limit(limit);

//     if (error) {
//       console.error("Error fetching leads:", error);
//       throw new Error("Failed to fetch leads");
//     }

//     return data;
//   },
// };
