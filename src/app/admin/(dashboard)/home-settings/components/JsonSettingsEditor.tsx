"use client";

import React, { useState } from "react";
import { Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function JsonSettingsEditor({ 
  settingKey, 
  initialData, 
  label = "Configuration Data" 
}: { 
  settingKey: string, 
  initialData: any,
  label?: string
}) {
  const [jsonText, setJsonText] = useState(JSON.stringify(initialData, null, 2));
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsSaving(true);
    
    let parsedData;
    try {
      parsedData = JSON.parse(jsonText);
    } catch (e: any) {
      setErrorMsg("Invalid JSON format: " + e.message);
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: settingKey, value: JSON.stringify(parsedData) })
      });

      if (res.ok) {
        setSuccessMsg("Settings updated successfully!");
        // Format it nicely
        setJsonText(JSON.stringify(parsedData, null, 2));
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.error || "Failed to update settings.");
      }
    } catch (err: any) {
      setErrorMsg("Error: " + err.message);
    } finally {
      setIsSaving(false);
      setTimeout(() => { setSuccessMsg(""); setErrorMsg(""); }, 5000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">{label}</h3>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#007a87] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#005f6b] transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <p className="text-sm text-slate-500">
        Note: The data below must be valid JSON format. Be careful when editing structural brackets `[]` and `{}`.
      </p>

      {errorMsg && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2 border border-red-100">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm flex items-center gap-2 border border-emerald-100">
          <CheckCircle2 size={16} />
          {successMsg}
        </div>
      )}

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="w-full h-[500px] font-mono text-sm bg-slate-50 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none"
        spellCheck="false"
      />
    </div>
  );
}
