"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, FileText } from "lucide-react";

interface DynamicPage {
  id: string;
  title: string;
  slug: string;
  navbarMenu: string;
  status: boolean;
  createdAt: string;
}

export default function MenuPagesClient({ initialPages = [] }: { initialPages?: DynamicPage[] }) {
  const [pages, setPages] = useState<DynamicPage[]>(initialPages);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/dynamic-pages");
      const data = await response.json();
      if (Array.isArray(data)) {
        const filtered = data.filter((p: any) => ["Top Header", "Header", "Footer", "Footer Column 2"].includes(p.navbarMenu));
        setPages(filtered);
      } else {
        setPages([]);
      }
    } catch (error) {
      console.error("Failed to load menu pages:", error);
    }
  };

  const deletePage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this menu page?")) return;

    try {
      const response = await fetch(`/api/dynamic-pages/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Menu Page deleted successfully");
        setPages(prev => prev.filter(p => p.id !== id));
        fetchPages();
      } else {
        alert("Failed to delete menu page");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  const orderMap: Record<string, number> = {
    "Top Header": 1,
    "Header": 2,
    "Footer": 3,
    "Footer Column 2": 4
  };

  const topHeaderOrder: Record<string, number> = {
    "emergency": 1,
    "blood bank": 2,
    "pharmacy": 3,
    "ambulance": 4
  };

  const headerOrder: Record<string, number> = {
    "about us": 1,
    "patient & visitors": 2,
    "doctors & departments": 3,
    "research": 4,
    "academics": 5,
    "online facilities": 6,
    "careers": 7,
    "contact us": 8
  };

  const footerOrder: Record<string, number> = {
    "book appointment": 1,
    "testimonials": 2,
    "photo gallery": 3,
    "video gallery": 4
  };

  const footer2Order: Record<string, number> = {
    "event/news": 1,
    "opd schedule": 2,
    "ec approval": 3,
    "site map": 4,
    "disclaimer": 5
  };

  const filteredPages = pages
    .filter((page) =>
      (page.title || "").toLowerCase().includes(search.toLowerCase()) || 
      (page.navbarMenu || "N/A").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const orderA = orderMap[a.navbarMenu || "N/A"] || 99;
      const orderB = orderMap[b.navbarMenu || "N/A"] || 99;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }

      if (a.navbarMenu === "Top Header" && b.navbarMenu === "Top Header") {
        const titleA = topHeaderOrder[a.title.toLowerCase()] || 99;
        const titleB = topHeaderOrder[b.title.toLowerCase()] || 99;
        return titleA - titleB;
      }

      if (a.navbarMenu === "Header" && b.navbarMenu === "Header") {
        const titleA = headerOrder[a.title.toLowerCase()] || 99;
        const titleB = headerOrder[b.title.toLowerCase()] || 99;
        return titleA - titleB;
      }

      if (a.navbarMenu === "Footer" && b.navbarMenu === "Footer") {
        const titleA = footerOrder[a.title.toLowerCase()] || 99;
        const titleB = footerOrder[b.title.toLowerCase()] || 99;
        return titleA - titleB;
      }

      if (a.navbarMenu === "Footer Column 2" && b.navbarMenu === "Footer Column 2") {
        const titleA = footer2Order[a.title.toLowerCase()] || 99;
        const titleB = footer2Order[b.title.toLowerCase()] || 99;
        return titleA - titleB;
      }
      
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Top-Level Menu Pages</h1>
          <p className="text-slate-500">Manage pages that appear directly in your headers and footer</p>
        </div>
        <Link
          href="/admin/menu-pages/new"
          className="bg-[#002b5c] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#001a38] transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Menu Page
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              suppressHydrationWarning={true}
              type="text"
              placeholder="Search menus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Page Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">URL Slug</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Created Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Loading pages...
                  </td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No top-level menu pages found
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/menu-pages/${page.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{page.title}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {page.navbarMenu || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-500 text-sm">/{page.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          page.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {page.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500" suppressHydrationWarning>
                      {page.createdAt ? new Date(page.createdAt).toLocaleDateString('en-GB') : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/menu-pages/${page.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => deletePage(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
