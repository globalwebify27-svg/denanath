"use client";

import { useState } from "react";
import { Save, Plus, Trash2, Video, Folder } from "lucide-react";

export default function GalleryVideosClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    categories: initialData?.categories ? initialData.categories.join("\n") : "ALL\nPATIENT STORIES\nICU-VISIT\nCOVID-19\nWELLNESS AND LIFESTYLE\nMAAI MOTHER'S MILK BANK",
    videos: initialData?.videos ? initialData.videos.map((v: any) => ({
      ...v,
      id: v.id || Date.now() + Math.random()
    })) : [
      { id: Date.now(), title: "COVID 19 VACCINE : Why When & How by Dr. Dhananjay Kelkar", category: "COVID-19", url: "" }
    ]
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const addVideo = () => {
    setData({
      ...data,
      videos: [{ id: Date.now(), title: "", category: "COVID-19", url: "" }, ...data.videos]
    });
  };

  const removeVideo = (id: number) => {
    setData({
      ...data,
      videos: data.videos.filter((v: any) => v.id !== id)
    });
  };

  const updateVideo = (id: number, field: string, value: string) => {
    setData({
      ...data,
      videos: data.videos.map((v: any) => v.id === id ? { ...v, [field]: value } : v)
    });
  };

  const getJsonPayload = () => {
    return JSON.stringify({
      categories: data.categories.split('\n').map((s: string) => s.trim()).filter((s: string) => s),
      videos: data.videos.map((v: any) => ({
        title: v.title,
        category: v.category,
        url: v.url
      }))
    });
  };

  const availableCategories = data.categories.split('\n').map((s: string) => s.trim()).filter((s: string) => s && s !== "ALL");

  return (
    <>
      <input type="hidden" name="galleryVideosJson" value={getJsonPayload()} />
      
      <div className="space-y-8">
        
        {/* Categories */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-[#002b5c] mb-4 flex items-center gap-2">
            <Folder className="w-5 h-5 text-[#007a87]" />
            Video Categories
          </h3>
          <p className="text-sm text-slate-500 mb-4">Enter one category per line. "ALL" will be automatically handled but you can include it if you want it first.</p>
          <textarea 
            value={data.categories} 
            onChange={(e) => handleChange('categories', e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-[#007a87] focus:outline-none text-sm leading-relaxed uppercase"
          />
        </div>

        {/* Videos List */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#002b5c] flex items-center gap-2">
              <Video className="w-5 h-5 text-[#007a87]" />
              Hospital Videos
            </h3>
            <button 
              type="button"
              onClick={addVideo}
              className="text-xs font-bold text-[#007a87] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Add Video
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.videos.map((video: any) => (
              <div key={video.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group flex flex-col">
                <button 
                  type="button" 
                  onClick={() => removeVideo(video.id)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-rose-50 text-rose-500 rounded transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
                
                <div className="space-y-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Title</label>
                    <input type="text" value={video.title} onChange={(e) => updateVideo(video.id, 'title', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold text-[#002b5c]" placeholder="Video Title" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">YouTube Video URL / Link</label>
                    <input type="text" value={video.url} onChange={(e) => updateVideo(video.id, 'url', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="https://youtube.com/..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Category</label>
                    <select 
                      value={video.category} 
                      onChange={(e) => updateVideo(video.id, 'category', e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white"
                    >
                      {availableCategories.map((c: string, i: number) => <option key={i} value={c}>{c}</option>)}
                      {!availableCategories.includes(video.category) && <option value={video.category}>{video.category}</option>}
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
          <Save size={18} /> Save Video Gallery
        </button>
      </div>
    </>
  );
}
