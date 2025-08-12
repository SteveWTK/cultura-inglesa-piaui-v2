// src/app/admin/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabaseOperations } from "@/lib/supabase";
import { Lead } from "@/lib/types";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadsStats } from "@/components/admin/LeadsStats";
import { LeadFilters } from "@/components/admin/LeadFilters";
import { Header } from "@/components/Header";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      console.log("Fetching leads from Supabase...");
      const data = await supabaseOperations.getLeads(1000);
      console.log("Fetched leads:", data);

      setLeads(data);
      setFilteredLeads(data);

      if (data.length === 0) {
        console.log("No leads found in database");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao carregar leads";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Stable filter handler using useCallback
  const handleFilter = useCallback(
    (filtered: Lead[]) => {
      console.log("Filtering leads:", filtered.length, "of", leads.length);
      setFilteredLeads(filtered);
    },
    [leads.length]
  );

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Header variant="admin" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Carregando dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header variant="admin" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Erro ao carregar dashboard
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchLeads}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4 inline mr-2" />
              Tentar novamente
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header variant="admin" />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard Admin
                </h1>
                <p className="text-gray-600 mt-1">
                  Gerencie leads e configure o site
                </p>
              </div>
              <button
                onClick={fetchLeads}
                disabled={isRefreshing}
                className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Atualizar
              </button>
            </div>
            {/* Debug Info (remove in production) */}
            {process.env.NODE_ENV === "development" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Debug Info:</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>Total leads: {leads.length}</p>
                  <p>Filtered leads: {filteredLeads.length}</p>
                  <p>
                    Supabase URL:{" "}
                    {process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30)}...
                  </p>
                  <p>Environment: {process.env.NODE_ENV}</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <LeadsStats leads={leads} />

            {/* Filters */}
            <LeadFilters leads={leads} onFilter={handleFilter} />

            {/* Table */}
            <LeadsTable leads={filteredLeads} onRefresh={fetchLeads} />

            {/* Empty State */}
            {leads.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum lead encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ainda não há leads cadastrados no sistema. Quando alguém
                    preencher o formulário do site, os dados aparecerão aqui.
                  </p>
                  <button
                    onClick={fetchLeads}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Verificar novamente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// // src\app\admin\page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { supabaseOperations } from "@/lib/supabase";
// import { Lead } from "@/lib/types";
// import { LeadsTable } from "@/components/admin/LeadsTable";
// import { LeadsStats } from "@/components/admin/LeadsStats";
// import { LeadFilters } from "@/components/admin/LeadFilters";
// // import { ExportButton } from "@/components/admin/ExportButton";
// import { Header } from "@/components/Header"; // Add this import
// import { Loader2, RefreshCw } from "lucide-react";
// import toast from "react-hot-toast";

// export default function AdminPage() {
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchLeads = async () => {
//     try {
//       setIsRefreshing(true);
//       const data = await supabaseOperations.getLeads(1000); // Get more leads
//       setLeads(data);
//       setFilteredLeads(data);
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//       toast.error("Erro ao carregar leads");
//     } finally {
//       setIsLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const handleFilter = (filtered: Lead[]) => {
//     setFilteredLeads(filtered);
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Header variant="admin" />
//         <div className="min-h-screen bg-primary-900 flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="h-8 w-8 animate-spin text-primary-50 mx-auto mb-4" />
//             <p className="text-primary-50">Carregando dashboard...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header variant="admin" />
//       <div className="min-h-screen bg-primary-600">
//         {/* Remove the old header div since we now have the Header component */}

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="space-y-8">
//             {/* Stats */}
//             <LeadsStats leads={leads} />

//             {/* Filters */}
//             <LeadFilters leads={leads} onFilter={handleFilter} />

//             {/* Table */}
//             <LeadsTable leads={filteredLeads} onRefresh={fetchLeads} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
