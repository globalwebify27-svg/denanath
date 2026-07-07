"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, Camera } from "lucide-react";
import Image from "next/image";

export default function VirtualTourClientForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    seoMetaTitle: initialData?.seoMetaTitle || "",
    seoMetaDescription: initialData?.seoMetaDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
    locations: initialData?.locations && initialData.locations.length > 0 ? initialData.locations : [
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
    ],
  });

  const updateLocation = (index: number, field: string, value: string) => {
    const newLocations = [...data.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setData({ ...data, locations: newLocations });
  };

  const removeLocation = (index: number) => {
    const newLocations = data.locations.filter((_: any, i: number) => i !== index);
    setData({ ...data, locations: newLocations });
  };

  const addLocation = () => {
    setData({
      ...data,
      locations: [...data.locations, { name: "", category: "", img: "" }]
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          key: 'page_virtual_tour', 
          value: JSON.stringify(data),
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
          <h2 className="text-lg font-bold text-gray-800">Locations</h2>
          <p className="text-sm text-gray-500 mt-1">Manage the locations shown in the virtual tour.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.locations.map((loc: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative group">
                <button
                  onClick={() => removeLocation(index)}
                  className="absolute top-3 right-3 p-2 bg-white text-red-500 rounded-full opacity-0 group-hover:opacity-100 shadow-md border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all z-10"
                  title="Remove location"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-3 mt-2">
                  {loc.img && (
                    <div className="w-full h-24 relative rounded overflow-hidden border border-gray-200 mb-2">
                      <Image src={loc.img} alt={loc.name} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={loc.name}
                      onChange={(e) => updateLocation(index, "name", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 text-sm"
                      placeholder="Location Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      value={loc.category}
                      onChange={(e) => updateLocation(index, "category", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 text-sm"
                      placeholder="Category (e.g. Facilities)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                            if (res.ok) {
                              const uploadData = await res.json();
                              updateLocation(index, "img", uploadData.url);
                              
                              // Auto-save to prevent user error
                              const newLocations = [...data.locations];
                              newLocations[index] = { ...newLocations[index], img: uploadData.url };
                              const updatedData = { ...data, locations: newLocations };
                              await fetch("/api/settings", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ 
                                  key: 'page_virtual_tour', 
                                  value: JSON.stringify(updatedData),
                                  pathsToRevalidate: [
                                    "/admin/patient-visitors/virtual-tour",
                                    "/patient-visitors/virtual-tour",
                                    "/virtual-tour"
                                  ] 
                                })
                              });
                            } else {
                              alert("Failed to upload image");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Error uploading image");
                          }
                        }
                      }}
                      className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]/50 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                    />
                    {loc.img && (
                      <div className="mt-2 text-xs truncate text-emerald-600 font-medium border border-emerald-200 bg-emerald-50 rounded-md p-2" title={loc.img}>
                        Uploaded: {loc.img.split('/').pop()?.substring(0, 30)}...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
          <h2 className="text-lg font-bold text-gray-800">SEO Settings</h2>
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
