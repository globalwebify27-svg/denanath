"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConferencesClientPage({ initialConferences }: { initialConferences: any[] }) {
  const router = useRouter();
  const conferences = initialConferences;
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this conference?')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/online-payments/conferences/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete conference');
      }

      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error deleting conference');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredConferences = conferences.filter(conf => 
    conf.conferenceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conf.category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 border-l-[8px] border-l-[#007a87] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#002b5c] tracking-tight mb-2">Conference List</h1>
          <p className="text-slate-500 font-medium text-[15px]">Manage all conferences and workshops.</p>
        </div>
        <div className="relative z-10">
          <Link 
            href="/admin/online-payments/conferences/new"
            className="bg-[#007a87] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#007a87]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={20} /> Add Conference
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search conferences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider">Title</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider">Category</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider">Fees</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider w-32">Status</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConferences.map((conf) => (
                <tr key={conf.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 md:p-5 font-semibold text-slate-800">
                    {conf.conferenceTitle}
                  </td>
                  <td className="p-4 md:p-5 font-medium text-slate-600">
                    {conf.category.categoryName}
                  </td>
                  <td className="p-4 md:p-5 font-semibold text-slate-700">
                    ₹{Number(conf.conferenceFee).toFixed(2)}
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      conf.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {conf.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        href={`/admin/online-payments/conferences/${conf.id}`}
                        className="p-2 text-slate-400 hover:text-[#007a87] hover:bg-[#007a87]/10 rounded-lg transition-colors inline-flex"
                        title="Edit Conference"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(conf.id)}
                        disabled={deletingId === conf.id}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-flex disabled:opacity-50"
                        title="Delete Conference"
                      >
                        {deletingId === conf.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredConferences.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                    No conferences found. Click "Add Conference" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}