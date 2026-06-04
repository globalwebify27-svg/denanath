"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Image as ImageIcon, Folder } from "lucide-react";

export default function GalleryPhotosClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    categories: initialData?.categories ? initialData.categories.join("\n") : "ALL\nDMH\nDMH MAIN BUILDING\nSUPER SPECIALITY BUILDING",
    photos: initialData?.photos ? initialData.photos.map((p: any) => ({
      ...p,
      id: p.id || Date.now() + Math.random()
    })) : [
      { id: Date.now(), title: "Deenanath Mangeshkar", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/dmangeshkar1.jpg" }
    ]
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addPhoto = () => {
    setData({
      ...data,
      photos: [{ id: Date.now(), title: "", category: "DMH", url: "" }, ...data.photos]
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
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-[#007a87]" />
            Photo Categories
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter one category per line. "ALL" will be automatically handled but you can include it if you want it first.</p>
          <textarea 
            value={data.categories} 
            onChange={(e) => handleChange('categories', e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed uppercase"
          />
        </div>

        {/* Photos List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#007a87]" />
              Hospital Photos
            </h3>
            <button 
              type="button"
              onClick={addPhoto}
              className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Add Photo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.photos.map((photo: any) => (
              <div key={photo.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group flex flex-col">
                <button 
                  type="button" 
                  onClick={() => removePhoto(photo.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-rose-50 text-rose-500 rounded z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
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
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Image URL</label>
                    <input type="text" value={photo.url} onChange={(e) => updatePhoto(photo.id, 'url', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Title</label>
                    <input type="text" value={photo.title} onChange={(e) => updatePhoto(photo.id, 'title', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-[#002b5c]" placeholder="Photo Title" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Category</label>
                    <select 
                      value={photo.category} 
                      onChange={(e) => updatePhoto(photo.id, 'category', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white"
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

      <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
        <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#005c66] font-bold shadow-md transition-all hover:-translate-y-0.5">
          <Save size={18} /> Save Photo Gallery
        </button>
      </div>
    </>
  );
}
