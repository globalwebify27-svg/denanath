"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  // Medical
  HeartPulse, Activity, Pill, Scissors, Stethoscope, Brain, Eye, Bone, Dna, Baby,
  Thermometer, Droplet, Syringe, Microscope, Heart, ShieldAlert,
  // General / Utilities
  Home, Shield, Star, Bookmark, FileText, Calendar, Clock, Phone, Mail, MapPin,
  Building, CheckCircle, AlertCircle, Info, HelpCircle, Search, Settings, User,
  Users, Share2, Download, Upload, List, Grid, Image, Video, Layers, Link, Map,
  Lock, Unlock, Key, Check, Plus, Minus, Trash2, Edit3, Clipboard, Award,
  TrendingUp, Globe, HeartHandshake, Sparkles, Accessibility, FileSpreadsheet,
  Hand, Lightbulb, Compass, Send, ChevronDown, Leaf, Flame, Utensils, BookOpen
} from "lucide-react";

// Register icons in a lookup map
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  HeartPulse, Activity, Pill, Scissors, Stethoscope, Brain, Eye, Bone, Dna, Baby,
  Thermometer, Droplet, Syringe, Microscope, Heart, ShieldAlert,
  Home, Shield, Star, Bookmark, FileText, Calendar, Clock, Phone, Mail, MapPin,
  Building, CheckCircle, AlertCircle, Info, HelpCircle, Search, Settings, User,
  Users, Share2, Download, Upload, List, Grid, Image, Video, Layers, Link, Map,
  Lock, Unlock, Key, Check, Plus, Minus, Trash2, Edit3, Clipboard, Award,
  TrendingUp, Globe, HeartHandshake, Sparkles, Accessibility, FileSpreadsheet,
  Hand, Lightbulb, Compass, Send, Leaf, Flame, Utensils, BookOpen
};

interface IconItem {
  name: string;
  category: "Medical" | "General";
}

const AVAILABLE_ICONS: IconItem[] = [
  // Medical / Clinical
  { name: "HeartPulse", category: "Medical" },
  { name: "Activity", category: "Medical" },
  { name: "Pill", category: "Medical" },
  { name: "Scissors", category: "Medical" },
  { name: "Stethoscope", category: "Medical" },
  { name: "Brain", category: "Medical" },
  { name: "Eye", category: "Medical" },
  { name: "Bone", category: "Medical" },
  { name: "Dna", category: "Medical" },
  { name: "Baby", category: "Medical" },
  { name: "Thermometer", category: "Medical" },
  { name: "Droplet", category: "Medical" },
  { name: "Syringe", category: "Medical" },
  { name: "Microscope", category: "Medical" },
  { name: "Heart", category: "Medical" },
  { name: "Leaf", category: "Medical" },
  { name: "Utensils", category: "Medical" },

  // General & Utilities
  { name: "Home", category: "General" },
  { name: "Shield", category: "General" },
  { name: "ShieldAlert", category: "General" },
  { name: "Star", category: "General" },
  { name: "Bookmark", category: "General" },
  { name: "FileText", category: "General" },
  { name: "Calendar", category: "General" },
  { name: "Clock", category: "General" },
  { name: "Phone", category: "General" },
  { name: "Mail", category: "General" },
  { name: "MapPin", category: "General" },
  { name: "Building", category: "General" },
  { name: "CheckCircle", category: "General" },
  { name: "AlertCircle", category: "General" },
  { name: "Info", category: "General" },
  { name: "HelpCircle", category: "General" },
  { name: "Search", category: "General" },
  { name: "Settings", category: "General" },
  { name: "User", category: "General" },
  { name: "Users", category: "General" },
  { name: "Share2", category: "General" },
  { name: "Download", category: "General" },
  { name: "Upload", category: "General" },
  { name: "List", category: "General" },
  { name: "Grid", category: "General" },
  { name: "Image", category: "General" },
  { name: "Video", category: "General" },
  { name: "Layers", category: "General" },
  { name: "Link", category: "General" },
  { name: "Map", category: "General" },
  { name: "Lock", category: "General" },
  { name: "Unlock", category: "General" },
  { name: "Key", category: "General" },
  { name: "Plus", category: "General" },
  { name: "Minus", category: "General" },
  { name: "Trash2", category: "General" },
  { name: "Edit3", category: "General" },
  { name: "Clipboard", category: "General" },
  { name: "Award", category: "General" },
  { name: "TrendingUp", category: "General" },
  { name: "Globe", category: "General" },
  { name: "HeartHandshake", category: "General" },
  { name: "Sparkles", category: "General" },
  { name: "Accessibility", category: "General" },
  { name: "FileSpreadsheet", category: "General" },
  { name: "Hand", category: "General" },
  { name: "Lightbulb", category: "General" },
  { name: "Compass", category: "General" },
  { name: "Send", category: "General" },
  { name: "Flame", category: "General" },
  { name: "BookOpen", category: "General" }
];

interface IconPickerProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export default function IconPicker({ name, defaultValue = "", placeholder = "Select an icon" }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Medical" | "General">("All");
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter icons based on search query and category selection
  const filteredIcons = AVAILABLE_ICONS.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const SelectedIconComponent = iconMap[selectedIcon] || null;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input to pass value in native forms */}
      <input type="hidden" name={name} value={selectedIcon} />

      {/* Trigger Button/Field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all focus-within:ring-2 focus-within:ring-[#007a87]/20 focus-within:border-[#007a87]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-slate-700 shadow-sm">
            {SelectedIconComponent ? (
              <SelectedIconComponent size={18} className="text-[#007a87]" />
            ) : (
              <HelpCircle size={18} className="text-gray-300" />
            )}
          </div>
          <span className={`text-[14px] font-[500] ${selectedIcon ? "text-gray-800" : "text-gray-400"}`}>
            {selectedIcon || placeholder}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-150 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          
          {/* Header Search & Category Filter */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-[500] focus:outline-none focus:border-[#007a87] transition-all"
                autoFocus
              />
            </div>
            
            <div className="flex gap-1.5">
              {(["All", "Medical", "General"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-md text-[11px] font-[700] uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#007a87] text-white"
                      : "bg-white text-gray-500 border border-gray-250 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Icons Grid */}
          <div className="max-h-60 overflow-y-auto p-4 custom-scrollbar">
            {filteredIcons.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {filteredIcons.map((iconItem) => {
                  const CurrentIcon = iconMap[iconItem.name];
                  if (!CurrentIcon) return null;
                  
                  const isSelected = selectedIcon === iconItem.name;

                  return (
                    <button
                      key={iconItem.name}
                      type="button"
                      onClick={() => {
                        setSelectedIcon(iconItem.name);
                        setIsOpen(false);
                      }}
                      title={iconItem.name}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all aspect-square border ${
                        isSelected
                          ? "bg-[#007a87]/10 border-[#007a87] text-[#007a87]"
                          : "border-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                      }`}
                    >
                      <CurrentIcon size={20} className={isSelected ? "stroke-[2.5px]" : "stroke-[1.8px]"} />
                      <span className="text-[9px] font-[600] mt-1 text-center truncate w-full text-gray-400">
                        {iconItem.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-[13px] font-[500]">
                No icons found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
