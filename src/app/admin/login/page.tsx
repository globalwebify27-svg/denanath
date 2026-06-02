"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[600px]">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-white px-6 py-2 rounded-lg shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-[#007a87] rounded-full flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="text-xl font-bold tracking-wide text-[#002b5c]">DMH ADMIN</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#002b5c] mb-2">Management Portal</h1>
          <p className="text-gray-500 text-sm">Please authenticate to manage institutional data</p>
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
            className="w-full flex items-center justify-between bg-[#007a87] hover:bg-[#005c66] text-white py-3.5 px-6 rounded-lg font-bold text-sm transition-colors disabled:opacity-70 mt-4"
          >
            <span>{loading ? "Authenticating..." : "Log In to Dashboard"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
            © 2026 DEENANATH MANGESHKAR HOSPITAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
