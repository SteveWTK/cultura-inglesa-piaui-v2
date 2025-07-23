"use client";

import React from "react";
import { Lead } from "@/lib/types";
import { Download } from "lucide-react";
import { Button } from "../ui/Button";

interface ExportButtonProps {
  leads: Lead[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ leads }) => {
  const exportToCSV = () => {
    const headers = [
      "Nome",
      "Email",
      "WhatsApp",
      "Faixa Etária",
      "Curso Interesse",
      "Mensagem",
      "Consent Email",
      "Consent WhatsApp",
      "Data Cadastro",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
    ];

    const csvContent = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.whatsapp}"`,
          `"${lead.age_group || ""}"`,
          `"${lead.course_interest || ""}"`,
          `"${lead.message || ""}"`,
          lead.email_consent ? "Sim" : "Não",
          lead.whatsapp_consent ? "Sim" : "Não",
          `"${
            lead.created_at
              ? new Date(lead.created_at).toLocaleDateString("pt-BR")
              : ""
          }"`,
          `"${lead.utm_source || ""}"`,
          `"${lead.utm_medium || ""}"`,
          `"${lead.utm_campaign || ""}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `leads-cultura-inglesa-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={exportToCSV}
      variant="outline"
      className="flex items-center space-x-2"
    >
      <Download className="h-4 w-4" />
      <span>Exportar CSV</span>
    </Button>
  );
};
