"use client";
import QuillEditor from "@/components/QuillEditor";


import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, GripVertical, Image as ImageIcon, Upload, Loader2, Calendar, ExternalLink, X, CheckCircle2, AlertCircle, FileText, Users, Clock, ChevronRight, ChevronLeft, Layers, ChevronUp, ChevronDown, AlertTriangle, Edit, Save, Search, Star, Sparkles } from "lucide-react";

function formatDateForPicker(val: any): string {
  if (!val) return "";
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    if (trimmed.includes("T")) return trimmed.split("T")[0];
  }
  try {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  } catch {}
  return "";
}

export default function EventsClientForm({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter();

  const [events, setEvents] = useState<any[]>(() => {
    if (!Array.isArray(initialEvents) || initialEvents.length === 0) {
      return [{
        id: "event-" + Date.now(),
        title: "New Event",
        date: "",
        overview: [""],
        objectives: [""],
        features: [""],
        customSections: [],
        summary: "",
        organizers: [],
        gallery: [],
        agenda: []
      }];
    }
    return initialEvents.map(ev => ({
      ...ev,
      customSections: Array.isArray(ev.customSections)
        ? ev.customSections.map((s: any, idx: number) => ({
            id: s.id || `sec-${idx}-${Date.now()}`,
            title: typeof s.title === "string" ? s.title : "Section " + (idx + 1),
            content: typeof s.content === "string" ? s.content : ""
          }))
        : [],
      gallery: Array.isArray(ev.gallery) 
        ? ev.gallery.filter((img: any) => typeof img === "string" && img.trim() !== "")
        : []
    }));
  });

  const [tablePage, setTablePage] = useState(1);
  const itemsPerPage = 10;

  // Comprehensive New Event Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState<'basic' | 'overview' | 'features' | 'sections' | 'agenda' | 'gallery'>('basic');
  const [modalUploadingIdx, setModalUploadingIdx] = useState<number | null>(null);
  const [modalBulkUploading, setModalBulkUploading] = useState(false);

  const [modalFeaturedUploading, setModalFeaturedUploading] = useState(false);

  const [modalForm, setModalForm] = useState<{
    title: string;
    date: string;
    status: boolean;
    summary: string;
    featuredImage: string;
    isFooterFeatured: boolean;
    overviewTitle: string;
    overview: string[];
    objectivesTitle: string;
    objectives: string[];
    featuresTitle: string;
    features: string[];
    customSections: { id: string; title: string; content: string }[];
    organizersTitle: string;
    organizers: { name: string; role: string }[];
    agendaTitle: string;
    agenda: { topic: string; speaker: string; role: string }[];
    galleryTitle: string;
    gallery: string[];
  }>({
    title: "",
    date: "",
    status: true,
    summary: "",
    featuredImage: "",
    isFooterFeatured: false,
    overviewTitle: "Event Overview",
    overview: [""],
    objectivesTitle: "Key Objectives",
    objectives: [""],
    featuresTitle: "Key Features",
    features: [""],
    customSections: [],
    organizersTitle: "Organizers",
    organizers: [{ name: "", role: "" }],
    agendaTitle: "Conference Topics & Speakers",
    agenda: [{ topic: "", speaker: "", role: "" }],
    galleryTitle: "Event Gallery",
    gallery: []
  });

  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState<{ title: string; id: string; isEdit?: boolean } | null>(null);
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const openAddModal = () => {
    setEditingEventIndex(null);
    setModalError(null);
    resetModalForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (index: number) => {
    const target = events[index];
    if (!target) return;

    setEditingEventIndex(index);
    setModalError(null);
    setModalActiveTab("basic");

    setModalForm({
      title: target.title || "",
      date: formatDateForPicker(target.date) || target.date || "",
      status: target.status !== false,
      summary: target.summary || "",
      featuredImage: target.featuredImage || "",
      isFooterFeatured: Boolean(target.isFooterFeatured),
      overviewTitle: target.overviewTitle || "Event Overview",
      overview: Array.isArray(target.overview) && target.overview.length > 0 ? [...target.overview] : [""],
      objectivesTitle: target.objectivesTitle || "Key Objectives",
      objectives: Array.isArray(target.objectives) && target.objectives.length > 0 ? [...target.objectives] : [""],
      featuresTitle: target.featuresTitle || "Key Features",
      features: Array.isArray(target.features) && target.features.length > 0 ? [...target.features] : [""],
      customSections: Array.isArray(target.customSections)
        ? target.customSections.map((s: any, idx: number) => ({
            id: s.id || `sec-${idx}-${Date.now()}`,
            title: s.title || "",
            content: s.content || ""
          }))
        : [],
      organizersTitle: target.organizersTitle || "Organizers",
      organizers: Array.isArray(target.organizers) && target.organizers.length > 0
        ? target.organizers.map((o: any) => ({ name: o.name || "", role: o.role || "" }))
        : [{ name: "", role: "" }],
      agendaTitle: target.agendaTitle || "Conference Topics & Speakers",
      agenda: Array.isArray(target.agenda) && target.agenda.length > 0
        ? target.agenda.map((a: any) => ({ topic: a.topic || "", speaker: a.speaker || "", role: a.role || "" }))
        : [{ topic: "", speaker: "", role: "" }],
      galleryTitle: target.galleryTitle || "Event Gallery",
      gallery: Array.isArray(target.gallery) ? [...target.gallery] : []
    });

    setIsAddModalOpen(true);
  };

  const toggleEventStatus = async (index: number) => {
    const updated = [...events];
    if (!updated[index]) return;
    updated[index] = {
      ...updated[index],
      status: updated[index].status === false ? true : false
    };
    setEvents(updated);
    
    try {
      const seoMetaTitle = (document.querySelector('input[name="seoMetaTitle"]') as HTMLInputElement)?.value || "";
      const seoMetaDescription = (document.querySelector('textarea[name="seoMetaDescription"]') as HTMLTextAreaElement)?.value || "";
      const seoKeywords = (document.querySelector('textarea[name="seoKeywords"]') as HTMLTextAreaElement)?.value || "";

      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'page_events',
          value: JSON.stringify({
            seoMetaTitle,
            seoMetaDescription,
            seoKeywords,
            events: updated
          }),
          pathsToRevalidate: ['/admin/events', '/events']
        })
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    if (!deleteSuccessMessage) return;
    const timer = setTimeout(() => {
      setDeleteSuccessMessage(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [deleteSuccessMessage]);

  const resetModalForm = () => {
    setModalForm({
      title: "",
      date: "",
      status: true,
      summary: "",
      featuredImage: "",
      isFooterFeatured: false,
      overviewTitle: "Event Overview",
      overview: [""],
      objectivesTitle: "Key Objectives",
      objectives: [""],
      featuresTitle: "Key Features",
      features: [""],
      customSections: [],
      organizersTitle: "Organizers",
      organizers: [{ name: "", role: "" }],
      agendaTitle: "Conference Topics & Speakers",
      agenda: [{ topic: "", speaker: "", role: "" }],
      galleryTitle: "Event Gallery",
      gallery: []
    });
    setModalActiveTab("basic");
    setModalError(null);
  };

  const updateModalField = (field: string, value: any) => {
    setModalForm(prev => ({ ...prev, [field]: value }));
  };

  const addModalArrayItem = (field: 'overview' | 'objectives' | 'features' | 'gallery') => {
    setModalForm(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const updateModalArrayItem = (field: 'overview' | 'objectives' | 'features' | 'gallery', idx: number, value: string) => {
    setModalForm(prev => {
      const arr = [...prev[field]];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };

  const removeModalArrayItem = (field: 'overview' | 'objectives' | 'features' | 'gallery', idx: number) => {
    setModalForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx)
    }));
  };

  const addModalOrganizer = () => {
    setModalForm(prev => ({
      ...prev,
      organizers: [...prev.organizers, { name: "", role: "" }]
    }));
  };

  const updateModalOrganizer = (idx: number, key: 'name' | 'role', value: string) => {
    setModalForm(prev => {
      const newOrgs = [...prev.organizers];
      newOrgs[idx] = { ...newOrgs[idx], [key]: value };
      return { ...prev, organizers: newOrgs };
    });
  };

  const removeModalOrganizer = (idx: number) => {
    setModalForm(prev => ({
      ...prev,
      organizers: prev.organizers.filter((_, i) => i !== idx)
    }));
  };

  const addModalAgenda = () => {
    setModalForm(prev => ({
      ...prev,
      agenda: [...prev.agenda, { topic: "", speaker: "", role: "" }]
    }));
  };

  const updateModalAgenda = (idx: number, key: 'topic' | 'speaker' | 'role', value: string) => {
    setModalForm(prev => {
      const newAgenda = [...prev.agenda];
      newAgenda[idx] = { ...newAgenda[idx], [key]: value };
      return { ...prev, agenda: newAgenda };
    });
  };

  const removeModalAgenda = (idx: number) => {
    setModalForm(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== idx)
    }));
  };

  const addModalCustomSection = () => {
    setModalForm(prev => ({
      ...prev,
      customSections: [
        ...(prev.customSections || []),
        { id: "sec-" + Date.now(), title: "New Section", content: "" }
      ]
    }));
  };

  const updateModalCustomSection = (idx: number, key: 'title' | 'content', value: string) => {
    setModalForm(prev => {
      const newSecs = [...(prev.customSections || [])];
      newSecs[idx] = { ...newSecs[idx], [key]: value };
      return { ...prev, customSections: newSecs };
    });
  };

  const removeModalCustomSection = (idx: number) => {
    setModalForm(prev => ({
      ...prev,
      customSections: (prev.customSections || []).filter((_, i) => i !== idx)
    }));
  };

  const moveModalCustomSection = (idx: number, direction: -1 | 1) => {
    setModalForm(prev => {
      const list = [...(prev.customSections || [])];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;
      const temp = list[idx];
      list[idx] = list[targetIdx];
      list[targetIdx] = temp;
      return { ...prev, customSections: list };
    });
  };

  const handleModalUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setModalUploadingIdx(idx);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "events");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        if (url) updateModalArrayItem('gallery', idx, url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setModalUploadingIdx(null);
      e.target.value = "";
    }
  };

  const handleModalBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setModalBulkUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "events");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const { url } = await res.json();
          if (url) newUrls.push(url);
        }
      }

      if (newUrls.length > 0) {
        setModalForm(prev => ({
          ...prev,
          gallery: [...newUrls, ...prev.gallery.filter(g => g && g.trim() !== "")]
        }));
      }
    } catch (err) {
      console.error("Bulk upload error in modal:", err);
      alert("Failed to upload some images.");
    } finally {
      setModalBulkUploading(false);
      e.target.value = "";
    }
  };

  const handleModalFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setModalFeaturedUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "events");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        if (url) {
          updateModalField("featuredImage", url);
        }
      } else {
        alert("Upload failed. Please check file format and size.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image.");
    } finally {
      setModalFeaturedUploading(false);
      e.target.value = "";
    }
  };

  const handleSaveModalEvent = async () => {
    if (!modalForm.title.trim()) {
      setModalError("Please enter an event title in Basic Details.");
      setModalActiveTab("basic");
      return;
    }

    setIsSubmittingModal(true);
    setModalError(null);

    const isEditing = editingEventIndex !== null && editingEventIndex >= 0 && editingEventIndex < events.length;
    const existingId = isEditing ? events[editingEventIndex]?.id : null;
    const eventId = existingId || "event-" + Date.now();

    const formattedEvent = {
      id: eventId,
      title: modalForm.title.trim(),
      date: modalForm.date.trim(),
      status: modalForm.status !== false,
      summary: modalForm.summary.trim(),
      featuredImage: (modalForm.featuredImage || "").trim(),
      isFooterFeatured: Boolean(modalForm.isFooterFeatured),
      overviewTitle: modalForm.overviewTitle || "Event Overview",
      overview: modalForm.overview.filter(p => p && p.trim() !== "").length > 0
        ? modalForm.overview.filter(p => p && p.trim() !== "")
        : [""],
      objectivesTitle: modalForm.objectivesTitle || "Key Objectives",
      objectives: modalForm.objectives.filter(o => o && o.trim() !== ""),
      featuresTitle: modalForm.featuresTitle || "Key Features",
      features: modalForm.features.filter(f => f && f.trim() !== ""),
      customSections: (modalForm.customSections || []).filter(s => s && (s.title?.trim() || s.content?.trim())),
      organizersTitle: modalForm.organizersTitle || "Organizers",
      organizers: modalForm.organizers.filter(o => (o.name && o.name.trim() !== "") || (o.role && o.role.trim() !== "")),
      agendaTitle: modalForm.agendaTitle || "Conference Topics & Speakers",
      agenda: modalForm.agenda.filter(a => (a.topic && a.topic.trim() !== "") || (a.speaker && a.speaker.trim() !== "")),
      galleryTitle: modalForm.galleryTitle || "Event Gallery",
      gallery: modalForm.gallery.filter(g => g && typeof g === "string" && g.trim() !== "")
    };

    let updatedEvents: any[];
    if (isEditing) {
      updatedEvents = events.map((ev, idx) => {
        if (idx === editingEventIndex) return formattedEvent;
        if (formattedEvent.isFooterFeatured) {
          return { ...ev, isFooterFeatured: false };
        }
        return ev;
      });
    } else {
      const rest = formattedEvent.isFooterFeatured
        ? events.map(ev => ({ ...ev, isFooterFeatured: false }))
        : events;
      updatedEvents = [formattedEvent, ...rest];
      setTablePage(1);
    }

    setEvents(updatedEvents);

    // Save to database via /api/settings immediately
    try {
      const seoMetaTitle = (document.querySelector('input[name="seoMetaTitle"]') as HTMLInputElement)?.value || "";
      const seoMetaDescription = (document.querySelector('textarea[name="seoMetaDescription"]') as HTMLTextAreaElement)?.value || "";
      const seoKeywords = (document.querySelector('textarea[name="seoKeywords"]') as HTMLTextAreaElement)?.value || "";

      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'page_events',
          value: JSON.stringify({
            seoMetaTitle,
            seoMetaDescription,
            seoKeywords,
            events: updatedEvents
          }),
          pathsToRevalidate: ['/admin/events', '/events']
        })
      });
    } catch (err) {
      console.error("Failed to auto-save event:", err);
    } finally {
      setIsSubmittingModal(false);
      setIsAddModalOpen(false);
      resetModalForm();
      const updatedTitle = formattedEvent.title;
      setEditingEventIndex(null);
      setSuccessMessage({ 
        title: updatedTitle, 
        id: eventId,
        isEdit: isEditing
      });
      setHighlightedEventId(eventId);

      // Scroll smoothly to the target event
      setTimeout(() => {
        const el = document.getElementById(`event-row-${eventId}`) || document.getElementById("admin-events-table");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Clear highlight after 5 seconds
      setTimeout(() => {
        setHighlightedEventId(null);
      }, 5000);
    }
  };

  const handleDeleteEvent = async (index: number) => {
    const target = events[index];
    const targetTitle = target?.title?.trim() || `Event ${index + 1}`;

    if (!window.confirm(`Are you sure you want to permanently delete "${targetTitle}"? This cannot be undone.`)) {
      return;
    }

    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);

    // Adjust tablePage if current page became empty
    const newTotalPages = Math.ceil((newEvents.length || 1) / itemsPerPage);
    if (tablePage > newTotalPages) {
      setTablePage(Math.max(1, newTotalPages));
    }

    // Save directly to the database via /api/settings immediately
    try {
      const seoMetaTitle = (document.querySelector('input[name="seoMetaTitle"]') as HTMLInputElement)?.value || "";
      const seoMetaDescription = (document.querySelector('textarea[name="seoMetaDescription"]') as HTMLTextAreaElement)?.value || "";
      const seoKeywords = (document.querySelector('textarea[name="seoKeywords"]') as HTMLTextAreaElement)?.value || "";

      const sanitized = newEvents.map(ev => ({
        ...ev,
        customSections: (ev.customSections || []).filter((s: any) => s && (s.title?.trim() || s.content?.trim())),
        gallery: (ev.gallery || []).filter((img: string) => typeof img === "string" && img.trim() !== "")
      }));

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'page_events',
          value: JSON.stringify({
            seoMetaTitle,
            seoMetaDescription,
            seoKeywords,
            events: sanitized
          }),
          pathsToRevalidate: ['/admin/events', '/events']
        })
      });

      if (!res.ok) {
        throw new Error("Failed to delete event from database");
      }

      setDeleteSuccessMessage(`"${targetTitle}" has been permanently deleted.`);
      router.refresh();
    } catch (err) {
      console.error("Error permanently deleting event:", err);
      alert("Failed to delete event from database. Please try again.");
    }
  };

  // Strictly filter out empty gallery items before saving to database!
  const sanitizedEvents = events.map(ev => ({
    ...ev,
    featuredImage: typeof ev.featuredImage === "string" ? ev.featuredImage.trim() : "",
    isFooterFeatured: Boolean(ev.isFooterFeatured),
    customSections: (ev.customSections || []).filter((s: any) => s && (s.title?.trim() || s.content?.trim())),
    gallery: (ev.gallery || []).filter((img: string) => typeof img === "string" && img.trim() !== "")
  }));

  const filteredEvents = events
    .map((ev, originalIndex) => ({ event: ev, originalIndex }))
    .filter(({ event: ev }) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        (ev.title && ev.title.toLowerCase().includes(q)) ||
        (ev.date && ev.date.toLowerCase().includes(q)) ||
        (ev.summary && ev.summary.toLowerCase().includes(q))
      );
    });

  const totalTablePages = Math.ceil((filteredEvents.length || 1) / itemsPerPage);
  const paginatedEvents = filteredEvents.slice((tablePage - 1) * itemsPerPage, tablePage * itemsPerPage);

  return (
    <div className="space-y-8">
      <input type="hidden" name="eventsJson" value={JSON.stringify(sanitizedEvents)} />

      {/* Event Selector / Table */}
      <div id="admin-events-table" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[20px] font-black text-[#002b5c] flex items-center gap-2">
                <Calendar size={24} className="text-[#007a87]" />
                Manage Events
              </h2>
              <span className="px-3 py-1 bg-slate-100 text-[#002b5c] rounded-full text-xs font-bold">
                {events.length} {events.length === 1 ? 'Event' : 'Events'}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Select any event below to edit details or use the action buttons to update.
            </p>
          </div>
          <button 
            type="button" 
            onClick={openAddModal}
            className="px-5 py-2.5 bg-[#007a87] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#005f6b] shadow-sm hover:shadow transition-all"
          >
            <Plus size={18} /> Add New Event
          </button>
        </div>

        {/* Quick Search */}
        {events.length > 3 && (
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search existing events by title or date..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setTablePage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
            />
          </div>
        )}

        {/* Events Table / List with Edit Action */}
        {events.length === 0 ? (
          <div className="bg-slate-50/50 rounded-2xl p-12 text-center border border-dashed border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-700">No Events Added Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All events have been deleted or none were created yet. Click below to add a new event.
            </p>
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 bg-[#007a87] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 hover:bg-[#005f6b] shadow-sm transition-all"
            >
              <Plus size={16} /> Add New Event
            </button>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4 w-44">Date</th>
                    <th className="py-3 px-4 w-28 text-center">Status</th>
                    <th className="py-3 px-4 w-44 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {paginatedEvents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                        No events found matching "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    paginatedEvents.map(({ event: ev, originalIndex }) => {
                      const isHighlighted = highlightedEventId === ev.id;
                      return (
                        <tr 
                          key={ev.id || originalIndex}
                          id={ev.id ? `event-row-${ev.id}` : undefined}
                          className={`hover:bg-slate-50/80 transition-colors ${isHighlighted ? 'bg-teal-50/60 font-semibold' : ''}`}
                        >
                          <td className="py-3.5 px-4 text-center font-bold text-slate-400 text-xs">
                            {originalIndex + 1}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {/* Event Thumbnail Preview */}
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                                {ev.featuredImage || (ev.gallery && ev.gallery.length > 0) ? (
                                  <img
                                    src={ev.featuredImage || ev.gallery[0]}
                                    alt={ev.title || "Event"}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Calendar size={16} className="text-slate-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-[#002b5c] line-clamp-1">{ev.title || 'Untitled Event'}</span>
                                </div>
                                {ev.summary && (
                                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{ev.summary}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 text-xs font-semibold whitespace-nowrap">
                            {ev.date ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                                <Calendar size={13} className="text-[#007a87]" />
                                {ev.date}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">No date</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => toggleEventStatus(originalIndex)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                                ev.status !== false 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' 
                                  : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                              }`}
                              title="Click to toggle status"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${ev.status !== false ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                              {ev.status !== false ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(originalIndex)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#007a87] text-white hover:bg-[#005f6b] rounded-xl text-xs font-bold transition-all shadow-sm"
                                title="Edit Event"
                              >
                                <Edit size={13} /> Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteEvent(originalIndex)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                                title="Delete Event"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination for the table */}
            {totalTablePages > 1 && (
              <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Showing <span className="font-bold text-slate-700">{(tablePage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-700">{Math.min(tablePage * itemsPerPage, filteredEvents.length)}</span> of <span className="font-bold text-slate-700">{filteredEvents.length}</span> events
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTablePage(p => Math.max(1, p - 1))}
                    disabled={tablePage === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-bold text-slate-700 px-1">
                    {tablePage} / {totalTablePages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTablePage(p => Math.min(totalTablePages, p + 1))}
                    disabled={tablePage === totalTablePages}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 flex items-start justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-emerald-500/20">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 className="text-base font-black text-emerald-900">
                {successMessage.isEdit ? "Event Updated Successfully!" : "Event Created Successfully!"}
              </h4>
              <p className="text-sm font-medium text-emerald-700 mt-1">
                <span className="font-bold">"{successMessage.title}"</span> has been {successMessage.isEdit ? "updated" : "created"}. Click <span className="font-bold">Save Changes</span> at the top to commit all modifications to disk.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-500 hover:text-emerald-700 p-2 hover:bg-emerald-100 rounded-xl transition-colors shrink-0"
            title="Dismiss message"
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
              <h4 className="text-base font-black text-red-900">
                Event Deleted Permanently
              </h4>
              <p className="text-sm font-medium text-red-700 mt-1">
                {deleteSuccessMessage}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDeleteSuccessMessage(null)}
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-100 rounded-xl transition-colors shrink-0"
            title="Dismiss message"
          >
            <X size={18} />
          </button>
        </div>
      )}



      {/* Comprehensive Add New Event Modal */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#007a87]/10 text-[#007a87] flex items-center justify-center shadow-sm">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#002b5c]">
                    {editingEventIndex !== null ? `Edit Event: ${modalForm.title || "Untitled"}` : "Add New Event (All Details)"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {editingEventIndex !== null 
                      ? "Update and configure all sections for this event." 
                      : "Configure all sections for this event. It will be added as Event 1 at the top of Page 1."}
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

            {/* Modal Tab Strip - Full 6-tab responsive grid ensuring Event Gallery is 100% visible */}
            <div className="border-b border-slate-200 bg-slate-50/90 p-2 sm:p-3 shrink-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
                {[
                  { id: 'basic', label: 'Basic Details', icon: Calendar, count: null },
                  { id: 'overview', label: 'Overview', icon: FileText, count: null },
                  { id: 'features', label: 'Organizers', icon: Users, count: (modalForm.organizers?.length || 0) > 0 ? modalForm.organizers.length : null },
                  { id: 'sections', label: 'Sections', icon: Layers, count: (modalForm.customSections?.length || 0) > 0 ? modalForm.customSections.length : null },
                  { id: 'agenda', label: 'Agenda', icon: Clock, count: (modalForm.agenda?.length || 0) > 0 ? modalForm.agenda.length : null },
                  { id: 'gallery', label: 'Event Gallery', icon: ImageIcon, count: (modalForm.gallery?.length || 0) > 0 ? modalForm.gallery.length : null },
                ].map(t => {
                  const Icon = t.icon;
                  const isActive = modalActiveTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setModalActiveTab(t.id as any)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-bold rounded-xl transition-all shadow-sm ${
                        isActive
                          ? 'bg-[#007a87] text-white ring-2 ring-[#007a87]/30'
                          : 'bg-white text-slate-600 hover:text-[#007a87] hover:bg-slate-50 border border-slate-200/90'
                      }`}
                    >
                      <Icon size={14} className="shrink-0" />
                      <span className="truncate">{t.label}</span>
                      {t.count !== null && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${isActive ? 'bg-white/30 text-white' : 'bg-slate-100 text-[#007a87]'}`}>
                          {t.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              {modalError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold flex items-center gap-2.5">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Tab 1: Basic Details */}
              {modalActiveTab === 'basic' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between bg-slate-50 p-4.5 rounded-2xl border border-slate-200">
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-800">Event Status</h4>
                      <p className="text-[11px] text-slate-500">Determine if this event is publicly visible immediately</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={modalForm.status} 
                        onChange={(e) => updateModalField("status", e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#007a87]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007a87]"></div>
                      <span className="ml-3 text-xs font-bold text-slate-700">{modalForm.status ? "Active" : "Inactive"}</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-[12px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={modalForm.title} 
                        onChange={(e) => updateModalField("title", e.target.value)}
                        placeholder="e.g. RCS Course 18: Advanced Knee Replacement" 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm font-medium"
                        autoFocus
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[12px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                        Event Date
                      </label>
                      <input 
                        type="date" 
                        value={formatDateForPicker(modalForm.date)} 
                        onChange={(e) => updateModalField("date", e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm font-medium text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Summary / Conclusion
                    </label>
                    <textarea 
                      rows={3}
                      value={modalForm.summary} 
                      onChange={(e) => updateModalField("summary", e.target.value)}
                      placeholder="Brief summary or highlights of the event..." 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm font-medium resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Overview & Objectives */}
              {modalActiveTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Overview Paragraphs */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <input 
                        type="text" 
                        value={modalForm.overviewTitle} 
                        onChange={(e) => updateModalField("overviewTitle", e.target.value)}
                        className="text-base font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[280px]"
                        placeholder="Overview Section Title"
                      />
                      <button 
                        type="button" 
                        onClick={() => addModalArrayItem('overview')}
                        className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all"
                      >
                        <Plus size={14} /> Add Paragraph
                      </button>
                    </div>

                    <div className="space-y-3">
                      {modalForm.overview.map((p, idx) => (
                        <div key={idx} className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200">
                          <div className="flex-1">
                            <QuillEditor 
                              value={p} 
                              onChange={(content) => updateModalArrayItem('overview', idx, content)} 
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeModalArrayItem('overview', idx)}
                            className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                            title="Remove paragraph"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Objectives */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <input 
                        type="text" 
                        value={modalForm.objectivesTitle} 
                        onChange={(e) => updateModalField("objectivesTitle", e.target.value)}
                        className="text-base font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[280px]"
                        placeholder="Objectives Section Title"
                      />
                      <button 
                        type="button" 
                        onClick={() => addModalArrayItem('objectives')}
                        className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all"
                      >
                        <Plus size={14} /> Add Objective
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {modalForm.objectives.map((obj, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <input 
                            type="text" 
                            value={obj} 
                            onChange={(e) => updateModalArrayItem('objectives', idx, e.target.value)}
                            className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm"
                            placeholder="e.g. Provide hands-on training on specialized surgical knee models"
                          />
                          <button 
                            type="button" 
                            onClick={() => removeModalArrayItem('objectives', idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                            title="Remove objective"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Features & Organizers */}
              {modalActiveTab === 'features' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Key Features */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <input 
                        type="text" 
                        value={modalForm.featuresTitle} 
                        onChange={(e) => updateModalField("featuresTitle", e.target.value)}
                        className="text-base font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[280px]"
                        placeholder="Features Section Title"
                      />
                      <button 
                        type="button" 
                        onClick={() => addModalArrayItem('features')}
                        className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all"
                      >
                        <Plus size={14} /> Add Feature
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {modalForm.features.map((feat, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <input 
                            type="text" 
                            value={feat} 
                            onChange={(e) => updateModalArrayItem('features', idx, e.target.value)}
                            className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm"
                            placeholder="e.g. State-of-the-art surgical simulation lab equipment"
                          />
                          <button 
                            type="button" 
                            onClick={() => removeModalArrayItem('features', idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                            title="Remove feature"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organizing Committee */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <input 
                        type="text" 
                        value={modalForm.organizersTitle} 
                        onChange={(e) => updateModalField("organizersTitle", e.target.value)}
                        className="text-base font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[280px]"
                        placeholder="Organizers Section Title"
                      />
                      <button 
                        type="button" 
                        onClick={addModalOrganizer}
                        className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all"
                      >
                        <Plus size={14} /> Add Organizer
                      </button>
                    </div>

                    <div className="space-y-3">
                      {modalForm.organizers.map((org, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-3 items-center bg-white p-3 rounded-xl border border-slate-200">
                          <input 
                            type="text" 
                            value={org.name} 
                            onChange={(e) => updateModalOrganizer(idx, 'name', e.target.value)}
                            className="w-full sm:flex-1 p-2.5 border border-slate-200 rounded-xl text-sm"
                            placeholder="Organizer Name (e.g. Dr. Jane Doe)"
                          />
                          <input 
                            type="text" 
                            value={org.role} 
                            onChange={(e) => updateModalOrganizer(idx, 'role', e.target.value)}
                            className="w-full sm:flex-1 p-2.5 border border-slate-200 rounded-xl text-sm"
                            placeholder="Role / Title (e.g. Organizing Chairperson)"
                          />
                          <button 
                            type="button" 
                            onClick={() => removeModalOrganizer(idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0 self-end sm:self-center"
                            title="Remove organizer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Custom Content Sections */}
              {modalActiveTab === 'sections' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-3 gap-3">
                    <div>
                      <h4 className="text-base font-black text-[#002b5c] flex items-center gap-2">
                        <Layers size={18} className="text-[#007a87]" />
                        Custom Content Sections ({(modalForm.customSections || []).length})
                      </h4>
                      <p className="text-xs text-slate-500">Add customizable sections with headings and rich text editor formatting</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={addModalCustomSection}
                      className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all shadow-sm"
                    >
                      <Plus size={14} /> Add Section
                    </button>
                  </div>

                  {(!modalForm.customSections || modalForm.customSections.length === 0) ? (
                    <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Layers className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      <p className="text-sm font-bold text-slate-600">No custom sections yet</p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Click &quot;+ Add Section&quot; to add a new section with a heading and rich text editor.
                      </p>
                      <button 
                        type="button" 
                        onClick={addModalCustomSection}
                        className="mt-4 px-4 py-2 text-xs bg-[#007a87] text-white rounded-xl hover:bg-[#005f6b] inline-flex items-center gap-1.5 font-bold transition-all shadow-sm"
                      >
                        <Plus size={14} /> Add First Section
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {modalForm.customSections.map((sec, idx) => (
                        <div key={sec.id || idx} className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3 hover:border-slate-300 transition-all">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
                            <div className="flex items-center gap-2.5 flex-1 w-full">
                              <span className="w-6 h-6 rounded-full bg-[#007a87] text-white text-xs font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <input 
                                type="text" 
                                value={sec.title} 
                                onChange={(e) => updateModalCustomSection(idx, 'title', e.target.value)}
                                placeholder="Section Title (e.g. Guidelines, Special Instructions)" 
                                className="flex-1 p-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm font-bold text-[#002b5c]"
                              />
                            </div>
                            <div className="flex items-center gap-1.5 self-end sm:self-center">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => moveModalCustomSection(idx, -1)}
                                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-all"
                                title="Move Up"
                              >
                                <ChevronUp size={16} />
                              </button>
                              <button
                                type="button"
                                disabled={idx === modalForm.customSections.length - 1}
                                onClick={() => moveModalCustomSection(idx, 1)}
                                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-all"
                                title="Move Down"
                              >
                                <ChevronDown size={16} />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => removeModalCustomSection(idx)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 ml-1"
                                title="Delete section"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                              Section Content (Rich Text)
                            </label>
                            <QuillEditor 
                              value={sec.content} 
                              onChange={(content) => updateModalCustomSection(idx, 'content', content)} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Agenda & Sessions */}
              {modalActiveTab === 'agenda' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <input 
                      type="text" 
                      value={modalForm.agendaTitle} 
                      onChange={(e) => updateModalField("agendaTitle", e.target.value)}
                      className="text-base font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[320px]"
                      placeholder="Agenda Section Title"
                    />
                    <button 
                      type="button" 
                      onClick={addModalAgenda}
                      className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all"
                    >
                      <Plus size={14} /> Add Session
                    </button>
                  </div>

                  <div className="space-y-4">
                    {modalForm.agenda.map((ag, idx) => (
                      <div key={idx} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
                        <button 
                          type="button" 
                          onClick={() => removeModalAgenda(idx)}
                          className="absolute top-3.5 right-3.5 p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Remove session"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                          <input 
                            type="text" 
                            value={ag.topic} 
                            onChange={(e) => updateModalAgenda(idx, 'topic', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm sm:col-span-2 font-medium"
                            placeholder="Topic / Session Title"
                          />
                          <input 
                            type="text" 
                            value={ag.speaker} 
                            onChange={(e) => updateModalAgenda(idx, 'speaker', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                            placeholder="Speaker Name"
                          />
                          <input 
                            type="text" 
                            value={ag.role} 
                            onChange={(e) => updateModalAgenda(idx, 'role', e.target.value)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm"
                            placeholder="Speaker Designation / Affiliation"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Event Gallery */}
              {modalActiveTab === 'gallery' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-4 gap-4">
                    <div>
                      <h4 className="text-base font-black text-[#002b5c] flex items-center gap-2">
                        <ImageIcon size={20} className="text-[#007a87]" />
                        Event Gallery
                        <span className="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                          {modalForm.gallery.length} {modalForm.gallery.length === 1 ? 'Photo' : 'Photos'}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">Upload photos or paste direct image URLs to display in the event photo gallery.</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <label className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 font-bold transition-all shadow-sm cursor-pointer">
                        {modalBulkUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                        <span>{modalBulkUploading ? 'Uploading...' : 'Bulk Upload Photos'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={modalBulkUploading}
                          onChange={handleModalBulkUpload}
                          className="hidden"
                        />
                      </label>
                      <button 
                        type="button" 
                        onClick={() => addModalArrayItem('gallery')}
                        className="px-4 py-2 text-xs bg-[#002b5c] text-white rounded-xl hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all shadow-sm"
                      >
                        <Plus size={14} /> Add Photo Slot
                      </button>
                    </div>
                  </div>

                  {/* Featured Thumbnail Banner in Event Gallery */}
                  <div className="bg-gradient-to-br from-teal-50/70 via-slate-50 to-white p-4 sm:p-5 rounded-2xl border border-teal-200/80 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                          <Star size={16} className="fill-white" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-[#002b5c] flex items-center gap-2">
                            Featured Thumbnail
                          </h4>
                          <p className="text-xs text-slate-500">
                            The photo displayed when this event appears in the footer. Toggle <strong className="text-amber-600 font-bold">&quot;Make Featured&quot;</strong> on any photo below, or upload a custom one.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Preview of current featured photo & custom input */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      <div className="relative w-28 h-16 sm:w-32 sm:h-18 rounded-xl overflow-hidden bg-white border-2 border-dashed border-teal-200 flex items-center justify-center shrink-0 shadow-2xs">
                        {modalForm.featuredImage || (modalForm.gallery && modalForm.gallery.length > 0 && modalForm.gallery[0]) ? (
                          <>
                            <img
                              src={modalForm.featuredImage || modalForm.gallery[0]}
                              alt="Featured Preview"
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-1 left-1 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs uppercase tracking-wider">
                              {modalForm.featuredImage ? "Selected" : "Default (1st)"}
                            </span>
                          </>
                        ) : (
                          <div className="text-center p-1 text-slate-400">
                            <ImageIcon size={18} className="mx-auto text-teal-600/40" />
                            <span className="text-[9px] font-medium block">No photo</span>
                          </div>
                        )}
                        {modalFeaturedUploading && (
                          <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white">
                            <Loader2 size={16} className="animate-spin text-teal-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full space-y-1.5">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={modalForm.featuredImage}
                            onChange={(e) => updateModalField("featuredImage", e.target.value)}
                            placeholder="Featured image URL or toggle from photos below ->"
                            className="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]"
                          />
                          <label className="px-3 py-2 bg-[#007a87] hover:bg-[#005f6b] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs">
                            {modalFeaturedUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                            <span>{modalFeaturedUploading ? "..." : "Upload Custom"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={modalFeaturedUploading}
                              onChange={handleModalFeaturedUpload}
                              className="hidden"
                            />
                          </label>
                          {modalForm.featuredImage && (
                            <button
                              type="button"
                              onClick={() => updateModalField("featuredImage", "")}
                              className="px-2.5 py-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-slate-200 text-xs font-bold"
                              title="Reset to default first gallery photo"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {modalForm.featuredImage 
                            ? "Custom featured photo active. Click 'Reset' to use default first photo, or toggle any photo below."
                            : "Using first photo as default footer thumbnail. Click 'Make Featured' on any photo below to choose it."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2">
                      Gallery Section Heading (Displayed on public event details page)
                    </label>
                    <input 
                      type="text" 
                      value={modalForm.galleryTitle} 
                      onChange={(e) => updateModalField("galleryTitle", e.target.value)}
                      className="w-full sm:max-w-md p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#002b5c] focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]"
                      placeholder="e.g. Event Gallery"
                    />
                  </div>

                  {modalForm.gallery.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                      <ImageIcon size={32} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-sm font-medium">No photos added yet. Click &quot;Add Image&quot; or &quot;Bulk Upload&quot;.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {modalForm.gallery.map((img, idx) => {
                        const isUploading = modalUploadingIdx === idx;
                        const hasValidImg = Boolean(img && img.trim() !== "");
                        const isFeatured = hasValidImg && (modalForm.featuredImage ? modalForm.featuredImage === img : idx === 0);

                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col sm:flex-row gap-2.5 sm:items-center p-3 rounded-xl border transition-all ${
                              isFeatured 
                                ? "bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/40 shadow-xs" 
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300 shadow-2xs">
                                {hasValidImg ? (
                                  <>
                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                    {isFeatured && (
                                      <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white p-0.5 rounded shadow-xs" title="Featured Footer Thumbnail">
                                        <Star size={10} className="fill-white" />
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <ImageIcon size={20} className="text-slate-400" />
                                )}
                                {isUploading && (
                                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white">
                                    <Loader2 size={16} className="animate-spin" />
                                  </div>
                                )}
                              </div>

                              <input 
                                type="text" 
                                value={img} 
                                onChange={(e) => updateModalArrayItem('gallery', idx, e.target.value)}
                                className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono min-w-0"
                                placeholder="Image URL or upload ->"
                              />
                            </div>

                            <div className="flex items-center gap-1.5 justify-end shrink-0">
                              {/* Featured Toggle Button */}
                              <button
                                type="button"
                                disabled={!hasValidImg}
                                onClick={() => {
                                  if (modalForm.featuredImage === img) {
                                    updateModalField("featuredImage", "");
                                  } else {
                                    updateModalField("featuredImage", img);
                                  }
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                                  isFeatured 
                                    ? "bg-amber-500 hover:bg-amber-600 text-white ring-1 ring-amber-400" 
                                    : hasValidImg 
                                      ? "bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/50" 
                                      : "bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed"
                                }`}
                                title={isFeatured ? "Featured as Footer Thumbnail. Click to unfeature." : "Click to set this photo as the Featured Footer Thumbnail"}
                              >
                                <Star size={12} className={isFeatured ? "fill-white text-white" : "text-amber-500"} />
                                <span>{isFeatured ? "Featured" : "Make Featured"}</span>
                              </button>

                              <label className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-[#007a87] text-[#007a87] hover:bg-[#007a87] hover:text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0">
                                {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                                <span>{isUploading ? '...' : 'Upload'}</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  disabled={isUploading}
                                  onChange={(e) => handleModalUpload(idx, e)}
                                  className="hidden" 
                                />
                              </label>

                              <button 
                                type="button" 
                                onClick={() => {
                                  if (modalForm.featuredImage === img) {
                                    updateModalField("featuredImage", "");
                                  }
                                  removeModalArrayItem('gallery', idx);
                                }}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 transition-colors"
                                title="Delete photo"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
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
                {modalActiveTab !== 'basic' && (
                  <button
                    type="button"
                    onClick={() => {
                      const tabs = ['basic', 'overview', 'features', 'sections', 'agenda', 'gallery'] as const;
                      const idx = tabs.indexOf(modalActiveTab);
                      if (idx > 0) setModalActiveTab(tabs[idx - 1]);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-sm font-bold flex items-center gap-1.5 transition-all"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                )}

                {modalActiveTab !== 'gallery' && (
                  <button
                    type="button"
                    onClick={() => {
                      const tabs = ['basic', 'overview', 'features', 'sections', 'agenda', 'gallery'] as const;
                      const idx = tabs.indexOf(modalActiveTab);
                      if (idx < tabs.length - 1) setModalActiveTab(tabs[idx + 1]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold flex items-center gap-1.5 transition-all"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                )}

                <button 
                  type="button" 
                  onClick={handleSaveModalEvent}
                  disabled={isSubmittingModal}
                  className="px-6 py-2.5 rounded-xl bg-[#007a87] hover:bg-[#005f6b] text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmittingModal ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{editingEventIndex !== null ? "Saving Updates..." : "Creating & Saving..."}</span>
                    </>
                  ) : (
                    <>
                      {editingEventIndex !== null ? <Save size={16} /> : <Plus size={16} />}
                      <span>{editingEventIndex !== null ? "Update & Save Event" : "Create & Save Event"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}