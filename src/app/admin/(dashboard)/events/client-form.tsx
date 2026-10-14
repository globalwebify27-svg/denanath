"use client";
import QuillEditor from "@/components/QuillEditor";


import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, GripVertical, Image as ImageIcon, Upload, Loader2, Calendar, ExternalLink, X, CheckCircle2, AlertCircle, FileText, Users, Clock, ChevronRight, ChevronLeft, Layers, ChevronUp, ChevronDown, AlertTriangle } from "lucide-react";

export default function EventsClientForm({ initialEvents }: { initialEvents: any[] }) {
  const router = useRouter();
  const [uploadingIdx, setUploadingIdx] = useState<string | null>(null);
  const [bulkUploadingIdx, setBulkUploadingIdx] = useState<number | null>(null);

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

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const totalPages = Math.ceil((events.length || 1) / eventsPerPage);
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Comprehensive New Event Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState<'basic' | 'overview' | 'features' | 'sections' | 'agenda' | 'gallery'>('basic');
  const [modalUploadingIdx, setModalUploadingIdx] = useState<number | null>(null);
  const [modalBulkUploading, setModalBulkUploading] = useState(false);

  const [modalForm, setModalForm] = useState<{
    title: string;
    date: string;
    status: boolean;
    summary: string;
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
  const [successMessage, setSuccessMessage] = useState<{ title: string; id: string } | null>(null);
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [successMessage]);

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

  const handleCreateEventFromModal = async () => {
    if (!modalForm.title.trim()) {
      setModalError("Please enter an event title in Basic Details.");
      setModalActiveTab("basic");
      return;
    }

    setIsSubmittingModal(true);
    setModalError(null);

    const newId = "event-" + Date.now();
    const newEvent = {
      id: newId,
      title: modalForm.title.trim(),
      date: modalForm.date.trim(),
      status: modalForm.status !== false,
      summary: modalForm.summary.trim(),
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

    // Prepend to top so it appears right on Page 1 as Event 1!
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    setCurrentPage(1);

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
      console.error("Failed to auto-save new event:", err);
    } finally {
      setIsSubmittingModal(false);
      setIsAddModalOpen(false);
      resetModalForm();
      setSuccessMessage({ title: newEvent.title, id: newId });
      setHighlightedEventId(newId);

      // Scroll smoothly to the top of the events list
      setTimeout(() => {
        document.getElementById("admin-events-top")?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Clear highlight after 5 seconds
      setTimeout(() => {
        setHighlightedEventId(null);
      }, 5000);
    }
  };

  const data = events[selectedIndex] || {};

  const handleDeleteEvent = async (index: number) => {
    const target = events[index];
    const targetTitle = target?.title?.trim() || `Event ${index + 1}`;

    if (!window.confirm(`Are you sure you want to delete "${targetTitle}"?`)) {
      return;
    }

    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);

    if (selectedIndex >= newEvents.length) {
      setSelectedIndex(Math.max(0, newEvents.length - 1));
    }

    // Adjust page if current page became empty
    const newTotalPages = Math.ceil((newEvents.length || 1) / eventsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
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

  const updateField = (eventIndex: number, field: string, value: any) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      arr[eventIndex] = { ...arr[eventIndex], [field]: value };
      return arr;
    });
  };

  const addArrayItem = (eventIndex: number, field: 'overview' | 'objectives' | 'features' | 'gallery') => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr[field] = [...(curr[field] || []), ""];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateArrayItem = (eventIndex: number, field: 'overview' | 'objectives' | 'features' | 'gallery', itemIdx: number, value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newArr = [...(curr[field] || [])];
      newArr[itemIdx] = value;
      curr[field] = newArr;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeArrayItem = (eventIndex: number, field: 'overview' | 'objectives' | 'features' | 'gallery', itemIdx: number) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr[field] = (curr[field] || []).filter((_: any, i: number) => i !== itemIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const addOrganizer = (eventIndex: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.organizers = [...(curr.organizers || []), { name: "", role: "" }];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateOrganizer = (eventIndex: number, itemIdx: number, key: 'name' | 'role', value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newOrgs = [...(curr.organizers || [])];
      newOrgs[itemIdx] = { ...newOrgs[itemIdx], [key]: value };
      curr.organizers = newOrgs;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeOrganizer = (eventIndex: number, itemIdx: number) => {
    if (!window.confirm("Are you sure you want to remove this organizer?")) return;
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.organizers = (curr.organizers || []).filter((_: any, i: number) => i !== itemIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const addAgenda = (eventIndex: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.agenda = [...(curr.agenda || []), { topic: "", speaker: "", role: "" }];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateAgenda = (eventIndex: number, itemIdx: number, key: 'topic' | 'speaker' | 'role', value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newAgenda = [...(curr.agenda || [])];
      newAgenda[itemIdx] = { ...newAgenda[itemIdx], [key]: value };
      curr.agenda = newAgenda;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeAgenda = (eventIndex: number, itemIdx: number) => {
    if (!window.confirm("Are you sure you want to remove this agenda item?")) return;
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.agenda = (curr.agenda || []).filter((_: any, i: number) => i !== itemIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const addCustomSection = (eventIndex: number) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newSec = {
        id: "sec-" + Date.now(),
        title: "New Section",
        content: ""
      };
      curr.customSections = [...(curr.customSections || []), newSec];
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const updateCustomSection = (eventIndex: number, secIdx: number, key: 'title' | 'content', value: string) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const newSecs = [...(curr.customSections || [])];
      newSecs[secIdx] = { ...newSecs[secIdx], [key]: value };
      curr.customSections = newSecs;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const removeCustomSection = (eventIndex: number, secIdx: number) => {
    if (!window.confirm("Are you sure you want to remove this section?")) return;
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      curr.customSections = (curr.customSections || []).filter((_: any, i: number) => i !== secIdx);
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const moveCustomSection = (eventIndex: number, secIdx: number, direction: -1 | 1) => {
    setEvents(prev => {
      const arr = [...prev];
      if (!arr[eventIndex]) return arr;
      const curr = { ...arr[eventIndex] };
      const list = [...(curr.customSections || [])];
      const targetIdx = secIdx + direction;
      if (targetIdx < 0 || targetIdx >= list.length) return arr;
      const temp = list[secIdx];
      list[secIdx] = list[targetIdx];
      list[targetIdx] = temp;
      curr.customSections = list;
      arr[eventIndex] = curr;
      return arr;
    });
  };

  const handleUpload = async (eventIndex: number, idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(`${eventIndex}-${idx}`);
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
        updateArrayItem(eventIndex, 'gallery', idx, url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file");
    } finally {
      setUploadingIdx(null);
      e.target.value = "";
    }
  };

  const handleBulkUpload = async (eventIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setBulkUploadingIdx(eventIndex);
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
        setEvents(prev => {
          const arr = [...prev];
          if (!arr[eventIndex]) return arr;
          const curr = { ...arr[eventIndex] };
          const cleanedPrev = (curr.gallery || []).filter((g: string) => typeof g === "string" && g.trim() !== "");
          curr.gallery = [...newUrls, ...cleanedPrev];
          arr[eventIndex] = curr;
          return arr;
        });
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      alert("Failed to upload some images.");
    } finally {
      setBulkUploadingIdx(null);
      e.target.value = "";
    }
  };

  // Strictly filter out empty gallery items before saving to database!
  const sanitizedEvents = events.map(ev => ({
    ...ev,
    customSections: (ev.customSections || []).filter((s: any) => s && (s.title?.trim() || s.content?.trim())),
    gallery: (ev.gallery || []).filter((img: string) => typeof img === "string" && img.trim() !== "")
  }));

  return (
    <div className="space-y-8">
      <input type="hidden" name="eventsJson" value={JSON.stringify(sanitizedEvents)} />

      {/* Event Selector / Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
          <div>
            <h2 className="text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <Calendar size={24} className="text-[#007a87]" />
              Manage Events
            </h2>
            <p className="text-sm text-slate-500 mt-1">Manage events individually below.</p>
          </div>
          <button 
            type="button" 
            onClick={() => { setModalError(null); setIsAddModalOpen(true); }}
            className="px-5 py-2.5 bg-[#007a87] text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#005f6b] shadow-sm hover:shadow transition-all"
          >
            <Plus size={18} /> Add New Event
          </button>
        </div>
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
                Event Created Successfully!
              </h4>
              <p className="text-sm font-medium text-emerald-700 mt-1">
                <span className="font-bold">"{successMessage.title}"</span> has been created and placed as <span className="font-bold">Event 1</span> at the top of Page 1. You can configure agenda, organizers, and gallery photos below. Click <span className="font-bold">Save Changes</span> at the top to commit all modifications.
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

      <div id="admin-events-top">
      {events.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4 my-8">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No Events Added Yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            All events have been deleted or none were created yet. Click below to add a new event.
          </p>
          <button
            type="button"
            onClick={() => { setModalError(null); setIsAddModalOpen(true); }}
            className="px-5 py-2.5 bg-[#007a87] text-white rounded-xl text-sm font-bold inline-flex items-center gap-2 hover:bg-[#005f6b] shadow-sm transition-all"
          >
            <Plus size={18} /> Add New Event
          </button>
        </div>
      )}

      {events.length > 0 && events.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage).map((data, idx) => {
        const selectedIndex = (currentPage - 1) * eventsPerPage + idx;
        const isHighlighted = highlightedEventId === data.id;
        return (
        <div key={data.id || selectedIndex} className={`space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-12 transition-all duration-500 ${isHighlighted ? 'ring-4 ring-[#007a87]/40 rounded-3xl p-3 bg-[#007a87]/5' : ''}`}>
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-[28px] font-black text-[#002b5c]">Event {selectedIndex + 1}: {data.title || 'New Event'}</h2>
            <button
              type="button"
              onClick={() => handleDeleteEvent(selectedIndex)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Event"
            >
              <Trash2 size={24} />
            </button>
          </div>
          {/* Basic Details */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <h2 className="text-[20px] font-black text-[#002b5c] border-b pb-4">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex-1">
                  <h3 className="text-[14px] font-bold text-slate-700">Event Status</h3>
                  <p className="text-[12px] text-slate-500">Determine if this event is publicly visible</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={data.status !== false} 
                    onChange={(e) => updateField(selectedIndex, "status", e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#007a87]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007a87]"></div>
                  <span className="ml-3 text-sm font-bold text-slate-700">{data.status !== false ? "Active" : "Inactive"}</span>
                </label>
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Event Title</label>
                <input type="text" value={data.title || ""} onChange={e => updateField(selectedIndex, "title", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="e.g. Diabetes Nursing Conference 2026" />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Event Date</label>
                <input type="text" value={data.date || ""} onChange={e => updateField(selectedIndex, "date", e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="e.g. Saturday March 21, 2026" />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Summary / Conclusion</label>
              <textarea value={data.summary || ""} onChange={e => updateField(selectedIndex, "summary", e.target.value)} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Brief summary of the event" />
            </div>
          </div>

          {/* Overview Paragraphs */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.overviewTitle !== undefined ? data.overviewTitle : "Event Overview"} onChange={e => updateField(selectedIndex, "overviewTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'overview')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Paragraph
              </button>
            </div>
            <div className="space-y-2">
              {(data.overview || []).map((p: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-2 text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <QuillEditor value={p} onChange={content=> updateArrayItem(selectedIndex, 'overview', idx, content)} />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'overview', idx)} className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Objectives */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.objectivesTitle !== undefined ? data.objectivesTitle : "Key Objectives"} onChange={e => updateField(selectedIndex, "objectivesTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'objectives')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Objective
              </button>
            </div>
            <div className="space-y-2">
              {(data.objectives || []).map((obj: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <input type="text" value={obj} onChange={e => updateArrayItem(selectedIndex, 'objectives', idx, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Objective..." />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'objectives', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.featuresTitle !== undefined ? data.featuresTitle : "Key Features"} onChange={e => updateField(selectedIndex, "featuresTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'features')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {(data.features || []).map((feat: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <input type="text" value={feat} onChange={e => updateArrayItem(selectedIndex, 'features', idx, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Feature description..." />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'features', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Content Sections */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#007a87]/10 flex items-center justify-center text-[#007a87]">
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="text-[18px] font-black text-[#002b5c]">
                    Custom Content Sections ({(data.customSections || []).length})
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Add customizable sections with headings and rich text formatting</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => addCustomSection(selectedIndex)} 
                className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300"
              >
                <Plus size={16} /> Add Section
              </button>
            </div>

            {(!data.customSections || data.customSections.length === 0) ? (
              <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Layers className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-medium">No custom sections added yet.</p>
                <p className="text-xs text-slate-400 mt-1">Click &quot;+ Add Section&quot; to add a rich text section with editor.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {(data.customSections || []).map((sec: any, secIdx: number) => (
                  <div key={sec.id || secIdx} className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 md:p-6 space-y-4 hover:border-slate-300 transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-3 flex-1 w-full">
                        <span className="w-6 h-6 rounded-full bg-[#007a87] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {secIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={sec.title || ""}
                          onChange={(e) => updateCustomSection(selectedIndex, secIdx, 'title', e.target.value)}
                          placeholder="Section Title (e.g. Special Instructions, Clinical Details)"
                          className="flex-1 text-base font-bold text-[#002b5c] bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]"
                        />
                      </div>
                      
                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        <button
                          type="button"
                          disabled={secIdx === 0}
                          onClick={() => moveCustomSection(selectedIndex, secIdx, -1)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-all"
                          title="Move Up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          type="button"
                          disabled={secIdx === (data.customSections || []).length - 1}
                          onClick={() => moveCustomSection(selectedIndex, secIdx, 1)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 transition-all"
                          title="Move Down"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCustomSection(selectedIndex, secIdx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1"
                          title="Delete Section"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                        Section Content (Rich Text)
                      </label>
                      <QuillEditor
                        value={sec.content || ""}
                        onChange={(content) => updateCustomSection(selectedIndex, secIdx, 'content', content)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Organizers */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.organizersTitle !== undefined ? data.organizersTitle : "Organizers"} onChange={e => updateField(selectedIndex, "organizersTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addOrganizer(selectedIndex)} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Organizer
              </button>
            </div>
            <div className="space-y-4">
              {(data.organizers || []).map((org: any, idx: number) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <input type="text" value={org.name || ""} onChange={e => updateOrganizer(selectedIndex, idx, 'name', e.target.value)} className="w-full md:flex-1 p-3 border border-slate-200 rounded-xl" placeholder="Organizer Name" />
                  <input type="text" value={org.role || ""} onChange={e => updateOrganizer(selectedIndex, idx, 'role', e.target.value)} className="w-full md:flex-1 p-3 border border-slate-200 rounded-xl" placeholder="Role (e.g. Chairperson)" />
                  <button type="button" onClick={() => removeOrganizer(selectedIndex, idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.agendaTitle !== undefined ? data.agendaTitle : "Conference Topics & Speakers"} onChange={e => updateField(selectedIndex, "agendaTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addAgenda(selectedIndex)} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Session
              </button>
            </div>
            <div className="space-y-4">
              {(data.agenda || []).map((ag: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                  <button type="button" onClick={() => removeAgenda(selectedIndex, idx)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                    <input type="text" value={ag.topic || ""} onChange={e => updateAgenda(selectedIndex, idx, 'topic', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl md:col-span-2" placeholder="Topic / Title" />
                    <input type="text" value={ag.speaker || ""} onChange={e => updateAgenda(selectedIndex, idx, 'speaker', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Speaker Name" />
                    <input type="text" value={ag.role || ""} onChange={e => updateAgenda(selectedIndex, idx, 'role', e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl" placeholder="Speaker Role / Designation" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-3">
              <input type="text" value={data.galleryTitle !== undefined ? data.galleryTitle : "Event Gallery"} onChange={e => updateField(selectedIndex, "galleryTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <div className="flex items-center gap-2">
                <label className="px-3.5 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 font-bold transition-all duration-300 shadow-sm cursor-pointer">
                  {bulkUploadingIdx === selectedIndex ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  <span>{bulkUploadingIdx === selectedIndex ? 'Uploading Batch...' : 'Bulk Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={bulkUploadingIdx === selectedIndex}
                    onChange={(e) => handleBulkUpload(selectedIndex, e)}
                    className="hidden"
                  />
                </label>
                <button type="button" onClick={() => addArrayItem(selectedIndex, 'gallery')} className="px-4 py-2 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-1.5 font-bold transition-all duration-300">
                  <Plus size={14} /> Add Image
                </button>
              </div>
            </div>
            {(!data.gallery || data.gallery.length === 0) ? (
              <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm">No photos added to this event yet. Click &quot;Add Image&quot; or &quot;Bulk Upload&quot;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.gallery || []).map((img: string, idx: number) => {
                  const isUploading = uploadingIdx === `${selectedIndex}-${idx}`;
                  const hasValidImg = Boolean(img && img.trim() !== "");

                  return (
                    <div key={idx} className={`flex gap-3 items-center bg-slate-50 p-3 rounded-xl border ${hasValidImg ? 'border-slate-200' : 'border-amber-300 ring-1 ring-amber-200'} transition-all`}>
                      <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
                        {hasValidImg ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                            <a
                              href={img}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 bg-slate-900/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                              title="View Full Image"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </>
                        ) : (
                          <ImageIcon className="text-slate-400" size={20} />
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white">
                            <Loader2 size={16} className="animate-spin" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <input 
                          type="text" 
                          value={img || ""} 
                          onChange={e => updateArrayItem(selectedIndex, 'gallery', idx, e.target.value)} 
                          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:ring-1 focus:ring-[#007a87] focus:border-[#007a87]" 
                          placeholder="Image URL or upload ->" 
                        />
                      </div>

                      <label className="px-3 py-2 bg-white border border-slate-200 hover:border-[#007a87] text-[#007a87] hover:bg-[#007a87] hover:text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0">
                        {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                        <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          disabled={isUploading}
                          onChange={(e) => handleUpload(selectedIndex, idx, e)} 
                          className="hidden" 
                        />
                      </label>

                      <button type="button" onClick={() => removeArrayItem(selectedIndex, 'gallery', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0" title="Delete Photo">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="text-xs text-slate-500">Supported formats: JPG, PNG, WebP. Blank images are automatically discarded upon save.</p>
          </div>
                </div>
        );
      })}
      </div>

      {/* Admin Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 gap-4 mt-8">
          <div className="text-slate-500 text-sm">
            Showing <span className="font-extrabold text-[#002b5c]">{Math.min(currentPage * eventsPerPage, events.length)}</span> of <span className="font-extrabold text-[#002b5c]">{events.length}</span> Results
          </div>
          <div className="flex items-center gap-6">
            <div className="font-extrabold text-[#002b5c] text-sm">
              Page: {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.currentTarget.blur(); setCurrentPage(p => Math.max(1, p - 1)); document.getElementById("admin-events-top")?.scrollIntoView({ behavior: "smooth" }); }}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-400 rounded-full hover:border-slate-300 hover:text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-5 h-5 rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.currentTarget.blur(); setCurrentPage(p => Math.min(totalPages, p + 1)); document.getElementById("admin-events-top")?.scrollIntoView({ behavior: "smooth" }); }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center bg-[#005f6b] text-white rounded-full hover:bg-[#004a55] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Add New Event Modal */}
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
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#007a87]/10 text-[#007a87] flex items-center justify-center shadow-sm">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#002b5c]">Add New Event (All Details)</h3>
                  <p className="text-xs text-slate-500 font-medium">Configure all sections for this event. It will be added as Event 1 at the top of Page 1.</p>
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

            {/* Modal Tab Strip */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 overflow-x-auto hide-scrollbar gap-2 shrink-0">
              {[
                { id: 'basic', label: 'Basic Details', icon: Calendar },
                { id: 'overview', label: 'Overview & Objectives', icon: FileText },
                { id: 'features', label: 'Features & Organizers', icon: Users },
                { id: 'sections', label: `Custom Sections${(modalForm.customSections?.length || 0) > 0 ? ` (${modalForm.customSections.length})` : ''}`, icon: Layers },
                { id: 'agenda', label: 'Agenda & Sessions', icon: Clock },
                { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
              ].map(t => {
                const Icon = t.icon;
                const isActive = modalActiveTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setModalActiveTab(t.id as any)}
                    className={`flex items-center gap-2 py-3.5 px-3.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                      isActive
                        ? 'border-[#007a87] text-[#007a87] bg-white rounded-t-xl shadow-sm'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100/60 rounded-t-xl'
                    }`}
                  >
                    <Icon size={15} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
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
                        type="text" 
                        value={modalForm.date} 
                        onChange={(e) => updateModalField("date", e.target.value)}
                        placeholder="e.g. Saturday October 24, 2026" 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] text-sm font-medium"
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

              {/* Tab 5: Photo Gallery */}
              {modalActiveTab === 'gallery' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-3 gap-3">
                    <input 
                      type="text" 
                      value={modalForm.galleryTitle} 
                      onChange={(e) => updateModalField("galleryTitle", e.target.value)}
                      className="text-base font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[280px]"
                      placeholder="Gallery Section Title"
                    />
                    <div className="flex items-center gap-2">
                      <label className="px-3.5 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 font-bold transition-all shadow-sm cursor-pointer">
                        {modalBulkUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                        <span>{modalBulkUploading ? 'Uploading...' : 'Bulk Upload'}</span>
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
                        className="px-3.5 py-1.5 text-xs bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] flex items-center gap-1.5 font-bold transition-all"
                      >
                        <Plus size={14} /> Add Image
                      </button>
                    </div>
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

                        return (
                          <div key={idx} className="flex gap-2.5 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
                              {hasValidImg ? (
                                <img src={img} alt="Preview" className="w-full h-full object-cover" />
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
                              className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                              placeholder="Image URL or upload ->"
                            />

                            <label className="px-2.5 py-2 bg-white border border-slate-200 hover:border-[#007a87] text-[#007a87] hover:bg-[#007a87] hover:text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0">
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
                              onClick={() => removeModalArrayItem('gallery', idx)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                              title="Delete photo"
                            >
                              <Trash2 size={16} />
                            </button>
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
                  onClick={handleCreateEventFromModal}
                  disabled={isSubmittingModal}
                  className="px-6 py-2.5 rounded-xl bg-[#007a87] hover:bg-[#005f6b] text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmittingModal ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Creating & Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Create & Save Event</span>
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