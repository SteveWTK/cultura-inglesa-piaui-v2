"use client";

import React, { useState, useEffect } from "react";
import { Lead } from "@/lib/types";
import { Select } from "../ui/Select";
import { Input } from "../ui/Input";
import { Filter, X } from "lucide-react";

interface LeadFiltersProps {
  leads: Lead[];
  onFilter: (filteredLeads: Lead[]) => void;
}

export const LeadFilters: React.FC<LeadFiltersProps> = ({
  leads,
  onFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [ageGroupFilter, setAgeGroupFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [consentFilter, setConsentFilter] = useState("");

  // Get unique values for filter options
  const courses = [
    ...new Set(leads.map((lead) => lead.course_interest).filter(Boolean)),
  ];
  const ageGroups = [
    ...new Set(leads.map((lead) => lead.age_group).filter(Boolean)),
  ];

  const courseOptions = courses.map((course) => ({
    value: course!,
    label: course!,
  }));
  const ageGroupOptions = ageGroups.map((age) => ({
    value: age!,
    label: age!,
  }));

  const dateOptions = [
    { value: "today", label: "Hoje" },
    { value: "week", label: "Última semana" },
    { value: "month", label: "Último mês" },
  ];

  const consentOptions = [
    { value: "whatsapp", label: "Consent WhatsApp" },
    { value: "email", label: "Consent Email" },
    { value: "both", label: "Ambos consents" },
  ];

  useEffect(() => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.whatsapp.includes(searchTerm)
      );
    }

    // Course filter
    if (courseFilter) {
      filtered = filtered.filter(
        (lead) => lead.course_interest === courseFilter
      );
    }

    // Age group filter
    if (ageGroupFilter) {
      filtered = filtered.filter((lead) => lead.age_group === ageGroupFilter);
    }

    // Date filter
    if (dateFilter) {
      const now = new Date();
      const startDate = new Date();

      switch (dateFilter) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate.setDate(now.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter((lead) => {
        const leadDate = new Date(lead.created_at || "");
        return leadDate >= startDate;
      });
    }

    // Consent filter
    if (consentFilter) {
      switch (consentFilter) {
        case "whatsapp":
          filtered = filtered.filter((lead) => lead.whatsapp_consent);
          break;
        case "email":
          filtered = filtered.filter((lead) => lead.email_consent);
          break;
        case "both":
          filtered = filtered.filter(
            (lead) => lead.whatsapp_consent && lead.email_consent
          );
          break;
      }
    }

    onFilter(filtered);
  }, [
    searchTerm,
    courseFilter,
    ageGroupFilter,
    dateFilter,
    consentFilter,
    leads,
    onFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setCourseFilter("");
    setAgeGroupFilter("");
    setDateFilter("");
    setConsentFilter("");
  };

  const hasActiveFilters =
    searchTerm || courseFilter || ageGroupFilter || dateFilter || consentFilter;

  return (
    <div className="bg-primary-200 rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Buscar por nome, email ou telefone..."
          className="bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          placeholder="Curso de interesse"
          options={courseOptions}
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        />

        <Select
          placeholder="Faixa etária"
          options={ageGroupOptions}
          value={ageGroupFilter}
          onChange={(e) => setAgeGroupFilter(e.target.value)}
        />

        <Select
          placeholder="Período"
          options={dateOptions}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <Select
          placeholder="Consentimentos"
          options={consentOptions}
          value={consentFilter}
          onChange={(e) => setConsentFilter(e.target.value)}
        />
      </div>
    </div>
  );
};
