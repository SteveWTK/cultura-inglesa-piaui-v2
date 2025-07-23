"use client";

import React, { useState } from "react";
import { Lead } from "@/lib/types";
import { formatBrazilianPhone } from "@/lib/utils";
import {
  ExternalLink,
  MessageCircle,
  Mail,
  Eye,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "../ui/Button";

interface LeadsTableProps {
  leads: Lead[];
  onRefresh: () => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onRefresh }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openWhatsApp = (lead: Lead) => {
    const message = `Olá ${lead.name}! Obrigado pelo interesse na Cultura Inglesa Teresina. Como posso ajudá-lo?`;
    const whatsappURL = `https://wa.me/${lead.whatsapp.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const openEmail = (email: string) => {
    const subject = "Cultura Inglesa Teresina - Informações sobre cursos";
    const body = "Olá! Obrigado pelo interesse na Cultura Inglesa Teresina...";
    const emailURL = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(emailURL, "_blank");
  };

  const viewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="bg-primary-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Leads Recentes ({leads.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-800">
            <thead className="bg-primary-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso Interesse
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {lead.age_group}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
                        {formatBrazilianPhone(lead.whatsapp)}
                        {lead.whatsapp_consent && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        {lead.email}
                        {lead.email_consent && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.course_interest}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.created_at && formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => viewLead(lead)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="Ver detalhes"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {lead.whatsapp_consent && (
                      <button
                        onClick={() => openWhatsApp(lead)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Abrir WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    )}
                    {lead.email_consent && (
                      <button
                        onClick={() => openEmail(lead.email || "N/A")}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded"
                        title="Enviar email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {leads.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum lead encontrado
            </h3>
            <p className="text-gray-500">
              Leads aparecerão aqui quando alguém preencher o formulário.
            </p>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {showModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Detalhes do Lead
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <p className="text-lg text-gray-900">{selectedLead.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedLead.email}</p>
                    <p className="text-xs text-gray-500">
                      Consent:{" "}
                      {selectedLead.email_consent ? "✅ Sim" : "❌ Não"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <p className="text-gray-900">
                      {formatBrazilianPhone(selectedLead.whatsapp)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Consent:{" "}
                      {selectedLead.whatsapp_consent ? "✅ Sim" : "❌ Não"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Faixa Etária
                    </label>
                    <p className="text-gray-900">{selectedLead.age_group}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Curso de Interesse
                    </label>
                    <p className="text-gray-900">
                      {selectedLead.course_interest}
                    </p>
                  </div>
                </div>

                {selectedLead.message && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mensagem
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data de Cadastro
                  </label>
                  <p className="text-gray-900">
                    {selectedLead.created_at &&
                      formatDate(selectedLead.created_at)}
                  </p>
                </div>

                {(selectedLead.utm_source ||
                  selectedLead.utm_medium ||
                  selectedLead.utm_campaign) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      UTM Parameters
                    </label>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      {selectedLead.utm_source && (
                        <p>Source: {selectedLead.utm_source}</p>
                      )}
                      {selectedLead.utm_medium && (
                        <p>Medium: {selectedLead.utm_medium}</p>
                      )}
                      {selectedLead.utm_campaign && (
                        <p>Campaign: {selectedLead.utm_campaign}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 mt-6 pt-6 border-t">
                {selectedLead.whatsapp_consent && (
                  <Button
                    onClick={() => openWhatsApp(selectedLead)}
                    variant="whatsapp"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                )}
                {selectedLead.email_consent && (
                  <Button
                    onClick={() => openEmail(selectedLead.email || "N/A")}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
