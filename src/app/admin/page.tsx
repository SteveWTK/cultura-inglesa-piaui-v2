"use client";

import React, { useState, useEffect } from "react";
import { supabaseOperations } from "@/lib/supabase";
import { Lead } from "@/lib/types";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadsStats } from "@/components/admin/LeadsStats";
import { LeadFilters } from "@/components/admin/LeadFilters";
// import { ExportButton } from "@/components/admin/ExportButton";
import { Header } from "@/components/Header"; // Add this import
import { Loader2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeads = async () => {
    try {
      setIsRefreshing(true);
      const data = await supabaseOperations.getLeads(1000); // Get more leads
      setLeads(data);
      setFilteredLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Erro ao carregar leads");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleFilter = (filtered: Lead[]) => {
    setFilteredLeads(filtered);
  };

  if (isLoading) {
    return (
      <>
        <Header variant="admin" />
        <div className="min-h-screen bg-primary-900 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-50 mx-auto mb-4" />
            <p className="text-primary-50">Carregando dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header variant="admin" />
      <div className="min-h-screen bg-primary-600">
        {/* Remove the old header div since we now have the Header component */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Stats */}
            <LeadsStats leads={leads} />

            {/* Filters */}
            <LeadFilters leads={leads} onFilter={handleFilter} />

            {/* Table */}
            <LeadsTable leads={filteredLeads} onRefresh={fetchLeads} />
          </div>
        </div>
      </div>
    </>
  );
}
