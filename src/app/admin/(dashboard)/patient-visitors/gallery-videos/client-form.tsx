"use client";

import { useState } from "react";
import {  Plus, Trash2, Video, Folder } from "lucide-react";

export default function GalleryVideosClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    categories: initialData?.categories ? initialData.categories.join("\n") : "ALL\nPATIENT STORIES\nICU-VISIT\nCOVID-19\nWELLNESS AND LIFESTYLE\nMAAI MOTHER'S MILK BANK",
    videos: initialData?.videos ? initialData.videos.map((v: any) => ({
      ...v,
      id: v.id || Date.now() + Math.random()
    })) : [
          { id: Date.now() + 1, title: "COVID 19 VACCINE : Why When & How by Dr. Dhananjay Kelkar", category: "COVID-19", url: "" },
          { id: Date.now() + 2, title: "Covid-19 Home Isolation Instructions by DMH - Marathi", category: "COVID-19", url: "" },
          { id: Date.now() + 3, title: "Covid-19 Home Isolation Instructions by DMH- English", category: "COVID-19", url: "" },
          { id: Date.now() + 4, title: "Covid-19 Home Isolation Instructions by DMH- Hindi", category: "COVID-19", url: "" },
          { id: Date.now() + 5, title: "DMH covid-19 update (for doctors) Part 1: Overview, Prevention & Diagnosis", category: "COVID-19", url: "" },
          { id: Date.now() + 6, title: "DMH covid-19 update (for doctors) Part 2: Treatment", category: "COVID-19", url: "" },
          { id: Date.now() + 7, title: "DMH covid-19 update Part 3: Paediatric", category: "COVID-19", url: "" },
          { id: Date.now() + 8, title: "DMH Jalneti -1", category: "WELLNESS AND LIFESTYLE", url: "" },
          { id: Date.now() + 9, title: "DMH Jalneti-2 Q & A", category: "WELLNESS AND LIFESTYLE", url: "" },
          { id: Date.now() + 10, title: "Everything to know about covid-19 Part 1 of 3 : Prevention and Overview by Dr. Dhananjay Kelkar, DMH", category: "COVID-19", url: "" },
          { id: Date.now() + 11, title: "Everything to know about covid-19 part 2 of 3 : Diagnosis and Treatment by Dr. Dhananjay Kelkar, DMH", category: "COVID-19", url: "" },
          { id: Date.now() + 12, title: "Everything to know about covid-19 part 3 of 3 : Living with covid by Dr. Dhananjay Kelkar, DMH", category: "COVID-19", url: "" },
          { id: Date.now() + 13, title: "Guidance Lecture on Corona Virus | Dr. Dhananjay Kelkar", category: "COVID-19", url: "" },
          { id: Date.now() + 14, title: "ICU-Visit", category: "ICU-VISIT", url: "" },
          { id: Date.now() + 15, title: "In the shadow of virtual truth… Corona in our minds | Dr Dhananjay Kelkar", category: "COVID-19", url: "" },
          { id: Date.now() + 16, title: "Maai Mother's Milk Bank", category: "MAAI MOTHER'S MILK BANK", url: "" },
          { id: Date.now() + 17, title: "MIND over MATTER by Dr.Dhananjay Kelkar", category: "WELLNESS AND LIFESTYLE", url: "" },
          { id: Date.now() + 18, title: "Patient Stories - Testimonial 1", category: "PATIENT STORIES", url: "" },
          { id: Date.now() + 19, title: "Patient Stories - Testimonial 2", category: "PATIENT STORIES", url: "" },
          { id: Date.now() + 20, title: "Patient Stories - Testimonial 3", category: "PATIENT STORIES", url: "" },
          { id: Date.now() + 21, title: "Rehabilitation guidelines for patients recovering from Covid-19 (in English)", category: "COVID-19", url: "" },
          { id: Date.now() + 22, title: "Rehabilitation guidelines for patients recovering from Covid-19 (in marathi)", category: "COVID-19", url: "" },
          { id: Date.now() + 23, title: "Sukshma Yoga And Pranayama", category: "WELLNESS AND LIFESTYLE", url: "" },
          { id: Date.now() + 24, title: "Work Life Balance by Dr. Dhananjay Kelkar", category: "WELLNESS AND LIFESTYLE", url: "" },
          { id: Date.now() + 25, title: "माझे गुरु (कै. अप्पासाहेब पेंडसे , डॉ. मेहरू मेहता , मा. लता दीदी ) by Dr. Dhananjay Kelkar MS FRCS", category: "WELLNESS AND LIFESTYLE", url: "" }
    ]
  });

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const [filterCategory, setFilterCategory] = useState("ALL");

  const addVideo = () => {
    setData({
      ...data,
      videos: [...data.videos, { id: Date.now(), title: "", category: filterCategory === "ALL" ? "COVID-19" : filterCategory, url: "" }]
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
          <h3 className="text-lg text-[20px] font-black text-[#002b5c] mb-4 flex items-center gap-2">
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h3 className="text-lg text-[20px] font-black text-[#002b5c] flex items-center gap-2">
              <Video className="w-5 h-5 text-[#007a87]" />
              Hospital Videos
            </h3>
            <div className="flex items-center gap-4">
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007a87]/30 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                {availableCategories.map((c: string, i: number) => <option key={i} value={c}>{c}</option>)}
              </select>
              <button 
                type="button"
                onClick={addVideo}
                className="text-xs font-bold text-white bg-[#003360] px-3 py-1.5 rounded-lg hover:bg-[#002b5c] flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Add Video
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(filterCategory === "ALL" ? data.videos : data.videos.filter((v: any) => v.category === filterCategory)).map((video: any) => (
              <div key={video.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group flex flex-col">
                <button 
                  type="button" 
                  onClick={() => removeVideo(video.id)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-rose-50 text-rose-500 rounded transition-opacity"
                >
                  <Trash2 size={16} color="#D9232D" />
                </button>
                
                <div className="space-y-4 pr-10">
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Title</label>
                    <input type="text" value={video.title} onChange={(e) => updateVideo(video.id, 'title', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-[20px] font-black text-[#002b5c]" placeholder="Video Title" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">YouTube Video URL / Link</label>
                    <input type="text" value={video.url} onChange={(e) => updateVideo(video.id, 'url', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium" placeholder="https://youtube.com/..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-[800] text-gray-700 uppercase tracking-widest mb-1">Category</label>
                    <select 
                      value={video.category} 
                      onChange={(e) => updateVideo(video.id, 'category', e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium bg-white"
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

      
    </>
  );
}
