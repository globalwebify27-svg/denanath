"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText, Info, Loader2, Link as LinkIcon, Settings, Mail, Calendar, Upload, Trash2 } from "lucide-react";
import Link from "next/link";
import CustomDropdown from "@/components/CustomDropdown";
import QuillEditor from "@/components/QuillEditor";

interface Category {
  id: number;
  categoryName: string;
}

interface ConferenceFormProps {
  conferenceId?: number;
  initialData?: any;
  categories: Category[];
}

export default function ConferenceForm({ conferenceId, initialData, categories }: ConferenceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isNew = !conferenceId;

  const [formData, setFormData] = useState({
    categoryId: initialData?.onlinePaCategoryId || (categories.length > 0 ? categories[0].id : ""),
    title: initialData?.conferenceTitle || "",
    friendlyTitle: initialData?.friendlyTitle || "",
    dropDownTitle: initialData?.dropDownTitle || "",
    metaTitle: initialData?.metaTitle || "",
    fees: initialData?.conferenceFee || "",
    startDate: initialData?.conferenceDate ? new Date(initialData.conferenceDate).toISOString().split('T')[0] : "",
    expiryDate: initialData?.conferenceExpiryDate ? new Date(initialData.conferenceExpiryDate).toISOString().split('T')[0] : "",
    status: initialData?.status || "Active",
    sortOrder: initialData?.sort || "0",
    showOnFront: initialData?.showInFront || false,
    registrationLimit: initialData?.confRegLimit || "",
    longDescription: initialData?.conferenceLongDesc || "",
    adminMailId: initialData?.confAdminEmail || "",
    mailSubject: initialData?.confMailSubject || "",
    mailBody: initialData?.confMailBody || "",
    metaKeyword: initialData?.metaKeyword || "",
    metaDescription: initialData?.metaDescription || "",
    imageName: initialData?.conferenceImageName || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isNew ? '/api/admin/online-payments/conferences' : `/api/admin/online-payments/conferences/${conferenceId}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to save conference');
      }

      router.push('/admin/online-payments/conferences');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error saving conference');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 border-l-[8px] border-l-[#007a87] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <Link 
            href="/admin/online-payments/conferences" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#007a87] transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Conferences
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-[#002b5c] tracking-tight mb-2">
            {isNew ? 'Add Conference' : 'Edit Conference'}
          </h1>
          <p className="text-slate-500 font-medium text-[15px]">
            Fill in the details below to {isNew ? 'create a new' : 'update the'} conference.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <Link 
            href="/admin/online-payments/conferences"
            className="px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#007a87]/90 transition-all shadow-sm flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isNew ? 'Save' : 'Update'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-slate-100 text-[#002b5c] rounded-full mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#002b5c]">General Information</h2>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Core details and descriptive texts for the conference.</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Category *</label>
                <CustomDropdown
                  name="categoryId"
                  placeholder="Select Category"
                  options={categories.map((c) => c.categoryName)}
                  value={categories.find((c) => c.id === formData.categoryId)?.categoryName || ""}
                  onChange={(val: string) => {
                    const cat = categories.find((c) => c.categoryName === val);
                    if (cat) setFormData({ ...formData, categoryId: cat.id });
                  }}
                  className="w-full !py-3 bg-slate-50 border-slate-200 rounded-xl text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-1">Title *</label>
                <p className="text-xs text-red-500 font-medium mb-2">(Maximum 150 alphanumerals only)</p>
                <input
                  type="text"
                  required
                  maxLength={150}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-1">Friendly Title *</label>
                <p className="text-xs text-red-500 font-medium mb-2">(Please Do not use spaces,special Characters.) (Maximum 100 alphanumerals only)</p>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.friendlyTitle}
                  onChange={(e) => setFormData({ ...formData, friendlyTitle: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-1">Name which appears in DropDown List *</label>
                <p className="text-xs text-slate-500 font-medium mb-2">(Name is appear on Payment Form) (Maximum 150 alphanumerals only)</p>
                <input
                  type="text"
                  required
                  maxLength={150}
                  value={formData.dropDownTitle}
                  onChange={(e) => setFormData({ ...formData, dropDownTitle: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-1">Long Description</label>
                <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden [&_.jodit-container]:!border-none">
                  <QuillEditor
                    value={formData.longDescription}
                    onChange={(val) => setFormData({ ...formData, longDescription: val })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-slate-100 text-[#002b5c] rounded-full mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#002b5c]">Email Notification Settings</h2>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Configure automated emails sent to attendees.</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Admin Mail Id *</label>
                  <input
                    type="email"
                    required
                    value={formData.adminMailId}
                    onChange={(e) => setFormData({ ...formData, adminMailId: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Mail Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.mailSubject}
                    onChange={(e) => setFormData({ ...formData, mailSubject: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Mail Body</label>
                <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden [&_.jodit-container]:!border-none">
                  <QuillEditor
                    value={formData.mailBody}
                    onChange={(val) => setFormData({ ...formData, mailBody: val })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-slate-100 text-[#002b5c] rounded-full mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#002b5c]">SEO Settings</h2>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Optimize how this conference appears in search engines.</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-1">Meta Title</label>
                <p className="text-xs text-slate-500 font-medium mb-2">(Apperas in H1 Tag) (Maximum 150 alphanumerals only)</p>
                <input
                  type="text"
                  maxLength={150}
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Meta Keyword</label>
                <input
                  type="text"
                  value={formData.metaKeyword}
                  onChange={(e) => setFormData({ ...formData, metaKeyword: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium resize-none"
                />
              </div>
            </div>
          </div>
          
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
              <div className="p-2.5 bg-slate-100 text-[#002b5c] rounded-full mt-1">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#002b5c]">Configuration</h2>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Control pricing and dates.</p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Fees *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.fees}
                  onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Start Date *</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Expiry Date *</label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Status *</label>
                <CustomDropdown
                  name="status"
                  placeholder="Select Status"
                  options={["Active", "InActive"]}
                  value={formData.status}
                  onChange={(val: string) => setFormData({ ...formData, status: val })}
                  className="w-full !py-3 bg-slate-50 border-slate-200 rounded-xl text-slate-700 font-medium"
                  hideSearch={true}
                  hidePlaceholderOption={true}
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Sort Order *</label>
                <input
                  type="number"
                  required
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2">Conference Reg. Limit</label>
                <input
                  type="number"
                  value={formData.registrationLimit}
                  onChange={(e) => setFormData({ ...formData, registrationLimit: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="showOnFront"
                  checked={formData.showOnFront}
                  onChange={(e) => setFormData({ ...formData, showOnFront: e.target.checked })}
                  className="w-5 h-5 rounded text-[#007a87] focus:ring-[#007a87]/30"
                />
                <label htmlFor="showOnFront" className="text-[14px] font-bold text-slate-700">
                  Show On Front
                </label>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}