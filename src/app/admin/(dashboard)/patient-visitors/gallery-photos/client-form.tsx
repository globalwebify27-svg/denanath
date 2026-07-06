"use client";

import { useState } from "react";
import {  Plus, Trash2, Image as ImageIcon, Folder } from "lucide-react";

export default function GalleryPhotosClientForm({ initialData }: { initialData: any }) {
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [data, setData] = useState({
    categories: initialData?.categories ? initialData.categories.join("\n") : "DMH\nDMH MAIN BUILDING\nSUPER SPECIALITY BUILDING\nWORLD THYROID DAY 2024",
    photos: initialData?.photos ? initialData.photos.map((p: any) => ({
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

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addPhoto = () => {
    setData({
      ...data,
      photos: [...data.photos, { 
        id: Date.now(), 
        title: "", 
        category: filterCategory === "ALL" ? "DMH" : filterCategory, 
        url: "" 
      }]
    });
  };

  const removePhoto = (id: number) => {
    setData({
      ...data,
      photos: data.photos.filter((p: any) => p.id !== id)
    });
  };

  const updatePhoto = (id: number, field: string, value: string) => {
    setData({
      ...data,
      photos: data.photos.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      categories: data.categories.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      photos: data.photos.map((p: any) => ({
        title: p.title,
        category: p.category,
        url: p.url
      }))
    });
  };

  const availableCategories = data.categories.split('\n').map((s: string) => s.trim()).filter((s: string) => s && s !== "ALL");

  return (
    <>
      <input type="hidden" name="galleryPhotosJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Categories */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-[#007a87]" />
            Photo Categories
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter one category per line. These categories will appear in the dropdown for each photo.</p>
          <textarea 
            value={data.categories} 
            onChange={(e) => handleChange('categories', e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed uppercase"
          />
        </div>

        {/* Photos List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex flex-col gap-3 mb-6">
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#007a87]" />
              Hospital Photos
            </h3>
            <div className="flex items-center gap-2 w-full">
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="flex-1 min-w-0 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007a87]/30 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                {availableCategories.map((c: string, i: number) => <option key={i} value={c}>{c}</option>)}
              </select>
              <button 
                type="button"
                onClick={addPhoto}
                className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] flex items-center gap-1 transition-colors shrink-0 whitespace-nowrap"
              >
                <Plus size={14} /> Add Photo
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filterCategory === "ALL" ? data.photos : data.photos.filter((p: any) => p.category === filterCategory)).map((photo: any) => (
              <div key={photo.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group flex flex-col">
                <button 
                  type="button" 
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-rose-50 text-rose-500 rounded z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} color="#D9232D" />
                </button>
                
                <div className="aspect-[4/3] bg-slate-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-slate-100">
                  {photo.url ? (
                    <img src={photo.url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  )}
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Upload Photo</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
      formData.append('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
                            updatePhoto(photo.id, 'url', data.url);
                          } else { alert('Upload failed'); }
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload error');
      });
                        }
                      }}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87] text-[10px] font-medium file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#003360] file:text-white hover:file:bg-[#002b5c] cursor-pointer" 
                    />
                    {photo.url && photo.url.startsWith('data:image') && (
                      <p className="mt-1 text-[9px] text-teal-600 font-bold">✓ Custom image selected</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Title</label>
                    <input type="text" value={photo.title} onChange={(e) => updatePhoto(photo.id, 'title', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-[20px] font-black text-[#002b5c]" placeholder="Photo Title" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Category</label>
                    <select 
                      value={photo.category} 
                      onChange={(e) => updatePhoto(photo.id, 'category', e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium bg-white"
                    >
                      {availableCategories.map((c: string, i: number) => <option key={i} value={c}>{c}</option>)}
                      {!availableCategories.includes(photo.category) && <option value={photo.category}>{photo.category}</option>}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      
    </>
  );
}
