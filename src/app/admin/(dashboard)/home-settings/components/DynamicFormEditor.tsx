"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";
import IconPicker from "@/components/IconPicker";

export default function DynamicFormEditor({
  value,
  onChange,
  label = "Configuration Data",
}: {
  value: any;
  onChange: (newVal: any) => void;
  label?: string;
}) {

  // Helper to deep set value
  const updateField = (path: (string | number)[], val: any) => {
    const newData = Array.isArray(value) ? [...value] : { ...value };
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (Array.isArray(current[key])) {
        current[key] = [...current[key]];
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }
    current[path[path.length - 1]] = val;
    onChange(newData);
  };

  const addArrayItem = (path: (string | number)[], templateItem: any) => {
    const newData = Array.isArray(value) ? [...value] : { ...value };
    let current = newData;
    if (path.length === 0) {
      newData.push(templateItem);
      onChange(newData);
      return;
    }
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (Array.isArray(current[key])) {
        current[key] = [...current[key]];
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }
    const lastKey = path[path.length - 1];
    current[lastKey] = [...current[lastKey], templateItem];
    onChange(newData);
  };

  const removeArrayItem = (path: (string | number)[], indexToRemove: number) => {
    const newData = Array.isArray(value) ? [...value] : { ...value };
    let current = newData;
    if (path.length === 0) {
       newData.splice(indexToRemove, 1);
       onChange(newData);
       return;
    }
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (Array.isArray(current[key])) {
        current[key] = [...current[key]];
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }
    const lastKey = path[path.length - 1];
    const newArray = [...current[lastKey]];
    newArray.splice(indexToRemove, 1);
    current[lastKey] = newArray;
    onChange(newData);
  };

  const renderField = (key: string | number, value: any, path: (string | number)[]) => {
    if (['activeClass', 'inactiveClass', 'colorTheme', 'ctaText', 'ctaLink', 'avatar'].includes(String(key))) return null;

    const isString = typeof value === "string";
    const isNumber = typeof value === "number";
    const isBoolean = typeof value === "boolean";
    const isArray = Array.isArray(value);
    const isObject = typeof value === "object" && value !== null && !isArray;

    const labelStr = typeof key === "number" ? `Item ${key + 1}` : key;

    if (isString || isNumber) {
      const isImageField = isString && (
        ['src', 'image', 'icon', 'photo', 'avatar', 'logo'].includes(String(key).toLowerCase()) ||
        (path.length >= 2 && (String(path[path.length - 2]).toLowerCase().includes('image') || String(path[path.length - 2]).toLowerCase().includes('logo')))
      );
      
      if (isImageField) {
        return (
          <div key={path.join("-")} className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
              {String(labelStr).replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {value && (
                <div className="shrink-0 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                </div>
              )}
              <div className="flex-1 min-w-0 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const uploadData = new FormData();
                      uploadData.append('file', file);
                      fetch('/api/upload', {
                        method: 'POST',
                        body: uploadData
                      })
                      .then(res => res.json())
                      .then(data => {
                        if (data.url) {
                          updateField(path, data.url);
                        } else { alert('Upload failed'); }
                      })
                      .catch(err => {
                        console.error('Upload error:', err);
                        alert('Upload error');
                      });
                    }
                  }}
                  className="flex-1 w-full p-2 border border-slate-200 bg-white rounded-lg focus:ring-2 focus:ring-[#007a87] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                />
                {value && (
                  <button
                    onClick={() => updateField(path, "")}
                    className="shrink-0 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => updateField(path, e.target.value)}
              className="mt-2 w-full text-xs text-slate-500 bg-slate-50 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none"
              placeholder="Or enter image URL directly..."
            />
          </div>
        );
      }

      const isTitleField = isString && String(key).toLowerCase() === 'title';
      const isIconStringField = isString && String(key).toLowerCase().includes('iconstring');
      // Use textarea if the string is long or contains HTML, but exclude title field
      const useTextArea = isString && !isTitleField && (value.length > 50 || value.includes("<"));
      const isRichTextField = isString && ['overview', 'content', 'details'].includes(String(key).toLowerCase());
      const isColorField = isString && ['bgcolor', 'hovercolor', 'backgroundcolor', 'themecolor', 'color', 'theme', 'bgcolorfrom', 'bgcolorto'].includes(String(key).toLowerCase());

      const commonIcons = [
        "Activity", "Ambulance", "ArrowRight", "Baby", "Bandage", "Bone", "Brain", "Cross", 
        "Dumbbell", "Ear", "Eye", "Footprints", "Heart", "HeartPulse", "Hospital", "Microscope", 
        "Mic", "Mountain", "Pill", "Stethoscope", "Syringe", "Thermometer", "User", "Users"
      ];

      return (
        <div key={path.join("-")} className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
            {String(labelStr).replace(/([A-Z])/g, ' $1').trim()}
          </label>
          {isRichTextField ? (
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <QuillEditor
                value={value}
                onChange={(val) => updateField(path, val)}
              />
            </div>
          ) : useTextArea ? (
            <textarea
              value={value}
              onChange={(e) => updateField(path, e.target.value)}
              className="w-full text-sm bg-slate-50 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none min-h-[100px]"
            />
          ) : isColorField ? (
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value}
                onChange={(e) => updateField(path, e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateField(path, e.target.value)}
                className="flex-1 text-sm bg-slate-50 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none"
                placeholder="#000000"
              />
            </div>
          ) : isIconStringField ? (
             <div className="w-full">
               <IconPicker 
                 name="iconString" 
                 defaultValue={value} 
                 onChange={(newIcon) => updateField(path, newIcon)} 
                 placeholder="Select Icon..." 
               />
             </div>
          ) : String(key).toLowerCase() === 'date' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                type="date"
                value={typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ""}
                onChange={(e) => updateField(path, e.target.value)}
                className="w-full sm:w-48 text-sm bg-slate-50 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none"
              />
              <span className="text-sm text-slate-400 font-medium hidden sm:inline">OR</span>
              <input
                type="text"
                value={value}
                onChange={(e) => updateField(path, e.target.value)}
                placeholder="Custom text (e.g. Recent)"
                className="flex-1 w-full text-sm bg-slate-50 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none"
              />
            </div>
          ) : (
            <input
              type={isNumber ? "number" : "text"}
              value={value}
              onChange={(e) =>
                updateField(path, isNumber ? Number(e.target.value) : e.target.value)
              }
              className="w-full text-sm bg-slate-50 p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] outline-none"
            />
          )}
        </div>
      );
    }

    if (isBoolean) {
      return (
        <div key={path.join("-")} className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => updateField(path, e.target.checked)}
            className="w-4 h-4 text-[#007a87] border-slate-300 rounded focus:ring-[#007a87]"
          />
          <label className="text-sm font-semibold text-slate-700 capitalize">
            {String(labelStr).replace(/([A-Z])/g, ' $1').trim()}
          </label>
        </div>
      );
    }

    if (isArray) {
      // Find template object by taking first element or creating empty one
      const templateItem = value.length > 0 
        ? JSON.parse(JSON.stringify(value[0]))
        : {};
        
      // clear string/num fields in template
      const clearValues = (obj: any) => {
        if (typeof obj === 'string') return '';
        if (typeof obj === 'number') return 0;
        if (typeof obj === 'boolean') return false;
        if (Array.isArray(obj)) return obj.map(clearValues);
        if (typeof obj === 'object' && obj !== null) {
          const newObj: any = {};
          for (const k in obj) newObj[k] = clearValues(obj[k]);
          return newObj;
        }
        return obj;
      };
      const cleanTemplate = clearValues(templateItem);

      return (
        <div key={path.join("-")} className="mb-6 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h4 className="font-bold text-slate-800 capitalize">
              {String(labelStr).replace(/([A-Z])/g, ' $1').trim()} ({value.length})
            </h4>
            <button 
              onClick={() => addArrayItem(path, cleanTemplate)}
              className="text-xs bg-white border border-slate-300 px-2.5 py-1.5 rounded flex items-center gap-1 hover:bg-slate-50 font-medium text-slate-700"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div className="p-4 bg-slate-50 space-y-4">
            {value.map((item: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 relative group shadow-sm">
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
                <div className="pr-8">
                  {renderField(index, item, [...path, index])}
                </div>
              </div>
            ))}
            {value.length === 0 && (
              <p className="text-sm text-slate-500 italic text-center py-4">No items yet.</p>
            )}
          </div>
        </div>
      );
    }

    if (isObject) {
      return (
        <div key={path.join("-")} className="mb-4">
          {typeof key === 'string' && (
             <h4 className="font-bold text-slate-800 mb-3 capitalize border-b pb-2">
               {String(labelStr).replace(/([A-Z])/g, ' $1').trim()}
             </h4>
          )}
          <div className={`${typeof key === 'number' ? '' : 'pl-2'}`}>
            {Object.keys(value).map((subKey) => {
              if (subKey === 'pos') return null; // hide pos completely
              return renderField(subKey, value[subKey], [...path, subKey]);
            })}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="space-y-2">
        {value && typeof value === 'object' && !Array.isArray(value) ? (
          Object.keys(value).map((key) => {
            if (key === 'pos') return null;
            return renderField(key, value[key], [key]);
          })
        ) : (
          <p className="text-sm text-slate-500 italic">Unsupported data format.</p>
        )}
      </div>
    </div>
  );
}
