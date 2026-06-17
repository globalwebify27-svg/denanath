"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      document.cookie = "adminAuth=true; path=/; max-age=86400";
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row min-h-[600px] overflow-hidden">
        {/* Left Side: Brand Cover */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#002b5c] p-12 flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-[#002b5c] via-[#004799] to-[#007a87] z-0" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay z-0" />
          
          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative flex items-center justify-center w-48 h-12 rounded-lg bg-white p-1 shrink-0 shadow-sm">
              <img src="/images/Untitled design11.png" alt="DMH Logo" className="w-full h-full object-contain" />
            </div>

          </div>

          {/* Middle Text */}
          <div className="relative z-10">
            <h2 className="text-5xl font-black text-white italic tracking-tight mb-8">
              Command<br/>Center.
            </h2>
            <div className="text-[10px] font-bold text-blue-200/90 tracking-[0.2em] uppercase leading-relaxed space-y-2">
              <p>Authorized Personnel Only.</p>
              <p>Secure Administrative Control Gateway.</p>
            </div>
          </div>

          {/* Bottom Icons/Text */}
          <div className="relative z-10 flex items-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/50 tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/50 tracking-wider uppercase">
              <Globe className="w-4 h-4" />
              <span>Global Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-8 sm:p-12 xl:p-16">
          <div className="w-full max-w-[400px]">
        {/* Header Section */}
        <div className="mb-10 text-left w-full">
          <h1 className="text-[22px] font-black text-[#002b5c] tracking-tight uppercase mb-1">
            Secure Login
          </h1>
          <p className="text-[9px] font-bold text-[#007a87] tracking-[0.15em] uppercase">
            Access your hospital dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wider uppercase">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin_username"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#007a87] focus:border-[#007a87] transition-colors outline-none bg-white text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 tracking-wider uppercase">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#007a87] focus:border-[#007a87] transition-colors outline-none bg-white text-gray-700 font-mono tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-[#007a87] hover:bg-[#005c66] text-white py-3.5 px-6 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] transition-colors disabled:opacity-70 mt-4"
          >
            <span>{loading ? "Authenticating..." : "Log In to Dashboard"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
            © 2026 DEENANATH MANGESHKAR HOSPITAL AND RESEARCH CENTER. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
