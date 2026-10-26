"use client";

import React, { useState, useEffect } from "react";
import QuillEditor from "@/components/QuillEditor";
import { 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  FileText, 
  Mail, 
  AlertCircle, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Pencil, 
  X, 
  CheckCircle2, 
  Search, 
  Loader2, 
  Save,
  ClipboardList,
  Building2,
  Phone
} from "lucide-react";
import { jobsList, fallbackContacts } from "@/app/careers/careersData";

interface JobItem {
  title: string;
  subtitle?: string;
  designation?: string;
  qualification?: string;
  experience?: string;
  requirement?: string;
  preference?: string;
  description?: string;
  duty?: string;
  duration?: string;
}

const emptyJobForm: JobItem = {
  title: "",
  subtitle: "",
  designation: "",
  qualification: "",
  experience: "",
  requirement: "",
  preference: "",
  description: "",
  duty: "",
  duration: ""
};

export default function CareersClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    pageTitle: initialData?.pageTitle || "Careers",
    pageHeader: initialData?.pageHeader || "Active Requirements at DMH",
    applyInstruction: initialData?.applyInstruction || "Please send an email with your CV, mentioning the Job Title in the subject line.",
    applyEmail: initialData?.applyEmail || "jobs@dmhospital.org",
    jobs: initialData?.jobs && initialData.jobs.length > 0 ? initialData.jobs : jobsList,
    contacts: initialData?.contacts && initialData.contacts.length > 0 ? initialData.contacts : fallbackContacts
  });

  const [expandedJobIndex, setExpandedJobIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingJobIndex, setEditingJobIndex] = useState<number | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'general' | 'requirements' | 'description'>('general');
  const [modalForm, setModalForm] = useState<JobItem>(emptyJobForm);
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Notifications & Highlights
  const [successMessage, setSuccessMessage] = useState<{ title: string; isEdit: boolean } | null>(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string | null>(null);
  const [highlightedJobIndex, setHighlightedJobIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    if (!deleteSuccessMessage) return;
    const timer = setTimeout(() => setDeleteSuccessMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [deleteSuccessMessage]);

  const openAddModal = () => {
    setEditingJobIndex(null);
    setModalError(null);
    setModalActiveTab("general");
    setModalForm({ ...emptyJobForm });
    setIsAddModalOpen(true);
  };

  const openEditModal = (index: number) => {
    const target = data.jobs[index];
    if (!target) return;
    setEditingJobIndex(index);
    setModalError(null);
    setModalActiveTab("general");
    setModalForm({
      title: target.title || "",
      subtitle: target.subtitle || "",
      designation: target.designation || "",
      qualification: target.qualification || "",
      experience: target.experience || "",
      requirement: target.requirement || "",
      preference: target.preference || "",
      description: target.description || "",
      duty: target.duty || "",
      duration: target.duration || ""
    });
    setIsAddModalOpen(true);
  };

  const updateModalField = (field: keyof JobItem, value: string) => {
    setModalForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveModalJob = async () => {
    if (!modalForm.title.trim()) {
      setModalError("Please enter a Job Title.");
      setModalActiveTab("general");
      return;
    }

    setIsSubmittingModal(true);
    setModalError(null);

    const formattedJob: JobItem = {
      title: modalForm.title.trim(),
      subtitle: modalForm.subtitle?.trim() || "",
      designation: modalForm.designation?.trim() || "",
      qualification: modalForm.qualification?.trim() || "",
      experience: modalForm.experience?.trim() || "",
      requirement: modalForm.requirement?.trim() || "",
      preference: modalForm.preference?.trim() || "",
      description: modalForm.description || "",
      duty: modalForm.duty?.trim() || "",
      duration: modalForm.duration?.trim() || ""
    };

    const isEditing = editingJobIndex !== null && editingJobIndex >= 0 && editingJobIndex < data.jobs.length;

    let updatedJobs: JobItem[];
    if (isEditing) {
      updatedJobs = data.jobs.map((job: JobItem, idx: number) => 
        idx === editingJobIndex ? formattedJob : job
      );
    } else {
      // Add new job at the TOP of the list
      updatedJobs = [formattedJob, ...data.jobs];
    }

    const updatedData = {
      ...data,
      jobs: updatedJobs
    };

    setData(updatedData);

    // Auto-save directly to the database via /api/settings immediately
    try {
      const seoMetaTitle = (document.querySelector('input[name="seoMetaTitle"]') as HTMLInputElement)?.value || "";
      const seoMetaDescription = (document.querySelector('textarea[name="seoMetaDescription"]') as HTMLTextAreaElement)?.value || "";
      const seoKeywords = (document.querySelector('textarea[name="seoKeywords"]') as HTMLTextAreaElement)?.value || "";

      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'page_careers',
          value: JSON.stringify({
            ...updatedData,
            seoMetaTitle,
            seoMetaDescription,
            seoKeywords
          }),
          pathsToRevalidate: ['/admin/careers', '/careers']
        })
      });
    } catch (err) {
      console.error("Failed to auto-save career job:", err);
    } finally {
      setIsSubmittingModal(false);
      setIsAddModalOpen(false);
      setSuccessMessage({
        title: formattedJob.title,
        isEdit: isEditing
      });
      const highlightIdx = isEditing ? editingJobIndex : 0;
      setHighlightedJobIndex(highlightIdx);
      setSearchQuery(""); // Clear search to make sure the saved job is visible

      setTimeout(() => {
        const el = document.getElementById(`job-card-${highlightIdx}`);
        el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);

      setTimeout(() => {
        setHighlightedJobIndex(null);
      }, 5000);
    }
  };

  const removeJob = async (index: number) => {
    const target = data.jobs[index];
    const targetTitle = target?.title?.trim() || `Job #${index + 1}`;

    if (!window.confirm(`Are you sure you want to permanently delete "${targetTitle}"?`)) {
      return;
    }

    const newJobs = data.jobs.filter((_: any, i: number) => i !== index);
    const updatedData = { ...data, jobs: newJobs };
    setData(updatedData);
    if (expandedJobIndex === index) setExpandedJobIndex(null);

    // Auto-save to database immediately
    try {
      const seoMetaTitle = (document.querySelector('input[name="seoMetaTitle"]') as HTMLInputElement)?.value || "";
      const seoMetaDescription = (document.querySelector('textarea[name="seoMetaDescription"]') as HTMLTextAreaElement)?.value || "";
      const seoKeywords = (document.querySelector('textarea[name="seoKeywords"]') as HTMLTextAreaElement)?.value || "";

      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'page_careers',
          value: JSON.stringify({
            ...updatedData,
            seoMetaTitle,
            seoMetaDescription,
            seoKeywords
          }),
          pathsToRevalidate: ['/admin/careers', '/careers']
        })
      });

      setDeleteSuccessMessage(`"${targetTitle}" has been permanently deleted.`);
    } catch (err) {
      console.error("Failed to delete job posting:", err);
    }
  };

  const updateJob = (index: number, field: string, value: string) => {
    const newJobs = [...data.jobs];
    newJobs[index][field] = value;
    setData({ ...data, jobs: newJobs });
  };

  const addContact = () => {
    setData({
      ...data,
      contacts: [...data.contacts, { iconType: "building", title: "New Department", phone: "" }]
    });
  };

  const removeContact = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    const newContacts = [...data.contacts];
    newContacts.splice(index, 1);
    setData({ ...data, contacts: newContacts });
  };

  const updateContact = (index: number, field: string, value: string) => {
    const newContacts = [...data.contacts];
    newContacts[index][field] = value;
    setData({ ...data, contacts: newContacts });
  };

  // Filter jobs by search
  const filteredJobs = data.jobs.map((job: JobItem, originalIndex: number) => ({ job, originalIndex }))
    .filter(({ job }: { job: JobItem }) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        job.title?.toLowerCase().includes(q) ||
        job.subtitle?.toLowerCase().includes(q) ||
        job.qualification?.toLowerCase().includes(q) ||
        job.designation?.toLowerCase().includes(q) ||
        job.experience?.toLowerCase().includes(q)
      );
    });

  return (
    <>
      <input type="hidden" name="careersJson" value={JSON.stringify(data)} />
      
      {/* Success Notification Banner */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-emerald-500/20">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-950">
                {successMessage.isEdit ? "Job Posting Updated & Saved" : "New Job Created & Published"}
              </h4>
              <p className="text-sm font-medium text-emerald-700 mt-0.5">
                &quot;{successMessage.title}&quot; has been {successMessage.isEdit ? "updated" : "added to the top of the job postings list"} and saved to the database.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-500 hover:text-emerald-700 p-2 hover:bg-emerald-100 rounded-xl transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Delete Success Notification Banner */}
      {deleteSuccessMessage && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-red-500/20">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 className="text-base font-black text-red-900">Job Posting Deleted</h4>
              <p className="text-sm font-medium text-red-700 mt-0.5">{deleteSuccessMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDeleteSuccessMessage(null)}
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-xl transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* General Settings */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-[#002b5c] mb-8 uppercase tracking-wide flex items-center gap-3">
          <FileText className="text-[#007a87]" size={24} /> General Page Information
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Page Title</label>
            <input 
              type="text" 
              value={data.pageTitle}
              onChange={(e) => setData({...data, pageTitle: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Page Header Title</label>
            <input 
              type="text" 
              value={data.pageHeader}
              onChange={(e) => setData({...data, pageHeader: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Application Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={data.applyEmail}
                  onChange={(e) => setData({...data, applyEmail: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Application Instructions</label>
              <input 
                type="text" 
                value={data.applyInstruction}
                onChange={(e) => setData({...data, applyInstruction: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List Management */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-[#002b5c] uppercase tracking-wide flex items-center gap-3">
              <Briefcase className="text-[#007a87]" size={24} /> Job Postings
              <span className="bg-[#007a87]/10 text-[#007a87] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {data.jobs.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Add new jobs or edit details in a modal. Newly created jobs will be placed at the top.
            </p>
          </div>
          
          <button 
            type="button" 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#002b5c] hover:bg-[#001f42] text-white px-5 py-2.5 rounded-xl transition-all font-bold text-sm shadow-sm hover:shadow-md shrink-0"
          >
            <Plus size={18} /> Add New Job
          </button>
        </div>

        {/* Search Bar */}
        {data.jobs.length > 0 && (
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job postings by title, qualification, designation..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        <div className="space-y-3.5">
          {filteredJobs.map(({ job, originalIndex }: { job: JobItem; originalIndex: number }) => {
            const isHighlighted = highlightedJobIndex === originalIndex;
            return (
              <div 
                key={originalIndex} 
                id={`job-card-${originalIndex}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isHighlighted 
                    ? "border-[#007a87] ring-2 ring-[#007a87]/40 bg-teal-50/20 shadow-md" 
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div 
                  className="flex items-center gap-2 p-4 bg-white cursor-pointer hover:bg-slate-50/80 transition-colors"
                  onClick={() => setExpandedJobIndex(expandedJobIndex === originalIndex ? null : originalIndex)}
                >
                  {/* Serial number */}
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-black text-xs ${
                    isHighlighted ? "bg-[#007a87] text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    #{originalIndex + 1}
                  </div>

                  {/* Title + subtitle — takes remaining space */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#002b5c] truncate text-base">{job.title || "Untitled Job"}</h3>
                      {job.duty && (
                        <span className="hidden sm:inline-flex text-[10px] bg-amber-50 text-amber-700 border border-amber-200/60 font-semibold px-2 py-0.5 rounded-md">
                          {job.duty}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium truncate mt-0.5">
                      {job.designation && <span>{job.designation} &bull;</span>}
                      <span>{job.qualification || "No qualification set"}</span>
                    </div>
                  </div>

                  {/* Quick Action: Edit in Modal */}
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      openEditModal(originalIndex); 
                    }}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#007a87] bg-[#007a87]/10 hover:bg-[#007a87] hover:text-white rounded-lg transition-colors"
                    title="Edit job details in modal"
                  >
                    <Pencil size={14} />
                    <span className="hidden sm:inline">Edit Details</span>
                  </button>

                  {/* Delete button */}
                  <button 
                    type="button"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      removeJob(originalIndex); 
                    }}
                    className="shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete job posting"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Chevron arrow */}
                  <div className="shrink-0 p-1.5 text-slate-400">
                    {expandedJobIndex === originalIndex ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {expandedJobIndex === originalIndex && (
                  <div className="p-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white animate-in fade-in duration-200">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Job Title</label>
                      <input 
                        type="text" 
                        value={job.title}
                        onChange={(e) => updateJob(originalIndex, 'title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Subtitle (Optional)</label>
                      <input 
                        type="text" 
                        value={job.subtitle || ""}
                        onChange={(e) => updateJob(originalIndex, 'subtitle', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Designation</label>
                      <input 
                        type="text" 
                        value={job.designation || ""}
                        onChange={(e) => updateJob(originalIndex, 'designation', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Qualification</label>
                      <input 
                        type="text" 
                        value={job.qualification || ""}
                        onChange={(e) => updateJob(originalIndex, 'qualification', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Experience Required</label>
                      <input 
                        type="text" 
                        value={job.experience || ""}
                        onChange={(e) => updateJob(originalIndex, 'experience', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Mandatory Requirement</label>
                      <input 
                        type="text" 
                        value={job.requirement || ""}
                        onChange={(e) => updateJob(originalIndex, 'requirement', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Candidate Preference</label>
                      <input 
                        type="text" 
                        value={job.preference || ""}
                        onChange={(e) => updateJob(originalIndex, 'preference', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Job Description</label>
                      <QuillEditor value={job.description || ""} onChange={content => updateJob(originalIndex, 'description', content)} />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Duty Shifts</label>
                      <input 
                        type="text" 
                        value={job.duty || ""}
                        onChange={(e) => updateJob(originalIndex, 'duty', e.target.value)}
                        placeholder="e.g. Rotational Shifts"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Project Duration</label>
                      <input 
                        type="text" 
                        value={job.duration || ""}
                        onChange={(e) => updateJob(originalIndex, 'duration', e.target.value)}
                        placeholder="e.g. Full Time / Permanent"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              {searchQuery ? (
                <>
                  <p className="text-slate-600 font-bold">No jobs matching &quot;{searchQuery}&quot;</p>
                  <button 
                    type="button" 
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-sm text-[#007a87] font-semibold hover:underline"
                  >
                    Clear search filter
                  </button>
                </>
              ) : (
                <>
                  <p className="text-slate-500 font-medium">No job postings available.</p>
                  <button 
                    type="button" 
                    onClick={openAddModal}
                    className="mt-3 inline-flex items-center gap-2 bg-[#007a87] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
                  >
                    <Plus size={16} /> Add Your First Job
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Department Contacts Management */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-xl font-black text-[#002b5c] uppercase tracking-wide flex items-center gap-3">
            <Phone className="text-[#007a87]" size={24} /> Contact Directory
          </h2>
          <button 
            type="button" 
            onClick={addContact}
            className="flex items-center gap-2 bg-[#002b5c] text-white px-5 py-2.5 rounded-xl hover:bg-[#001f42] transition-colors font-bold text-sm"
          >
            <Plus size={18} /> Add Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.contacts.map((contact: any, index: number) => (
            <div key={index} className="border border-slate-200 bg-slate-50 rounded-2xl p-5 relative">
              <button 
                type="button"
                onClick={() => removeContact(index)}
                className="absolute top-3 right-3 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete contact"
              >
                <Trash2 size={16} color="#D9232D" />
              </button>
              
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">Department Title</label>
                  <input 
                    type="text" 
                    value={contact.title}
                    onChange={(e) => updateContact(index, 'title', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">Phone Numbers</label>
                  <input 
                    type="text" 
                    value={contact.phone}
                    onChange={(e) => updateContact(index, 'phone', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase">Icon Type</label>
                  <select 
                    value={contact.iconType}
                    onChange={(e) => updateContact(index, 'iconType', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87]"
                  >
                    <option value="building">Building (Admin)</option>
                    <option value="stethoscope1">Stethoscope 1</option>
                    <option value="stethoscope2">Stethoscope 2</option>
                    <option value="briefcase">Briefcase</option>
                    <option value="heart">Heart</option>
                    <option value="pill">Pill (Pharmacy)</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Add/Edit Job Modal (Same pattern as Events) */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#007a87]/10 text-[#007a87] flex items-center justify-center shadow-sm">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#002b5c]">
                    {editingJobIndex !== null 
                      ? `Edit Job: ${modalForm.title || "Untitled"}` 
                      : "Add New Job Posting"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {editingJobIndex !== null 
                      ? "Update the job posting details and save immediately." 
                      : "Fill in the details below. It will be added as Job #1 at the top of the careers page."}
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="border-b border-slate-200 bg-slate-50/90 p-2 sm:p-3 shrink-0">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'general', label: 'Role & General', icon: Briefcase },
                  { id: 'requirements', label: 'Qualifications & Eligibility', icon: GraduationCap },
                  { id: 'description', label: 'Job Description', icon: FileText }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = modalActiveTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setModalActiveTab(tab.id as any)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isActive
                          ? "bg-white text-[#002b5c] shadow-sm border border-slate-200/80"
                          : "text-slate-600 hover:text-[#002b5c] hover:bg-white/60"
                      }`}
                    >
                      <Icon size={16} className={isActive ? "text-[#007a87]" : "text-slate-400"} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
              {modalError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-700 text-sm font-semibold">
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Tab 1: General & Role */}
              {modalActiveTab === 'general' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={modalForm.title}
                      onChange={(e) => updateModalField('title', e.target.value)}
                      placeholder="e.g. Staff Nurse, Blood Bank Technician, Catering Guest Coordinator"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Subtitle / Department (Optional)
                      </label>
                      <input 
                        type="text"
                        value={modalForm.subtitle || ""}
                        onChange={(e) => updateModalField('subtitle', e.target.value)}
                        placeholder="e.g. Critical Care Unit, Retail Pharmacy"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Designation
                      </label>
                      <input 
                        type="text"
                        value={modalForm.designation || ""}
                        onChange={(e) => updateModalField('designation', e.target.value)}
                        placeholder="e.g. Junior / Senior Executive, Coordinator"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" /> Duty Shifts
                      </label>
                      <input 
                        type="text"
                        value={modalForm.duty || ""}
                        onChange={(e) => updateModalField('duty', e.target.value)}
                        placeholder="e.g. Rotational Shifts, 9am to 5pm, 24/7"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" /> Project Duration
                      </label>
                      <input 
                        type="text"
                        value={modalForm.duration || ""}
                        onChange={(e) => updateModalField('duration', e.target.value)}
                        placeholder="e.g. Full Time / Permanent, 1 Year Contract"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Qualifications & Eligibility */}
              {modalActiveTab === 'requirements' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-[#007a87]" /> Qualification
                    </label>
                    <input 
                      type="text"
                      value={modalForm.qualification || ""}
                      onChange={(e) => updateModalField('qualification', e.target.value)}
                      placeholder="e.g. ANM, GNM, BSc- Nursing, PBBSc, BHMCT"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <Briefcase size={14} className="text-blue-500" /> Experience Required
                    </label>
                    <input 
                      type="text"
                      value={modalForm.experience || ""}
                      onChange={(e) => updateModalField('experience', e.target.value)}
                      placeholder="e.g. Fresher / 1 to 3 years in hospital set up"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <ClipboardList size={14} className="text-orange-500" /> Mandatory Requirement
                    </label>
                    <input 
                      type="text"
                      value={modalForm.requirement || ""}
                      onChange={(e) => updateModalField('requirement', e.target.value)}
                      placeholder="e.g. MNC Registration Compulsory, Registration and PPP CARD Compulsory"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                      <ClipboardList size={14} className="text-amber-500" /> Candidate Preference
                    </label>
                    <input 
                      type="text"
                      value={modalForm.preference || ""}
                      onChange={(e) => updateModalField('preference', e.target.value)}
                      placeholder="e.g. Preferably in large hospital setup, immediate joiners"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Job Description */}
              {modalActiveTab === 'description' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Job Description & Responsibilities
                    </label>
                    <span className="text-xs text-slate-400">Rich text editor formatted</span>
                  </div>
                  <QuillEditor 
                    value={modalForm.description || ""} 
                    onChange={(content) => updateModalField('description', content)} 
                  />
                  <p className="text-xs text-slate-500 italic mt-2">
                    Describe core daily tasks, reporting structure, and key responsibilities for the candidate.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                disabled={isSubmittingModal}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-sm font-bold transition-all disabled:opacity-50 w-full sm:w-auto"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {modalActiveTab !== 'general' && (
                  <button
                    type="button"
                    onClick={() => {
                      const tabs = ['general', 'requirements', 'description'] as const;
                      const idx = tabs.indexOf(modalActiveTab);
                      if (idx > 0) setModalActiveTab(tabs[idx - 1]);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-sm font-bold flex items-center gap-1.5 transition-all"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                )}

                {modalActiveTab !== 'description' ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (modalActiveTab === 'general' && !modalForm.title.trim()) {
                        setModalError("Please enter a Job Title before proceeding.");
                        return;
                      }
                      setModalError(null);
                      const tabs = ['general', 'requirements', 'description'] as const;
                      const idx = tabs.indexOf(modalActiveTab);
                      if (idx < tabs.length - 1) setModalActiveTab(tabs[idx + 1]);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#002b5c] hover:bg-[#001f42] text-white text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleSaveModalJob}
                    disabled={isSubmittingModal}
                    className="px-6 py-2.5 rounded-xl bg-[#007a87] hover:bg-[#005f6b] text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                  >
                    {isSubmittingModal ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{editingJobIndex !== null ? "Saving..." : "Creating & Saving..."}</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>{editingJobIndex !== null ? "Save Changes" : "Save Job Posting"}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </>
  );
}
