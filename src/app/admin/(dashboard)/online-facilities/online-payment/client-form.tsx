"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";

export default function OnlinePaymentClientForm({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);

  return (
    <div className="space-y-8">
      <input type="hidden" name="pageJson" value={JSON.stringify(data)} />

      <div className="space-y-4">
        <h2 className="text-xl text-[20px] font-black text-[#002b5c] border-b pb-2">Page Content</h2>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Page Title</label>
          <input 
            type="text" 
            value={data.pageTitle}
            onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#007a87] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Security Badge Text</label>
          <input 
            type="text" 
            value={data.securityText}
            onChange={(e) => setData({ ...data, securityText: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#007a87] focus:outline-none"
          />
        </div>
      </div>

    </div>
  );
}
