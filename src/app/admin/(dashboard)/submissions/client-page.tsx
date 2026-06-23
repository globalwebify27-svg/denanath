"use client";

import React, { useState, useTransition } from "react";
import { 
  Search, 
  Trash2, 
  Eye, 
  X, 
  FileText, 
  Mail, 
  Phone, 
  Calendar, 
  Inbox, 
  ChevronRight, 
  FileCheck,
  CheckCircle,
  Building,
  User,
  Heart,
  Globe,
  Pencil,
  Filter,
  ChevronDown
} from "lucide-react";

interface Submission {
  id: string;
  formType: string;
  data: string;
  files: string | null;
  status: string;
  createdAt: string;
}

export default function SubmissionsClientPage({ 
  submissions, 
  deleteSubmission,
  updateSubmission
}: { 
  submissions: Submission[];
  deleteSubmission: (id: string) => Promise<void>;
  updateSubmission: (id: string, formType: string, dataString: string) => Promise<void>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormType, setSelectedFormType] = useState("All");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormType, setEditFormType] = useState("");
  const [editData, setEditData] = useState<any>({});

  // Helper to convert camelCase to readable title
  const camelCaseToWords = (str: string) => {
    // Check if it's already upper/title case
    if (str === "dob") return "Date of Birth";
    if (str === "panNumber") return "PAN Number";
    if (str === "aadharNumber") return "Aadhar Number";
    
    const result = str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());
    return result.trim();
  };

  // Helper to format values dynamically
  const formatValue = (key: string, val: any) => {
    if (val === null || val === undefined) return "N/A";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "string" && val.startsWith("/uploads/")) {
      return (
        <a 
          href={val} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-1.5 text-[#007a87] hover:text-[#005c66] font-bold transition-colors hover:underline"
        >
          <FileText size={16} /> View/Download File
        </a>
      );
    }
    return String(val);
  };

  // Helper to parse submission data safely
  const parseData = (submission: Submission) => {
    try {
      const parsed = JSON.parse(submission.data);
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    } catch (e) {
      return {};
    }
  };

  // Helper to get form source page
  const getSource = (submission: Submission, parsedData: any) => {
    if (submission.formType === "Job Application") {
      return "Careers";
    }
    if (submission.formType === "Book Appointment") {
      return "Book Appointment";
    }
    if (submission.formType === "Patient Registration") {
      return "Patient Registration";
    }
    if (submission.formType === "Contact Us") {
      return "Contact Us";
    }
    return "Website Form";
  };

  // Helper to parse submission files safely
  const parseFiles = (submission: Submission) => {
    try {
      const parsed = submission.files ? JSON.parse(submission.files) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  // Extract primary summary details for a row
  const getSummary = (formType: string, parsedData: any) => {
    let name = "";
    let email = "";
    let phone = "";
    
    if (formType === "Job Application") {
      name = `${parsedData.firstName || ""} ${parsedData.lastName || ""}`.trim();
      email = parsedData.email || "";
      phone = parsedData.mobile || "";
    } else if (formType === "Book Appointment") {
      name = `${parsedData.firstName || ""} ${parsedData.lastName || ""}`.trim();
      email = parsedData.email || "";
      phone = parsedData.phone || "";
    } else if (formType === "Patient Registration") {
      name = `${parsedData.firstName || ""} ${parsedData.lastName || ""}`.trim();
      email = parsedData.email || "";
      phone = parsedData.localMobile || "";
    } else {
      name = parsedData.name || `${parsedData.firstName || ""} ${parsedData.lastName || ""}`.trim();
      email = parsedData.email || "";
      phone = parsedData.phone || parsedData.mobile || "";
    }

    return {
      name: name || "N/A",
      email: email || "N/A",
      phone: phone || "N/A",
    };
  };

  // Unique Form Types list for filtering
  const formTypes = ["All", "Book Appointment", "Job Application", "Patient Registration", "Contact Us"];

  // Counters
  const totalCount = submissions.length;
  const jobCount = submissions.filter(s => s.formType === "Job Application").length;
  const appointmentCount = submissions.filter(s => s.formType === "Book Appointment").length;
  const patientCount = submissions.filter(s => s.formType === "Patient Registration").length;
  const contactCount = submissions.filter(s => s.formType === "Contact Us").length;

  // Filtered submissions
  const filteredSubmissions = submissions.filter(s => {
    const parsedData = parseData(s);
    const summary = getSummary(s.formType, parsedData);
    
    // Form Type filter
    if (selectedFormType !== "All" && s.formType !== selectedFormType) {
      return false;
    }

    // Search query match
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const contentMatch = s.data.toLowerCase().includes(searchLower);
      const typeMatch = s.formType.toLowerCase().includes(searchLower);
      const nameMatch = summary.name.toLowerCase().includes(searchLower);
      const emailMatch = summary.email.toLowerCase().includes(searchLower);
      const phoneMatch = summary.phone.toLowerCase().includes(searchLower);
      
      return contentMatch || typeMatch || nameMatch || emailMatch || phoneMatch;
    }

    return true;
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission permanently?")) {
      startTransition(async () => {
        await deleteSubmission(id);
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
      });
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32 font-sans">
      
      {/* Header Banner */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Form Submissions
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Monitor and review requests submitted from all interactive frontend forms including appointments, job applications, and patient registrations.
          </p>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <Inbox size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</span>
          <span className="text-2xl md:text-3xl font-black text-[#002b5c] mt-1">{totalCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Appointments</span>
          <span className="text-2xl md:text-3xl font-black text-emerald-600 mt-1">{appointmentCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Applications</span>
          <span className="text-2xl md:text-3xl font-black text-blue-600 mt-1">{jobCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registrations</span>
          <span className="text-2xl md:text-3xl font-black text-amber-600 mt-1">{patientCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col col-span-2 lg:col-span-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Us</span>
          <span className="text-2xl md:text-3xl font-black text-purple-600 mt-1">{contactCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Filter Selection Dropdown (Non-Linear) */}
        <div className="relative w-full sm:w-64">
          <select
            value={selectedFormType}
            onChange={(e) => setSelectedFormType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3.5 pr-10 text-xs md:text-sm text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] appearance-none cursor-pointer transition-all shadow-sm"
          >
            <option value="All">All Form Pages</option>
            <option value="Book Appointment">Book Appointment</option>
            <option value="Job Application">Job Application</option>
            <option value="Patient Registration">Patient Registration</option>
            <option value="Contact Us">Contact Us</option>
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Search Field */}
        <div className="relative w-full lg:w-60 shrink-0">
          <input
            type="text"
            placeholder="Search details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Submissions List Grid/Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Form Type</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Source</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Submitted By</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Contact Info</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Date & Time</th>
                <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((submission) => {
                const parsedData = parseData(submission);
                const summary = getSummary(submission.formType, parsedData);
                const hasFiles = parseFiles(submission).length > 0;
                
                let badgeColor = "bg-purple-50 text-purple-700 border-purple-100";
                if (submission.formType === "Book Appointment") badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                if (submission.formType === "Job Application") badgeColor = "bg-blue-50 text-blue-700 border-blue-100";
                if (submission.formType === "Patient Registration") badgeColor = "bg-amber-50 text-amber-700 border-amber-100";

                return (
                  <tr 
                    key={submission.id} 
                    className="hover:bg-slate-50/50 cursor-pointer group transition-colors"
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setIsEditing(false);
                    }}
                  >
                    {/* Form Type Badge */}
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold leading-none ${badgeColor}`}>
                        {submission.formType}
                        {hasFiles && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" title="Has attachment" />}
                      </span>
                    </td>
                    
                    {/* Source Page */}
                    <td className="p-5 text-sm text-slate-600 font-semibold max-w-[180px] truncate">
                      {getSource(submission, parsedData)}
                    </td>
                    
                    {/* Name */}
                    <td className="p-5 font-bold text-[#002b5c] max-w-[200px] truncate">
                      {summary.name}
                    </td>
                    
                    {/* Email/Phone */}
                    <td className="p-5">
                      <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Mail size={12} className="text-slate-400" />
                          <span>{summary.email}</span>
                        </div>
                        {summary.phone && (
                          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <Phone size={12} className="text-slate-400" />
                            <span>{summary.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Date */}
                    <td className="p-5 text-sm text-slate-500 font-medium" suppressHydrationWarning>
                      {new Date(submission.createdAt).toLocaleString()}
                    </td>
                    
                    {/* Action Buttons */}
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setIsEditing(false);
                          }}
                          className="p-2 text-slate-400 hover:text-[#007a87] hover:bg-teal-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setIsEditing(true);
                            setEditFormType(submission.formType);
                            setEditData(parseData(submission));
                          }}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit Submission"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(submission.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Submission"
                          disabled={isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-700 text-lg">No Submissions Found</h3>
                    <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">We couldn't find any submissions matching your filter or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Detail Modal / Drawer */}
      {selectedSubmission && (() => {
        const parsedData = parseData(selectedSubmission);
        const parsedFiles = parseFiles(selectedSubmission);
        
        let headerColor = "from-purple-600 to-indigo-600";
        let FormIcon = FileText;
        if (selectedSubmission.formType === "Book Appointment") {
          headerColor = "from-emerald-600 to-teal-600";
          FormIcon = Calendar;
        }
        if (selectedSubmission.formType === "Job Application") {
          headerColor = "from-blue-600 to-sky-600";
          FormIcon = FileCheck;
        }
        if (selectedSubmission.formType === "Patient Registration") {
          headerColor = "from-amber-500 to-orange-600";
          FormIcon = Globe;
        }
        if (selectedSubmission.formType === "Contact Us") {
          FormIcon = Mail;
        }

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
            {/* Modal Container */}
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col relative my-auto animate-slideUp overflow-hidden">
              
              {/* Header */}
              <div className="p-4 sm:p-6 bg-[#003360] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="bg-white/20 p-1.5 sm:p-2 rounded-xl shrink-0">
                    <FormIcon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-xl font-black leading-snug break-words">{selectedSubmission.formType}</h2>
                    <p className="text-[10px] sm:text-xs font-semibold text-white/80 mt-0.5 break-words" suppressHydrationWarning>
                      Submitted on {new Date(selectedSubmission.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isEditing ? (
                  <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-2">
                      <Pencil size={16} /> Edit Submission Details
                    </h3>
                    
                    {/* Form/Page Type select */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Page Type Option
                      </label>
                      <select
                        value={editFormType}
                        onChange={(e) => setEditFormType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                      >
                        <option value="Book Appointment">Book Appointment</option>
                        <option value="Job Application">Job Application</option>
                        <option value="Patient Registration">Patient Registration</option>
                        <option value="Contact Us">Contact Us</option>
                      </select>
                    </div>

                    {/* Payload Fields */}
                    <div className="space-y-4 pt-2">
                      {Object.entries(editData).map(([key, val]) => {
                        if (key === "captcha") return null;
                        const labelText = camelCaseToWords(key);
                        const isFile = typeof val === "string" && val.startsWith("/uploads/");

                        return (
                          <div key={key} className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                              <span>{labelText}</span>
                              {isFile && <span className="text-[10px] text-teal-600 font-semibold lowercase">File Attachment Path</span>}
                            </label>
                            {isFile ? (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={String(val)}
                                  disabled
                                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-500 font-medium cursor-not-allowed"
                                />
                                <a
                                  href={String(val)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
                                >
                                  <FileText size={16} /> View
                                </a>
                              </div>
                            ) : typeof val === "string" && (val.length > 60 || val.includes("\n")) ? (
                              <textarea
                                value={String(val)}
                                onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                                rows={3}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                              />
                            ) : (
                              <input
                                type="text"
                                value={String(val)}
                                onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dynamically Render Form Fields (View Mode) */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4">
                      <div className="flex items-start sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                        <h3 className="text-[11px] sm:text-sm font-black text-slate-400 uppercase tracking-normal sm:tracking-widest flex items-start sm:items-center gap-1.5 leading-tight">
                          <User size={14} className="shrink-0 mt-0.5 sm:mt-0" />
                          <span>
                            <span className="block sm:inline">Submission</span>
                            <span className="block sm:inline sm:ml-1">Payload</span>
                          </span>
                        </h3>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setEditFormType(selectedSubmission.formType);
                            setEditData(parseData(selectedSubmission));
                          }}
                          className="text-[11px] sm:text-xs font-bold text-[#007a87] hover:text-[#005c66] flex items-center gap-1 hover:underline shrink-0 whitespace-nowrap"
                        >
                          <Pencil size={12} /> Edit Fields
                        </button>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {Object.entries(parsedData).map(([key, val]) => {
                          if (key === "captcha") return null;
                          return (
                            <div key={key} className="py-3.5 flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                              <span className="w-full md:w-1/3 text-slate-500 font-bold uppercase text-[11px] tracking-wider pt-0.5">
                                {camelCaseToWords(key)}
                              </span>
                              <span className="flex-1 text-slate-800 font-medium text-sm whitespace-pre-wrap leading-relaxed">
                                {formatValue(key, val)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Attachments Section if present */}
                    {parsedFiles.length > 0 && (
                      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200/60 pb-2 flex items-center gap-2">
                          <FileText size={16} /> Attachments ({parsedFiles.length})
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {parsedFiles.map((file: string, index: number) => {
                            const filename = file.split("/").pop() || `Attachment-${index + 1}`;
                            return (
                              <a
                                key={index}
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white border border-slate-200 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2 hover:bg-slate-50 hover:border-teal-500 transition-all group/file shadow-sm"
                              >
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                  <FileText className="text-[#007a87] w-5 h-5 shrink-0" />
                                  <span className="text-xs sm:text-sm font-bold text-slate-700 truncate min-w-0 flex-1">
                                    {filename}
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-[#007a87] group-hover/file:underline flex items-center gap-1 shrink-0">
                                  <span className="hidden sm:inline">Download</span> <ChevronRight size={14} />
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer Actions (Only in Editing Mode) */}
              {isEditing && (
                <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      startTransition(async () => {
                        await updateSubmission(
                          selectedSubmission.id,
                          editFormType,
                          JSON.stringify(editData)
                        );
                        // Update local states
                        setSelectedSubmission({
                          ...selectedSubmission,
                          formType: editFormType,
                          data: JSON.stringify(editData),
                        });
                        setIsEditing(false);
                      });
                    }}
                    disabled={isPending}
                    className="px-5 py-2.5 bg-[#007a87] hover:bg-[#005c66] disabled:bg-[#007a87]/50 text-white rounded-xl text-sm font-bold transition-all shadow-sm"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}

            </div>
          </div>
        );
      })()}

    </div>
  );
}
