"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, Camera, Upload, ExternalLink, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function VirtualTourClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [data, setData] = useState({
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
    locations: (initialData?.locations && initialData.locations.length > 0 ? initialData.locations : [
      { name: "Ambulance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Admission Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Auditorium", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Cafeteria", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Emergency Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "FF Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "ICU Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Imaging Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "LB Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Lift", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Main Entrance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop" },
      { name: "Main Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Reception Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Laboratory", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "OT", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "OT Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Accident and Emergency", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Blood Bank", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Cathlab", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Chemo", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Dialysis", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Emergency Entrance", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Emergency Entry Gate", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Health Check-Up", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Hospital Outdoor", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "CSSD", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "CT Simulation", category: "Technology", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Imaging CT", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "LINAC-Radiation Oncology", category: "Technology", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "MRI", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Economy", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "General Ward 6 Beds", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "ICU", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "ICU Isolation", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "OPD Consulting Room", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Single Bed", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Single Bed Isolation", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Suite", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Suite 2", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
      { name: "Triple Sharing", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
      { name: "Twin Sharing", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" }
    ]).map((loc: any) => ({ ...loc, link: loc.link || "https://www.vrwix.com/vr/hospital/ind/maharashtra/pune/deenanath_mangeshkar_hospital" })),
  });

  const updateLocation = (index: number, field: string, value: string) => {
    const newLocations = [...data.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setData({ ...data, locations: newLocations });
  };

  const removeLocation = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this virtual tour location?")) return;
    const newLocations = data.locations.filter((_: any, i: number) => i !== index);
    setData({ ...data, locations: newLocations });
  };

  const addLocation = () => {
    setData({
      ...data,
      locations: [{ name: "", category: "", img: "", link: "https://www.vrwix.com/vr/hospital/ind/maharashtra/pune/deenanath_mangeshkar_hospital" }, ...data.locations]
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Filter out blank image locations before saving to DB!
      const validLocations = (data.locations || []).filter((loc: any) => loc && loc.img && loc.img.trim() !== "");
      const payload = {
        ...data,
        locations: validLocations
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          key: 'page_virtual_tour', 
          value: JSON.stringify(payload),
          pathsToRevalidate: [
            "/admin/patient-visitors/virtual-tour",
            "/patient-visitors/virtual-tour",
            "/virtual-tour"
          ] 
        })
      });
      if (res.ok) {
        alert("Settings saved successfully!");
        router.refresh();
      } else {
        alert("Failed to save settings");
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#007a87]" />
          Virtual Tour Settings
        </h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-[#007a87] hover:bg-[#005f6b] text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-800">Locations</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the locations shown in the virtual tour.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.locations.map((loc: any, index: number) => {
              const isUploading = uploadingIdx === index;
              const hasValidImg = Boolean(loc.img && loc.img.trim() !== "");

              return (
              <div key={index} className={`bg-white rounded-xl p-4 border ${hasValidImg ? 'border-gray-200' : 'border-amber-300 ring-1 ring-amber-200'} shadow-sm relative group flex flex-col transition-all`}>
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="absolute top-2.5 right-2.5 p-1.5 bg-white text-red-500 rounded-lg shadow-sm border border-gray-200 hover:bg-red-500 hover:text-white transition-all z-20"
                  title="Remove location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Image Preview Box */}
                <div className="w-full h-36 relative rounded-lg overflow-hidden bg-slate-100 border border-gray-200 mb-3 flex items-center justify-center">
                  {hasValidImg ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={loc.img} alt={loc.name || "Preview"} className="w-full h-full object-cover" />
                      <a
                        href={loc.img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 bg-slate-900/75 hover:bg-slate-900 text-white text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm transition-colors"
                      >
                        <ExternalLink size={11} />
                        <span>View Full</span>
                      </a>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                      <ImageIcon size={28} className="opacity-40 mb-1" />
                      <span className="text-xs font-semibold text-slate-500">No Image</span>
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white z-10">
                      <Loader2 size={20} className="animate-spin mb-1 text-white" />
                      <span className="text-xs font-bold">Uploading...</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 flex-1 flex flex-col">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Upload Photo</label>
                    <label className="flex items-center justify-center gap-1.5 w-full py-2 px-3 border border-dashed border-[#007a87]/40 hover:border-[#007a87] bg-teal-50/40 hover:bg-teal-50/80 rounded-lg text-xs font-bold text-[#007a87] cursor-pointer transition-colors text-center">
                      <Upload size={14} />
                      <span>{isUploading ? "Uploading..." : hasValidImg ? "Change Photo File" : "Choose Photo File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadingIdx(index);
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const res = await fetch('/api/upload', { method: 'POST', body: formData });
                              if (res.ok) {
                                const uploadData = await res.json();
                                updateLocation(index, "img", uploadData.url);
                              } else {
                                alert("Failed to upload image");
                              }
                            } catch (err) {
                              console.error(err);
                              alert("Error uploading image");
                            } finally {
                              setUploadingIdx(null);
                              e.target.value = '';
                            }
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Image URL</label>
                    <input
                      type="text"
                      value={loc.img || ""}
                      onChange={(e) => updateLocation(index, "img", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#007a87] text-xs font-mono"
                      placeholder="https://... or /uploads/..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Location Name</label>
                    <input
                      type="text"
                      value={loc.name}
                      onChange={(e) => updateLocation(index, "name", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#007a87] text-xs font-medium"
                      placeholder="e.g. ICU Lobby"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">Category</label>
                    <input
                      type="text"
                      value={loc.category}
                      onChange={(e) => updateLocation(index, "category", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#007a87] text-xs font-medium"
                      placeholder="Facilities / Units / Rooms"
                    />
                  </div>

                  <div className="mt-auto pt-1">
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">VR 360 Tour Link</label>
                    <input
                      type="text"
                      value={loc.link || ""}
                      onChange={(e) => updateLocation(index, "link", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#007a87] text-xs"
                      placeholder="https://www.vrwix.com/..."
                    />
                  </div>
                </div>
              </div>
              );
            })}
          </div>
          <button
            onClick={addLocation}
            className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-[#007a87] hover:border-[#007a87] hover:bg-teal-50/30 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Location
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-800">SEO Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage search engine optimization meta tags.</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
            <input
              type="text"
              value={data.seoMetaTitle}
              onChange={(e) => setData({ ...data, seoMetaTitle: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]/50"
              placeholder="Enter SEO Meta Title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea
              value={data.seoMetaDescription}
              onChange={(e) => setData({ ...data, seoMetaDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 resize-none"
              placeholder="Enter SEO Meta Description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
            <textarea
              value={data.seoKeywords}
              onChange={(e) => setData({ ...data, seoKeywords: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 resize-none"
              placeholder="hospital, care, pune, best hospital..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
