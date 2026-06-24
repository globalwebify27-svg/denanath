"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, AlertTriangle } from "lucide-react";

export default function ManageAppointmentsClientPage() {
  const [transactionId, setTransactionId] = useState("");
  const [dob, setDob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/dmh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'cancel_appointment', 
          transaction_id: transactionId, 
          dob 
        })
      });
      const data = await res.json();
      
      if (data && !data.error) {
        setMessage({ type: 'success', text: 'Appointment cancelled successfully.' });
        setTransactionId("");
        setDob("");
      } else {
        setMessage({ type: 'error', text: data?.error || 'Failed to cancel appointment. Please check your details.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Manage Appointments</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Cancel Appointment
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100 p-8 md:p-12">
          
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#002b5c] mb-2">Cancel Your Appointment</h2>
            <p className="text-slate-500">Please enter your Transaction ID and Date of Birth to cancel your existing appointment.</p>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleCancel} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Transaction ID <span className="text-red-500">*</span></label>
              <input 
                required 
                type="text" 
                value={transactionId} 
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow" 
                placeholder="e.g. TXN123456" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
              <input 
                required 
                type="text" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] transition-shadow" 
                placeholder="DD/MM/YYYY" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md mt-4 disabled:opacity-70"
            >
              {isSubmitting ? "Cancelling..." : "Cancel Appointment"}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
