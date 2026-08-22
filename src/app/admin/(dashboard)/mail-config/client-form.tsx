"use client";

import React, { useState } from "react";
import { Save, Loader2, Mail, Server, Shield, KeyRound, User, Hash, Eye, EyeOff } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

export default function MailConfigClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    smtpHost: initialData?.smtpHost || "",
    smtpPort: initialData?.smtpPort || "",
    smtpUser: initialData?.smtpUser || "",
    smtpPass: initialData?.smtpPass || "",
    encryption: initialData?.encryption || "tls",
    fromEmail: initialData?.fromEmail || "",
    fromName: initialData?.fromName || ""
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testResult, setTestResult] = useState<{success: boolean, message: string} | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleTest = async () => {
    if (!testEmail) {
      alert("Please enter an email address to send the test to.");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/mail-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, toEmail: testEmail })
      });
      const result = await res.json();
      setTestResult({ success: result.success, message: result.message });
    } catch (e: any) {
      setTestResult({ success: false, message: e.message || "Failed to send test email" });
    }
    setTesting(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "mail_config", value: JSON.stringify(data) })
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save settings");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving settings");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Card */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            Mail Configuration
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Configure your SMTP server settings for sending emails.
          </p>
          {success && <p className="text-emerald-600 mt-2 font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Settings saved successfully</p>}
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#005f69] transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>

      {/* SMTP Connection */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Server size={20} />
          </div>
          SMTP Server Connection
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">SMTP Host</label>
            <div className="relative">
              <Server className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={data.smtpHost} 
                onChange={(e) => updateField('smtpHost', e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="e.g. smtp.gmail.com" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">SMTP Port</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={data.smtpPort} 
                onChange={(e) => updateField('smtpPort', e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="e.g. 465, 587" 
              />
            </div>
          </div>
          <div className="space-y-3 md:col-span-2">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">Encryption</label>
            <CustomDropdown
                name="encryption"
                placeholder="Select Encryption"
                icon={Shield}
                options={["TLS", "SSL", "None"]}
                value={data.encryption === "tls" ? "TLS" : data.encryption === "ssl" ? "SSL" : "None"}
                onChange={(val: string) => updateField('encryption', val.toLowerCase())}
                className="w-full !py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]"
              />
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <KeyRound size={20} />
          </div>
          Authentication
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">SMTP Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={data.smtpUser} 
                onChange={(e) => updateField('smtpUser', e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="Username or Email" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">SMTP Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={data.smtpPass} 
                onChange={(e) => updateField('smtpPass', e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="Password or App Password" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sender Details */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Mail size={20} />
          </div>
          Sender Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">From Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                value={data.fromEmail} 
                onChange={(e) => updateField('fromEmail', e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="e.g. info@dmhospital.org" 
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">From Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={data.fromName} 
                onChange={(e) => updateField('fromName', e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="e.g. DM Hospital" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Test Connection */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Mail size={20} />
          </div>
          Test Configuration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-3">
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest">Send Test To</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                value={testEmail} 
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" 
                placeholder="e.g. you@example.com" 
              />
            </div>
          </div>
          <div>
            <button 
              type="button" 
              onClick={handleTest} 
              disabled={testing}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 flex items-center gap-2 font-bold shadow-sm transition-all duration-300 disabled:opacity-50"
            >
              {testing ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
              <span>Send Test Email</span>
            </button>
          </div>
        </div>
        {testResult && (
          <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${testResult.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {testResult.message}
          </div>
        )}
      </div>

    </div>
  );
}
