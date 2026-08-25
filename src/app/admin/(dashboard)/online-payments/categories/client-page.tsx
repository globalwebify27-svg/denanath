"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Loader2, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomDropdown from "@/components/CustomDropdown";

export default function CategoriesClientPage({ initialCategories }: { initialCategories: any[] }) {
  const router = useRouter();
  const categories = initialCategories;
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ categoryName: '', friendlyCategoryName: '', sortOrder: 0, status: 'Active' });
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ 
      categoryName: category.categoryName, 
      friendlyCategoryName: category.friendlyCategoryName || '', 
      sortOrder: category.sortOrder || 0, 
      status: category.status || 'Active' 
    });
  };

  const handleAdd = () => {
    setEditingCategory({ id: 'new' });
    setFormData({ 
      categoryName: '', 
      friendlyCategoryName: '', 
      sortOrder: categories.length + 1, 
      status: 'Active' 
    });
  };

  const handleSave = async () => {
    if (!formData.categoryName) return alert('Category Name is required');
    
    setSaving(true);
    try {
      const res = await fetch('/api/admin/online-payments/categories', {
        method: editingCategory.id === 'new' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingCategory.id !== 'new' ? editingCategory.id : undefined, ...formData })
      });
      
      if (!res.ok) throw new Error('Failed to save category');
      
      setEditingCategory(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error saving category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteList = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/online-payments/categories?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete category');
      }
      
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error deleting category');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 border-l-[8px] border-l-[#007a87] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#002b5c] tracking-tight mb-2">Payment Categories</h1>
          <p className="text-slate-500 font-medium text-[15px]">Manage payment categories for online transactions.</p>
        </div>
        <div className="relative z-10">
          <button 
            onClick={handleAdd}
            className="bg-[#007a87] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#007a87]/90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Plus size={20} /> Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider">Payment Category</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider w-32">Sort Order</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider w-32">Status</th>
                <th className="p-4 md:p-5 text-sm font-extrabold text-slate-700 uppercase tracking-wider w-24 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 md:p-5 font-semibold text-slate-800">
                    {category.categoryName}
                  </td>
                  <td className="p-4 md:p-5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm">
                      {category.sortOrder}
                    </span>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      category.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(category)}
                        className="p-2 text-slate-400 hover:text-[#007a87] hover:bg-[#007a87]/10 rounded-lg transition-colors inline-flex"
                        title="Edit Category"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteList(category.id)}
                        disabled={deletingId === category.id}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-flex disabled:opacity-50"
                        title="Delete Category"
                      >
                        {deletingId === category.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">
                    No categories found. Click "Add Category" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">
                {editingCategory.id === 'new' ? 'Add Category' : 'Edit Category'}
              </h2>
              <button 
                onClick={() => setEditingCategory(null)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category Name *</label>
                <input 
                  type="text" 
                  value={formData.categoryName} 
                  onChange={e => setFormData({ ...formData, categoryName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Friendly Name</label>
                <input 
                  type="text" 
                  value={formData.friendlyCategoryName} 
                  onChange={e => setFormData({ ...formData, friendlyCategoryName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sort Order</label>
                  <input 
                    type="number" 
                    value={formData.sortOrder} 
                    onChange={e => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <CustomDropdown
                    name="status"
                    options={['Active', 'InActive']}
                    value={formData.status}
                    onChange={(val: string) => setFormData({ ...formData, status: val })}
                    className="w-full !py-3 bg-slate-50 border-slate-200 rounded-xl"
                    hideSearch={true}
                    hidePlaceholderOption={true}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3 justify-end">
              <button 
                onClick={() => setEditingCategory(null)}
                className="px-5 py-2.5 text-slate-600 font-bold rounded-xl hover:bg-slate-200/50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[#007a87] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#007a87]/90 transition-all shadow-sm flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}