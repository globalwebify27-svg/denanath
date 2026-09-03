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

export default function DynamicPagesClient({ initialPages = [] }: { initialPages?: DynamicPage[] }) {
  const [pages, setPages] = useState<DynamicPage[]>(initialPages);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/dynamic-pages");
      const data = await response.json();
      if (Array.isArray(data)) {
        const filtered = data.filter(p => !["Top Header", "Header", "Footer", "Footer Column 2"].includes(p.navbarMenu));
        setPages(filtered);
      } else {
        setPages([]);
      }
    } catch (error) {
      console.error("Failed to load pages:", error);
    }
  };

  const deletePage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;

    try {
      const response = await fetch(`/api/dynamic-pages/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Page deleted successfully");
        setPages(prev => prev.filter(p => p.id !== id));
        fetchPages();
      } else {
        alert("Failed to delete page");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(search.toLowerCase()) || 
    page.navbarMenu.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dynamic Pages</h1>
          <p className="text-slate-500">Manage custom pages added to your Navbar menus</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="bg-[#002b5c] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#001a38] transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Page
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-xl">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              suppressHydrationWarning={true}
              type="text"
              placeholder="Search pages..."
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Navbar Menu</th>
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
                    No pages found
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/pages/${page.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
                        {page.navbarMenu}
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
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {page.createdAt ? new Date(page.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/pages/${page.id}`}
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
