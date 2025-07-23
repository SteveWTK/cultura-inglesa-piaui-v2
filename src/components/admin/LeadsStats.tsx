import React from "react";
import { Lead } from "@/lib/types";
import { Users, TrendingUp, MessageCircle, Mail } from "lucide-react";

interface LeadsStatsProps {
  leads: Lead[];
}

export const LeadsStats: React.FC<LeadsStatsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const todayLeads = leads.filter((lead) => {
    const today = new Date().toDateString();
    const leadDate = new Date(lead.created_at || "").toDateString();
    return today === leadDate;
  }).length;

  const whatsappConsent = leads.filter((lead) => lead.whatsapp_consent).length;
  const emailConsent = leads.filter((lead) => lead.email_consent).length;

  const stats = [
    {
      name: "Total de Leads",
      value: totalLeads,
      icon: Users,
      color: "bg-primary-500",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Leads Hoje",
      value: todayLeads,
      icon: TrendingUp,
      color: "bg-primary-600",
      change: "+5%",
      changeType: "positive",
    },
    {
      name: "Consent WhatsApp",
      value: whatsappConsent,
      icon: MessageCircle,
      color: "bg-green-600",
      percentage:
        totalLeads > 0 ? Math.round((whatsappConsent / totalLeads) * 100) : 0,
    },
    {
      name: "Consent Email",
      value: emailConsent,
      icon: Mail,
      color: "bg-accent-500",
      percentage:
        totalLeads > 0 ? Math.round((emailConsent / totalLeads) * 100) : 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="bg-primary-200 rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                  {stat.percentage && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({stat.percentage}%)
                    </span>
                  )}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
            </div>
            {stat.change && (
              <div className="mt-4">
                <span
                  className={`text-sm ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} vs último mês
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
