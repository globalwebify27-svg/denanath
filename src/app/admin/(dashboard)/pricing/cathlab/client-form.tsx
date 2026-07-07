"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function CathlabClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    title: initialData?.title || "Cathlab Pharmacy Stent Price List",
    subtitle: initialData?.subtitle || "",
    tableData: initialData?.tableData || []
  });

  const updateField = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addRow = () => {
    const newRow = {
      srNo: String(data.tableData.length + 1),
      item: "",
      category: "DRUG ELUTING",
      manufacturer: "",
      mrp: ""
    };
    setData(prev => ({ ...prev, tableData: [...prev.tableData, newRow] }));
  };

  const updateRow = (index: number, key: string, value: string) => {
    setData(prev => {
      const newTable = [...prev.tableData];
      newTable[index] = { ...newTable[index], [key]: value };
      return { ...prev, tableData: newTable };
    });
  };

  const removeRow = (index: number) => {
    setData(prev => {
      const newTable = prev.tableData.filter((_, i) => i !== index);
      const renumbered = newTable.map((row, i) => ({ ...row, srNo: String(i + 1) }));
      return { ...prev, tableData: renumbered };
    });
  };

  return (
    <div className="space-y-8">
      <input type="hidden" name="pricingJson" value={JSON.stringify(data)} />

      {/* Basic Details */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <h2 className="text-[20px] font-black text-[#002b5c] border-b pb-4">Header Details</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Page Title</label>
            <input type="text" value={data.title} onChange={e => updateField("title", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Cathlab Pharmacy Stent Price List" />
          </div>
          <div>
            <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Subtitle / Notice</label>
            <input type="text" value={data.subtitle} onChange={e => updateField("subtitle", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Notice text..." />
          </div>
        </div>
      </div>

      {/* Table Details */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-[20px] font-black text-[#002b5c]">Pricing Table</h2>
          <button type="button" onClick={addRow} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
            <Plus size={16} /> Add Row
          </button>
        </div>
        
        <div className="space-y-4">
          {data.tableData.map((row: any, idx: number) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <button type="button" onClick={() => removeRow(idx)} className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg shadow-sm z-10">
                <Trash2 size={16} />
              </button>
              
              <div className="md:col-span-2 lg:col-span-4 flex items-center gap-2 mb-1 border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">#{row.srNo}</span>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Item Description</label>
                <input type="text" value={row.item} onChange={e => updateRow(idx, 'item', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700" placeholder="e.g. STENT - ULTIMASTER..." />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                <input type="text" value={row.category} onChange={e => updateRow(idx, 'category', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. DRUG ELUTING" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Manufacturer</label>
                <input type="text" value={row.manufacturer} onChange={e => updateRow(idx, 'manufacturer', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. TERUMO INDIA PVT. LTD." />
              </div>
              
              <div className="lg:col-span-4 mt-2">
                <label className="block text-sm font-bold text-emerald-700 mb-1">M.R.P. (₹)</label>
                <input type="text" value={row.mrp} onChange={e => updateRow(idx, 'mrp', e.target.value)} className="w-full md:w-1/4 p-2 border-2 border-emerald-200 bg-emerald-50 rounded-lg font-bold text-emerald-800" placeholder="e.g. 41,145.33" />
              </div>
              
            </div>
          ))}
          {data.tableData.length === 0 && (
            <p className="text-slate-500 text-center py-6">No rows added yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
