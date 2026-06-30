"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import QuillEditor from "@/components/QuillEditor";

export default function FAQEditor({ defaultItems = [] }: { defaultItems?: { question: string; answer: string }[] }) {
  const [items, setItems] = useState<{ id: string; question: string; answer: string }[]>(
    defaultItems.map((item, i) => ({
      id: `faq-${Date.now()}-${i}`,
      ...item
    }))
  );

  const addItem = () => {
    setItems([...items, { id: `faq-${Date.now()}`, question: "", answer: "" }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const moveItem = (index: number, direction: 1 | -1) => {
    if (index + direction < 0 || index + direction >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + direction];
    newItems[index + direction] = temp;
    setItems(newItems);
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="faq_count" value={items.length} />
      
      {items.map((item, index) => (
        <div key={item.id} className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm space-y-4 relative group">
          <div className="flex justify-between items-center">
            <h5 className="text-[14px] font-[800] text-[#002b5c] uppercase tracking-widest flex items-center gap-2">
              <span className="bg-[#007a87] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {index + 1}
              </span>
              FAQ Item
            </h5>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                className="p-1.5 text-slate-400 hover:text-[#007a87] hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-30"
              >
                <ChevronUp size={18} />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 1)}
                disabled={index === items.length - 1}
                className="p-1.5 text-slate-400 hover:text-[#007a87] hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-30"
              >
                <ChevronDown size={18} />
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2"
                title="Remove FAQ"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-[700] text-gray-700 uppercase tracking-wider">Question</label>
            <input
              type="text"
              name={`faq_q_${index}`}
              defaultValue={item.question}
              required
              placeholder="e.g. What are Head Neck Cancers?"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-[700] text-gray-700 uppercase tracking-wider">Answer</label>
            <QuillEditor name={`faq_a_${index}`} defaultValue={item.answer} />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-[#007a87] hover:border-[#007a87]/30 transition-all"
      >
        <Plus size={20} />
        Add FAQ Question
      </button>
    </div>
  );
}
