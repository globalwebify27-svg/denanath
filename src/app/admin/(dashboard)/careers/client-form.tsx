"use client";

import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Building2, Briefcase, GraduationCap, Clock, FileText, Send, Phone, Mail, AlertCircle, Calendar, ChevronDown, ChevronUp, User, ShieldCheck, HeartPulse, Pill, Stethoscope } from "lucide-react";
import { jobsList, fallbackContacts } from "@/app/careers/careersData";

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

  const addJob = () => {
    setData({
      ...data,
      jobs: [
        ...data.jobs,
        {
          title: "New Job Posting",
          subtitle: "",
          designation: "",
          qualification: "",
          experience: "",
          requirement: "",
          preference: "",
          description: "",
          duty: "",
          duration: ""
        }
      ]
    });
    setExpandedJobIndex(data.jobs.length);
  };

  const removeJob = (index: number) => {
    const newJobs = [...data.jobs];
    newJobs.splice(index, 1);
    setData({ ...data, jobs: newJobs });
    if (expandedJobIndex === index) setExpandedJobIndex(null);
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
    const newContacts = [...data.contacts];
    newContacts.splice(index, 1);
    setData({ ...data, contacts: newContacts });
  };

  const updateContact = (index: number, field: string, value: string) => {
    const newContacts = [...data.contacts];
    newContacts[index][field] = value;
    setData({ ...data, contacts: newContacts });
  };

  return (
    <>
      <input type="hidden" name="careersJson" value={JSON.stringify(data)} />
      
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-xl font-black text-[#002b5c] uppercase tracking-wide flex items-center gap-3">
            <Briefcase className="text-[#007a87]" size={24} /> Job Postings ({data.jobs.length})
          </h2>
          <button 
            type="button" 
            onClick={addJob}
            className="flex items-center gap-2 bg-[#002b5c] text-white px-5 py-2.5 rounded-xl hover:bg-[#001f42] transition-colors font-bold text-sm"
          >
            <Plus size={18} /> Add New Job
          </button>
        </div>

        <div className="space-y-4">
          {data.jobs.map((job: any, index: number) => (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <div 
                className="flex items-center justify-between p-4 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedJobIndex(expandedJobIndex === index ? null : index)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002b5c]">{job.title || "Untitled Job"}</h3>
                    <p className="text-xs text-slate-500 font-medium">{job.qualification || "No qualification set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeJob(index); }}
                    className="p-2 text-slate-400 hover:text-[#D9232D] hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} color="#D9232D" />
                  </button>
                  <div className="p-2 text-slate-400">
                    {expandedJobIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {expandedJobIndex === index && (
                <div className="p-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Job Title</label>
                    <input 
                      type="text" 
                      value={job.title}
                      onChange={(e) => updateJob(index, 'title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Subtitle (Optional)</label>
                    <input 
                      type="text" 
                      value={job.subtitle}
                      onChange={(e) => updateJob(index, 'subtitle', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Designation</label>
                    <input 
                      type="text" 
                      value={job.designation}
                      onChange={(e) => updateJob(index, 'designation', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Qualification</label>
                    <input 
                      type="text" 
                      value={job.qualification}
                      onChange={(e) => updateJob(index, 'qualification', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Experience Required</label>
                    <input 
                      type="text" 
                      value={job.experience}
                      onChange={(e) => updateJob(index, 'experience', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Mandatory Requirement</label>
                    <input 
                      type="text" 
                      value={job.requirement}
                      onChange={(e) => updateJob(index, 'requirement', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Candidate Preference</label>
                    <input 
                      type="text" 
                      value={job.preference}
                      onChange={(e) => updateJob(index, 'preference', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Job Description</label>
                    <textarea 
                      value={job.description}
                      onChange={(e) => updateJob(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Duty Shifts</label>
                    <input 
                      type="text" 
                      value={job.duty}
                      onChange={(e) => updateJob(index, 'duty', e.target.value)}
                      placeholder="e.g. Rotational Shifts"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Project Duration</label>
                    <input 
                      type="text" 
                      value={job.duration}
                      onChange={(e) => updateJob(index, 'duration', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 focus:border-[#007a87] transition-all"
                    />
                  </div>

                </div>
              )}
            </div>
          ))}

          {data.jobs.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No job postings available. Click "Add New Job" to create one.</p>
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
            <div key={index} className="border border-slate-200 bg-slate-50 rounded-2xl p-5 relative group">
              <button 
                type="button"
                onClick={() => removeContact(index)}
                className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-[#D9232D] hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
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

    </>
  );
}
