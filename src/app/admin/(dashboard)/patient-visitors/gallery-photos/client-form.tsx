"use client";
import { useImageUpload, UploadSpinner } from "@/components/UploadOverlay";
import QuillEditor, { formatListToHtml, parseHtmlToList } from "@/components/QuillEditor";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Folder, Upload, Loader2, ExternalLink } from "lucide-react";

export default function GalleryPhotosClientForm({ initialData }: { initialData: any }) {
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [bulkUploading, setBulkUploading] = useState(false);
  const { uploading, handleUpload } = useImageUpload();

  const [data, setData] = useState({
    categories: formatListToHtml(initialData?.categories, ["DMH", "DMH MAIN BUILDING", "SUPER SPECIALITY BUILDING", "WORLD THYROID DAY 2024"]),
    photos: initialData?.photos ? initialData.photos
      .filter((p: any) => p && typeof p.url === 'string' && p.url.trim() !== '')
      .map((p: any) => ({
        ...p,
        id: p.id || Date.now() + Math.random()
      })) : [
          { id: Date.now() + 1, title: "Deenanath Mangeshkar", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/dmangeshkar1.jpg" },
          { id: Date.now() + 2, title: "Dr. APJ Abdul Kalam Visit", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/abdul-kalam.jpg" },
          { id: Date.now() + 3, title: "Sachin Tendulkar Visit", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/tendulkar.jpg" },
          { id: Date.now() + 4, title: "Obesity Clinic Inauguration", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/obesity-clinic-inauguration.jpg" },
          { id: Date.now() + 5, title: "8th March Women's Day", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/8th%20march.JPG" },
          { id: Date.now() + 6, title: "Advance Wound Care", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/adv%20wound%20care3.JPG" },
          { id: Date.now() + 7, title: "Event Photo 1", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/DSC_0064.JPG" },
          { id: Date.now() + 8, title: "Event Photo 2", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/feb.jpg" },
          { id: Date.now() + 9, title: "Event Photo 3", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/oct.jpg" },
          { id: Date.now() + 10, title: "Event Photo 4", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/4th%20april.jpg" },
          { id: Date.now() + 11, title: "Event Photo 5", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/26th%20april.jpg" },
          { id: Date.now() + 12, title: "Dr. Arundhati Khare", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/Dr.Arundhati-Khare.jpg" },
          { id: Date.now() + 13, title: "WTD 2024 Event Photo 1", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(4).jpg" },
          { id: Date.now() + 14, title: "WTD 2024 Event Photo 2", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(5).jpg" },
          { id: Date.now() + 15, title: "WTD 2024 Event Photo 3", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(6).jpg" },
          { id: Date.now() + 16, title: "WTD 2024 Event Photo 4", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/1_WTD%20(8).jpg" },
          { id: Date.now() + 17, title: "WTD 2024 Event Photo 5", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024%20(2).jpg" },
          { id: Date.now() + 18, title: "WTD 2024 Event Photo 6", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024%20(3).jpg" },
          { id: Date.now() + 19, title: "WTD 2024 Event Photo 7", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024.jpg" },
          { id: Date.now() + 20, title: "WDD 2025 Event Photo 1", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0007%20(1).jpg" },
          { id: Date.now() + 21, title: "WDD 2025 Event Photo 2", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0017.jpg" },
          { id: Date.now() + 22, title: "WDD 2025 Event Photo 3", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0045.jpg" },
          { id: Date.now() + 23, title: "WDD 2025 Event Photo 4", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0069%20(1).jpg" },
          { id: Date.now() + 24, title: "WDD 2025 Event Photo 5", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0091.jpg" },
          { id: Date.now() + 25, title: "GS_ Private B (Deluxe Room)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20B%20(Deluxe%20Room).JPG" },
          { id: Date.now() + 26, title: "GS_Non AC Day Care", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Non%20AC%20Day%20Care.jpg" },
          { id: Date.now() + 27, title: "GS_Private C (Non AC)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20C%20(Non%20AC).JPG" },
          { id: Date.now() + 28, title: "GS_Private D (Small AC Room)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20D%20(Small%20AC%20Room).JPG" },
          { id: Date.now() + 29, title: "GS_Semi Private Room", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Semi%20Private%20Room.JPG" },
          { id: Date.now() + 30, title: "GS_SUPER_DELUX_A", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_SUPER_DELUX_A.JPG" },
          { id: Date.now() + 31, title: "GS_SUPER_DELUX_B", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS.SUPER_DELUX_B.JPG" },
          { id: Date.now() + 32, title: "SS_Day Care", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS%20Day%20Care.jpg" },
          { id: Date.now() + 33, title: "SS_Private A", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS%20Private%20A.JPG" },
          { id: Date.now() + 34, title: "SS_Private B", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS_Private%20B.JPG" },
          { id: Date.now() + 35, title: "SS_Semi Private A (Only For Gynaec)", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS_Semi%20Private%20A%20(Only%20For%20Gynaec).JPG" }
      ]
  });

  const availableCategories = parseHtmlToList(data.categories).filter((s: string) => s && s !== "ALL");

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const addPhoto = () => {
    const defaultCat = filterCategory === "ALL" ? (availableCategories[0] || "DMH") : filterCategory;
    setData((prev: any) => ({
      ...prev,
      photos: [
        { 
          id: Date.now(), 
          title: "", 
          category: defaultCat, 
          url: "" 
        },
        ...prev.photos
      ]
    }));
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setBulkUploading(true);
    try {
      const defaultCat = filterCategory === "ALL" ? (availableCategories[0] || "DMH") : filterCategory;
      const newItems: any[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const resData = await res.json();
          if (resData.url) {
            const cleanTitle = file.name ? file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ") : `Photo ${i + 1}`;
            newItems.push({
              id: Date.now() + i + Math.random(),
              title: cleanTitle,
              category: defaultCat,
              url: resData.url
            });
          }
        }
      }
      if (newItems.length > 0) {
        setData((prev: any) => ({
          ...prev,
          photos: [...newItems, ...prev.photos]
        }));
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      alert("Some images could not be uploaded.");
    } finally {
      setBulkUploading(false);
      e.target.value = "";
    }
  };

  const removePhoto = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;
    setData((prev: any) => ({
      ...prev,
      photos: prev.photos.filter((p: any) => p.id !== id)
    }));
  };

  const updatePhoto = (id: number, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      photos: prev.photos.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  // Crucial: Filters out all blank photos before generating the hidden JSON payload
  const getJsonPayload = () => {
    const validPhotos = (data.photos || [])
      .filter((p: any) => p && typeof p.url === 'string' && p.url.trim() !== "")
      .map((p: any) => ({
        title: (p.title || "").trim(),
        category: p.category || "DMH",
        url: p.url.trim()
      }));

    return JSON.stringify({
      categories: parseHtmlToList(data.categories),
      photos: validPhotos
    });
  };

  return (
    <>
      <input type="hidden" name="galleryPhotosJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Categories */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-[#007a87]" />
            Photo Categories
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter one category per line. These categories will appear in the dropdown for each photo.</p>
          <QuillEditor value={data.categories} onChange={content => handleChange('categories', content)} />
        </div>

        {/* Photos List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-base text-[20px] font-black text-[#002b5c] flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#007a87]" />
                Hospital Photos ({data.photos.length})
              </h3>
              <p className="text-xs text-slate-500 font-medium">Add, upload, and categorize hospital photos.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007a87]/30 cursor-pointer shadow-sm"
              >
                <option value="ALL">All Categories</option>
                {availableCategories.map((c: string, i: number) => <option key={i} value={c}>{c}</option>)}
              </select>

              <label className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm border border-slate-200">
                {bulkUploading ? <Loader2 size={14} className="animate-spin text-[#007a87]" /> : <Upload size={14} />}
                <span>{bulkUploading ? "Uploading..." : "Bulk Upload"}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  disabled={bulkUploading}
                  onChange={handleBulkUpload}
                  className="hidden"
                />
              </label>

              <button 
                type="button"
                onClick={addPhoto}
                className="text-xs font-bold text-white bg-[#003360] px-4 py-2 rounded-xl hover:bg-[#002b5c] flex items-center gap-1.5 transition-all shadow-sm shrink-0"
              >
                <Plus size={14} /> Add Photo
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filterCategory === "ALL" ? data.photos : data.photos.filter((p: any) => p.category === filterCategory)).map((photo: any, index: number) => (
              <div key={`${photo.id}-${index}`} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative group flex flex-col hover:shadow-md transition-shadow">
                <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                  {photo.url && (
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white/90 text-slate-700 hover:text-[#007a87] hover:bg-white rounded-lg shadow-sm transition-colors"
                      title="View Full Photo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button 
                    type="button" 
                    onClick={() => removePhoto(photo.id)}
                    className="p-1.5 bg-white/90 hover:bg-rose-50 text-rose-500 rounded-lg shadow-sm transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 size={14} color="#D9232D" />
                  </button>
                </div>
                
                <div className="aspect-[4/3] bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-slate-100 relative group/img">
                  {uploading(`photo-${photo.id}`) ? (
                    <UploadSpinner />
                  ) : photo.url ? (
                    <img src={photo.url} alt={photo.title || "Hospital Photo"} className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105" />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                      <ImageIcon className="w-8 h-8 opacity-40" />
                      <span className="text-[11px] font-medium">No Image Uploaded</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 flex-1 flex flex-col">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                      {photo.url ? "REPLACE PHOTO" : "UPLOAD PHOTO"}
                    </label>
                    <label className="cursor-pointer w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#003360] hover:bg-[#002545] text-white rounded-xl text-xs font-bold transition-all shadow-sm">
                      {uploading(`photo-${photo.id}`) ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      <span>{uploading(`photo-${photo.id}`) ? "Uploading..." : (photo.url ? "Choose New Image" : "Choose Image")}</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        disabled={uploading(`photo-${photo.id}`)}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleUpload(file, `photo-${photo.id}`);
                            if (url) {
                              updatePhoto(photo.id, 'url', url);
                              if (!photo.title) {
                                const autoTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
                                updatePhoto(photo.id, 'title', autoTitle);
                              }
                            }
                          }
                          e.target.value = "";
                        }}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">IMAGE URL / LINK</label>
                    <input
                      type="text"
                      value={photo.url || ""}
                      onChange={(e) => updatePhoto(photo.id, 'url', e.target.value)}
                      placeholder="https://... or choose photo above"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 focus:bg-white focus:ring-1 focus:ring-[#007a87] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">PHOTO TITLE</label>
                    <input 
                      type="text" 
                      value={photo.title || ""} 
                      onChange={(e) => updatePhoto(photo.id, 'title', e.target.value)} 
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-slate-800 font-semibold text-sm outline-none" 
                      placeholder="e.g. Operating Theater, Dr. Visit..." 
                    />
                  </div>

                  <div className="mt-auto pt-1">
                    <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">CATEGORY</label>
                    <select 
                      value={photo.category || "DMH"} 
                      onChange={(e) => updatePhoto(photo.id, 'category', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all text-slate-700 font-medium text-xs outline-none"
                    >
                      {availableCategories.map((c: string, i: number) => <option key={i} value={c}>{c}</option>)}
                      {!availableCategories.includes(photo.category) && <option value={photo.category}>{photo.category}</option>}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.photos.length === 0 && (
            <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200 mt-4">
              <p className="text-sm font-medium">No photos found in this category.</p>
              <button 
                type="button" 
                onClick={addPhoto} 
                className="mt-3 px-4 py-2 bg-[#007a87] text-white text-xs font-bold rounded-xl hover:bg-[#006570] transition-colors"
              >
                Add First Photo
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  );
}
