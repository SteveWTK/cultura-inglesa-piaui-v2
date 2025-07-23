import React, { useState } from "react";
import { supabaseOperations } from "@/lib/supabase";
import { Button } from "./ui/Button";

export const DebugSupabase: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const result = await supabaseOperations.testConnection();
      setResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
    setLoading(false);
  };

  const testInsert = async () => {
    setLoading(true);
    try {
      const testLead = {
        name: "Test User",
        email: "test@example.com",
        whatsapp: "+5586999999999",
        age_group: "Teste",
        course_interest: "Teste",
        email_consent: true,
        whatsapp_consent: true,
      };

      const result = await supabaseOperations.insertLead(testLead);
      setResult(`Success: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 className="font-bold mb-4">Supabase Debug</h3>
      <div className="space-x-4 mb-4">
        <Button onClick={testConnection} disabled={loading}>
          Test Connection
        </Button>
        <Button onClick={testInsert} disabled={loading}>
          Test Insert
        </Button>
      </div>
      <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
        {result || "Click a button to test..."}
      </pre>
    </div>
  );
};
