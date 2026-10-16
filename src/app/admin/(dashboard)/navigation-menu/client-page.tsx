"use client";

import React, { useState } from "react";
import {
  Menu,
  Plus,
  Trash2,
  Edit2,
  Save,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  FolderTree,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Layers,
  CornerDownRight,
  HelpCircle,
  ExternalLink,
  GitCommit,
} from "lucide-react";
import { baseNavLinks } from "@/lib/navConfig";

interface SubSubMenuItem {
  name: string;
  href: string;
  isActive?: boolean;
}

interface SubMenuItem {
  name: string;
  href: string;
  isActive?: boolean;
  dropdown?: SubSubMenuItem[];
}

interface MenuItem {
  name: string;
  href: string;
  isActive?: boolean;
  dropdown?: SubMenuItem[];
}

interface ClientPageProps {
  initialMenus: MenuItem[];
  headerMeta: {
    logo: string;
    yearsImage: string;
    isActive: boolean;
  };
}

export default function NavigationMenuClient({
  initialMenus,
  headerMeta,
}: ClientPageProps) {
  const [menus, setMenus] = useState<MenuItem[]>(() =>
    initialMenus.map((m) => ({
      name: m.name || "",
      href: m.href || "#",
      isActive: m.isActive !== false,
      dropdown: Array.isArray(m.dropdown)
        ? m.dropdown.map((sub) => ({
            name: sub.name || "",
            href: sub.href || "#",
            isActive: sub.isActive !== false,
            dropdown: Array.isArray(sub.dropdown)
              ? sub.dropdown.map((ss) => ({
                  name: ss.name || "",
                  href: ss.href || "#",
                  isActive: ss.isActive !== false,
                }))
              : [],
          }))
        : [],
    }))
  );

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Track expanded parent dropdowns (all open by default)
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    initialMenus.forEach((_, idx) => {
      init[idx] = true;
    });
    return init;
  });

  // Track expanded Level 2 sub-items (all open by default)
  const [expandedSubItems, setExpandedSubItems] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    initialMenus.forEach((m, idx) => {
      if (Array.isArray(m.dropdown)) {
        m.dropdown.forEach((_, sIdx) => {
          init[`${idx}-${sIdx}`] = true;
        });
      }
    });
    return init;
  });

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingTarget, setEditingTarget] = useState<{
    parentIdx?: number;
    subIdx?: number;
    subSubIdx?: number;
  }>({});

  const [itemForm, setItemForm] = useState<{
    name: string;
    href: string;
    isActive: boolean;
    placement: "nav" | "submenu" | "subsubmenu";
    targetParentIdx: number;
    targetSubIdx: number;
  }>({
    name: "",
    href: "",
    isActive: true,
    placement: "nav",
    targetParentIdx: 0,
    targetSubIdx: 0,
  });

  // Modal State for Move to Sub-menu
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [movingItem, setMovingItem] = useState<{
    sourceType: "top" | "sub";
    parentIdx: number;
    subIdx?: number;
    itemName: string;
  } | null>(null);
  const [selectedTargetParent, setSelectedTargetParent] = useState<number>(0);

  const toggleExpand = (idx: number) => {
    setExpandedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSubExpand = (parentIdx: number, subIdx: number) => {
    const key = `${parentIdx}-${subIdx}`;
    setExpandedSubItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const nextParents: Record<number, boolean> = {};
    const nextSubs: Record<string, boolean> = {};
    menus.forEach((m, idx) => {
      nextParents[idx] = true;
      if (Array.isArray(m.dropdown)) {
        m.dropdown.forEach((_, sIdx) => {
          nextSubs[`${idx}-${sIdx}`] = true;
        });
      }
    });
    setExpandedItems(nextParents);
    setExpandedSubItems(nextSubs);
  };

  const collapseAll = () => {
    setExpandedItems({});
    setExpandedSubItems({});
  };

  // --- ACTIONS: LEVEL 1 TOP-LEVEL MENUS ---

  const moveTop = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= menus.length) return;
    const updated = [...menus];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    setMenus(updated);
    setIsDirty(true);
  };

  const toggleTopActive = (index: number) => {
    const updated = [...menus];
    updated[index] = {
      ...updated[index],
      isActive: updated[index].isActive === false ? true : false,
    };
    setMenus(updated);
    setIsDirty(true);
  };

  const deleteTop = (index: number) => {
    const target = menus[index];
    const childCount = target.dropdown?.length || 0;
    const msg =
      childCount > 0
        ? `Are you sure you want to delete "${target.name}"? It contains ${childCount} sub-menu item(s) which will also be removed.`
        : `Are you sure you want to delete "${target.name}"?`;
    if (!window.confirm(msg)) return;

    const updated = [...menus];
    updated.splice(index, 1);
    setMenus(updated);
    setIsDirty(true);
  };

  // --- ACTIONS: LEVEL 2 SUB-MENU ITEMS ---

  const moveSub = (parentIdx: number, subIdx: number, direction: "up" | "down") => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    const newIdx = direction === "up" ? subIdx - 1 : subIdx + 1;
    if (newIdx < 0 || newIdx >= dropdown.length) return;

    const [moved] = dropdown.splice(subIdx, 1);
    dropdown.splice(newIdx, 0, moved);

    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
  };

  const toggleSubActive = (parentIdx: number, subIdx: number) => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    dropdown[subIdx] = {
      ...dropdown[subIdx],
      isActive: dropdown[subIdx].isActive === false ? true : false,
    };

    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
  };

  const deleteSub = (parentIdx: number, subIdx: number) => {
    const parent = menus[parentIdx];
    const target = parent.dropdown?.[subIdx];
    const childCount = target?.dropdown?.length || 0;
    const msg =
      childCount > 0
        ? `Are you sure you want to delete sub-menu item "${target?.name}"? It contains ${childCount} sub-sub-item(s) which will also be removed.`
        : `Are you sure you want to delete sub-menu item "${target?.name}"?`;
    if (!window.confirm(msg)) return;

    const dropdown = [...(parent.dropdown || [])];
    dropdown.splice(subIdx, 1);

    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
  };

  // --- ACTIONS: LEVEL 3 SUB-SUB-MENU ITEMS ---

  const moveSubSub = (
    parentIdx: number,
    subIdx: number,
    subSubIdx: number,
    direction: "up" | "down"
  ) => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    const sub = dropdown[subIdx];
    const subDropdown = [...(sub.dropdown || [])];

    const newIdx = direction === "up" ? subSubIdx - 1 : subSubIdx + 1;
    if (newIdx < 0 || newIdx >= subDropdown.length) return;

    const [moved] = subDropdown.splice(subSubIdx, 1);
    subDropdown.splice(newIdx, 0, moved);

    dropdown[subIdx] = { ...sub, dropdown: subDropdown };
    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
  };

  const toggleSubSubActive = (parentIdx: number, subIdx: number, subSubIdx: number) => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    const sub = dropdown[subIdx];
    const subDropdown = [...(sub.dropdown || [])];

    subDropdown[subSubIdx] = {
      ...subDropdown[subSubIdx],
      isActive: subDropdown[subSubIdx].isActive === false ? true : false,
    };

    dropdown[subIdx] = { ...sub, dropdown: subDropdown };
    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
  };

  const deleteSubSub = (parentIdx: number, subIdx: number, subSubIdx: number) => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    const sub = dropdown[subIdx];
    const target = sub.dropdown?.[subSubIdx];
    if (!window.confirm(`Are you sure you want to delete sub-sub-menu item "${target?.name}"?`)) return;

    const subDropdown = [...(sub.dropdown || [])];
    subDropdown.splice(subSubIdx, 1);

    dropdown[subIdx] = { ...sub, dropdown: subDropdown };
    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
  };

  // --- PROMOTE LEVEL 2 -> LEVEL 1 (SUB-MENU -> TOP-NAV) ---
  const promoteToNav = (parentIdx: number, subIdx: number) => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    const [promoted] = dropdown.splice(subIdx, 1);

    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };

    const newTopItem: MenuItem = {
      name: promoted.name,
      href: promoted.href,
      isActive: promoted.isActive !== false,
      dropdown: promoted.dropdown || [],
    };
    updated.splice(parentIdx + 1, 0, newTopItem);

    setMenus(updated);
    setIsDirty(true);
    setSuccessMsg(`"${promoted.name}" was promoted to the Main Navbar!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // --- PROMOTE LEVEL 3 -> LEVEL 2 (SUB-SUB -> SUB-MENU) ---
  const promoteSubSubToSub = (parentIdx: number, subIdx: number, subSubIdx: number) => {
    const parent = menus[parentIdx];
    const dropdown = [...(parent.dropdown || [])];
    const sub = dropdown[subIdx];
    const subDropdown = [...(sub.dropdown || [])];
    const [promoted] = subDropdown.splice(subSubIdx, 1);

    dropdown[subIdx] = { ...sub, dropdown: subDropdown };

    const newSubItem: SubMenuItem = {
      name: promoted.name,
      href: promoted.href,
      isActive: promoted.isActive !== false,
      dropdown: [],
    };
    dropdown.splice(subIdx + 1, 0, newSubItem);

    const updated = [...menus];
    updated[parentIdx] = { ...parent, dropdown };
    setMenus(updated);
    setIsDirty(true);
    setSuccessMsg(`"${promoted.name}" was promoted to Level 2 Sub-menu!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // --- OPEN MOVE TO SUB-MENU DIALOG ---
  const openMoveModal = (
    sourceType: "top" | "sub",
    parentIdx: number,
    subIdx?: number,
    itemName?: string
  ) => {
    setMovingItem({
      sourceType,
      parentIdx,
      subIdx,
      itemName: itemName || (sourceType === "top" ? menus[parentIdx].name : menus[parentIdx].dropdown?.[subIdx!]?.name || "Item"),
    });

    const availableParents = menus
      .map((m, idx) => ({ idx, name: m.name }))
      .filter((m) => (sourceType === "top" ? m.idx !== parentIdx : true));

    setSelectedTargetParent(availableParents[0]?.idx ?? 0);
    setMoveModalOpen(true);
  };

  // --- EXECUTE MOVE TO SUB-MENU ---
  const executeMoveToSubmenu = () => {
    if (!movingItem) return;

    const targetParentIdx = selectedTargetParent;
    if (targetParentIdx < 0 || targetParentIdx >= menus.length) return;

    const updated = [...menus];

    if (movingItem.sourceType === "top") {
      const sourceTop = updated[movingItem.parentIdx];
      const existingChildren = sourceTop.dropdown || [];

      updated.splice(movingItem.parentIdx, 1);

      const realTargetIdx =
        movingItem.parentIdx < targetParentIdx ? targetParentIdx - 1 : targetParentIdx;

      const targetParent = updated[realTargetIdx];
      const targetDropdown = [...(targetParent.dropdown || [])];

      targetDropdown.push({
        name: sourceTop.name,
        href: sourceTop.href,
        isActive: sourceTop.isActive !== false,
        dropdown: existingChildren,
      });

      updated[realTargetIdx] = {
        ...targetParent,
        dropdown: targetDropdown,
      };

      setMenus(updated);
      setIsDirty(true);
      setSuccessMsg(
        `"${sourceTop.name}" moved to sub-menu under "${targetParent.name}"!`
      );
    } else {
      const sourceParent = updated[movingItem.parentIdx];
      const sourceDropdown = [...(sourceParent.dropdown || [])];
      const [itemToMove] = sourceDropdown.splice(movingItem.subIdx!, 1);

      updated[movingItem.parentIdx] = {
        ...sourceParent,
        dropdown: sourceDropdown,
      };

      const targetParent = updated[targetParentIdx];
      const targetDropdown = [...(targetParent.dropdown || []), itemToMove];

      updated[targetParentIdx] = {
        ...targetParent,
        dropdown: targetDropdown,
      };

      setMenus(updated);
      setIsDirty(true);
      setSuccessMsg(
        `"${itemToMove.name}" moved to sub-menu under "${targetParent.name}"!`
      );
    }

    setMoveModalOpen(false);
    setMovingItem(null);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // --- OPEN ADD / EDIT MODAL ---
  const openAddModal = (
    defaultPlacement: "nav" | "submenu" | "subsubmenu" = "nav",
    defaultParentIdx = 0,
    defaultSubIdx = 0
  ) => {
    setModalMode("add");
    setEditingTarget({});
    setItemForm({
      name: "",
      href: "",
      isActive: true,
      placement: defaultPlacement,
      targetParentIdx: defaultParentIdx,
      targetSubIdx: defaultSubIdx,
    });
    setModalOpen(true);
  };

  const openEditModal = (parentIdx: number, subIdx?: number, subSubIdx?: number) => {
    setModalMode("edit");
    setEditingTarget({ parentIdx, subIdx, subSubIdx });

    if (subSubIdx !== undefined && subIdx !== undefined) {
      // Editing Level 3 Sub-Sub-Item
      const subSub = menus[parentIdx].dropdown?.[subIdx]?.dropdown?.[subSubIdx];
      if (!subSub) return;
      setItemForm({
        name: subSub.name,
        href: subSub.href,
        isActive: subSub.isActive !== false,
        placement: "subsubmenu",
        targetParentIdx: parentIdx,
        targetSubIdx: subIdx,
      });
    } else if (subIdx !== undefined) {
      // Editing Level 2 Sub-Menu Item
      const sub = menus[parentIdx].dropdown?.[subIdx];
      if (!sub) return;
      setItemForm({
        name: sub.name,
        href: sub.href,
        isActive: sub.isActive !== false,
        placement: "submenu",
        targetParentIdx: parentIdx,
        targetSubIdx: 0,
      });
    } else {
      // Editing Level 1 Top-Level Menu
      const top = menus[parentIdx];
      setItemForm({
        name: top.name,
        href: top.href,
        isActive: top.isActive !== false,
        placement: "nav",
        targetParentIdx: 0,
        targetSubIdx: 0,
      });
    }
    setModalOpen(true);
  };

  // --- SAVE ITEM FROM MODAL ---
  const handleSaveModalItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name.trim() || !itemForm.href.trim()) {
      alert("Both Name and URL are required.");
      return;
    }

    const updated = [...menus];

    if (modalMode === "add") {
      if (itemForm.placement === "nav") {
        // Add as Level 1 Top-Level Navbar item
        updated.push({
          name: itemForm.name.trim(),
          href: itemForm.href.trim(),
          isActive: itemForm.isActive,
          dropdown: [],
        });
      } else if (itemForm.placement === "submenu") {
        // Add as Level 2 Sub-menu item
        const pIdx = itemForm.targetParentIdx;
        if (updated[pIdx]) {
          const parent = updated[pIdx];
          const dropdown = [
            ...(parent.dropdown || []),
            {
              name: itemForm.name.trim(),
              href: itemForm.href.trim(),
              isActive: itemForm.isActive,
              dropdown: [],
            },
          ];
          updated[pIdx] = { ...parent, dropdown };
        }
      } else if (itemForm.placement === "subsubmenu") {
        // Add as Level 3 Sub-sub-menu item
        const pIdx = itemForm.targetParentIdx;
        const sIdx = itemForm.targetSubIdx;
        if (updated[pIdx] && updated[pIdx].dropdown?.[sIdx]) {
          const parent = updated[pIdx];
          const dropdown = [...(parent.dropdown || [])];
          const sub = dropdown[sIdx];
          const subDropdown = [
            ...(sub.dropdown || []),
            {
              name: itemForm.name.trim(),
              href: itemForm.href.trim(),
              isActive: itemForm.isActive,
            },
          ];
          dropdown[sIdx] = { ...sub, dropdown: subDropdown };
          updated[pIdx] = { ...parent, dropdown };
        }
      }
    } else {
      // Edit mode
      const { parentIdx, subIdx, subSubIdx } = editingTarget;
      if (parentIdx !== undefined && subIdx !== undefined && subSubIdx !== undefined) {
        // Level 3 Edit
        const parent = updated[parentIdx];
        const dropdown = [...(parent.dropdown || [])];
        const sub = dropdown[subIdx];
        const subDropdown = [...(sub.dropdown || [])];
        subDropdown[subSubIdx] = {
          ...subDropdown[subSubIdx],
          name: itemForm.name.trim(),
          href: itemForm.href.trim(),
          isActive: itemForm.isActive,
        };
        dropdown[subIdx] = { ...sub, dropdown: subDropdown };
        updated[parentIdx] = { ...parent, dropdown };
      } else if (parentIdx !== undefined && subIdx !== undefined) {
        // Level 2 Edit
        const parent = updated[parentIdx];
        const dropdown = [...(parent.dropdown || [])];
        dropdown[subIdx] = {
          ...dropdown[subIdx],
          name: itemForm.name.trim(),
          href: itemForm.href.trim(),
          isActive: itemForm.isActive,
        };
        updated[parentIdx] = { ...parent, dropdown };
      } else if (parentIdx !== undefined) {
        // Level 1 Edit
        updated[parentIdx] = {
          ...updated[parentIdx],
          name: itemForm.name.trim(),
          href: itemForm.href.trim(),
          isActive: itemForm.isActive,
        };
      }
    }

    setMenus(updated);
    setIsDirty(true);
    setModalOpen(false);
  };

  // --- RESTORE DEFAULTS ---
  const handleRestoreDefaults = () => {
    if (
      !window.confirm(
        "Are you sure you want to reset the navigation to default hospital settings? Any custom menu reordering or additions will be restored to original presets."
      )
    ) {
      return;
    }

    const resetMenus: MenuItem[] = baseNavLinks.map((link) => ({
      name: link.name,
      href: link.href,
      isActive: true,
      dropdown: link.dropdown
        ? link.dropdown.map((sub) => ({
            name: sub.name,
            href: sub.href,
            isActive: true,
            dropdown: [],
          }))
        : [],
    }));

    setMenus(resetMenus);
    setIsDirty(true);
    setSuccessMsg("Navigation structure reset to defaults. Click 'Save Changes' to apply to the website.");
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  // --- SAVE TO BACKEND ---
  const handleSaveAll = async () => {
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = {
        key: "layout_header",
        value: JSON.stringify({
          ...headerMeta,
          menus,
        }),
        pathsToRevalidate: ["/", "/admin/navigation-menu"],
      };

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save navigation settings");
      }

      setIsDirty(false);
      setSuccessMsg("Navigation menus saved successfully! The live website is updated.");
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Stats calculation
  const totalTop = menus.length;
  const totalSub = menus.reduce((acc, m) => acc + (m.dropdown?.length || 0), 0);
  const totalSubSub = menus.reduce(
    (acc, m) =>
      acc +
      (m.dropdown?.reduce((sAcc, s) => sAcc + (s.dropdown?.length || 0), 0) || 0),
    0
  );
  const totalActive =
    menus.filter((m) => m.isActive !== false).length +
    menus.reduce(
      (acc, m) =>
        acc +
        (m.dropdown?.filter((s) => s.isActive !== false).length || 0) +
        (m.dropdown?.reduce(
          (sAcc, s) =>
            sAcc + (s.dropdown?.filter((ss) => ss.isActive !== false).length || 0),
          0
        ) || 0),
      0
    );

  const filteredMenus = searchQuery.trim()
    ? menus.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.href.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.dropdown?.some(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.href.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.dropdown?.some(
                (ss) =>
                  ss.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  ss.href.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
      )
    : menus;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Banner / Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#007a87] border border-teal-200">
                Hospital Header Navigation
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                3-Level Hierarchy Supported
              </span>
              {isDirty && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                  Unsaved Changes
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-[#002b5c] tracking-tight">
              Navigation Menu Manager
            </h1>
            <p className="text-sm md:text-base font-medium text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Decide which menu items appear in the <strong>Top Navbar (Level 1)</strong>, in <strong>Sub-menus (Level 2)</strong>, or inside <strong>Sub-Sub Menus (Level 3 Flyout)</strong>.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <button
              onClick={handleRestoreDefaults}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-sm"
              title="Reset to default menu items"
            >
              <RotateCcw size={16} />
              Reset Defaults
            </button>

            <button
              onClick={() => openAddModal("nav")}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-sm shadow-sm"
            >
              <Plus size={16} />
              Add Menu Item
            </button>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm shadow-md ${
                isDirty
                  ? "bg-[#007a87] text-white hover:bg-[#00626d] shadow-teal-900/20 active:scale-95 animate-bounce-subtle"
                  : "bg-[#007a87]/90 text-white hover:bg-[#007a87]"
              }`}
            >
              <Save size={18} />
              {isSaving ? "Saving..." : isDirty ? "Save Changes *" : "Saved"}
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-100 text-sm">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Top Navbar (L1)</span>
            <span className="text-xl font-black text-[#002b5c]">{totalTop}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Sub-menus (L2)</span>
            <span className="text-xl font-black text-[#007a87]">{totalSub}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Sub-sub Menus (L3)</span>
            <span className="text-xl font-black text-purple-700">{totalSubSub}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Active Items</span>
            <span className="text-xl font-black text-emerald-600">{totalActive}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold block">Total Links</span>
            <span className="text-xl font-black text-slate-700">{totalTop + totalSub + totalSubSub}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center gap-3 border border-emerald-200 font-medium">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-800 rounded-2xl flex items-center gap-3 border border-red-200 font-medium">
          <AlertCircle size={20} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Instructions Help Box */}
      <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-4 text-xs md:text-sm text-blue-900 flex items-start gap-3">
        <HelpCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">How 3-Level Menu Hierarchy Works:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-blue-800">
            <li>
              <strong>Level 1 (Top Navbar)</strong>: Displays directly across the header bar.
            </li>
            <li>
              <strong>Level 2 (Sub-menu)</strong>: Displays in the main dropdown when hovering over a Level 1 menu.
            </li>
            <li>
              <strong>Level 3 (Sub-Sub Menu)</strong>: Displays as a clean <em>flyout submenu</em> when hovering over a Level 2 menu on desktop, or nested accordion on mobile.
            </li>
            <li>
              Promote or demote items between levels with 1 click using the <strong>Promote</strong> and <strong>Move to</strong> buttons.
            </li>
          </ul>
        </div>
      </div>

      {/* Filter / Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu or submenu items by name or path..."
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Menus List */}
      <div className="space-y-4">
        {filteredMenus.map((item) => {
          const idx = menus.findIndex((m) => m === item);
          const hasChildren = Array.isArray(item.dropdown) && item.dropdown.length > 0;
          const isExpanded = !!expandedItems[idx];
          const isItemActive = item.isActive !== false;

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                isItemActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              {/* LEVEL 1: TOP-LEVEL HEADER BAR */}
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#002b5c] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                    #{idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-extrabold text-base sm:text-lg text-[#002b5c]">
                        {item.name || "(Unnamed Menu)"}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                        Level 1 (Top Nav)
                      </span>
                      {hasChildren ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-[#007a87] border border-teal-200">
                          {item.dropdown!.length} Sub-menus
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          Direct Link (No Submenu)
                        </span>
                      )}
                      {!isItemActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          Hidden
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-mono">
                      <LinkIcon size={12} className="shrink-0 text-slate-400" />
                      <span className="truncate">{item.href || "#"}</span>
                    </div>
                  </div>
                </div>

                {/* Level 1 Actions Toolbar */}
                <div className="flex items-center flex-wrap gap-1.5 shrink-0">
                  {/* Reorder Up / Down */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 mr-1">
                    <button
                      onClick={() => moveTop(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                      title="Move Nav Item Left / Up"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      onClick={() => moveTop(idx, "down")}
                      disabled={idx === menus.length - 1}
                      className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                      title="Move Nav Item Right / Down"
                    >
                      <ArrowDown size={15} />
                    </button>
                  </div>

                  {/* Move to Submenu Button */}
                  {menus.length > 1 && (
                    <button
                      onClick={() => openMoveModal("top", idx, undefined, item.name)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1 transition-colors"
                      title="Demote this item into a sub-menu under another parent"
                    >
                      <CornerDownRight size={13} className="text-teal-600" />
                      Move to Sub-menu
                    </button>
                  )}

                  {/* Add Level 2 Sub-item */}
                  <button
                    onClick={() => openAddModal("submenu", idx)}
                    className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#007a87] font-bold text-xs flex items-center gap-1 transition-colors border border-teal-200"
                    title="Add a new sub-menu item under this menu"
                  >
                    <Plus size={13} />
                    Add Sub-menu
                  </button>

                  {/* Active / Inactive Toggle */}
                  <button
                    onClick={() => toggleTopActive(idx)}
                    className={`p-2 rounded-lg transition-colors ${
                      isItemActive
                        ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                        : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                    }`}
                    title={isItemActive ? "Visible in Nav (Click to Hide)" : "Hidden (Click to Show)"}
                  >
                    {isItemActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => openEditModal(idx)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Name & URL"
                  >
                    <Edit2 size={15} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteTop(idx)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Menu Item"
                  >
                    <Trash2 size={15} />
                  </button>

                  {/* Expand / Collapse */}
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors ml-1"
                      title={isExpanded ? "Collapse Sub-items" : "Expand Sub-items"}
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  )}
                </div>
              </div>

              {/* LEVEL 2: SUB-ITEMS CONTAINER */}
              {hasChildren && isExpanded && (
                <div className="bg-slate-50/70 p-4 sm:p-5 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>Level 2 Sub-menus ({item.dropdown!.length})</span>
                    <button
                      onClick={() => openAddModal("submenu", idx)}
                      className="text-[#007a87] hover:underline flex items-center gap-1 normal-case font-bold"
                    >
                      <Plus size={13} /> Add sub-menu here
                    </button>
                  </div>

                  <div className="space-y-3">
                    {item.dropdown!.map((sub, sIdx) => {
                      const isSubActive = sub.isActive !== false;
                      const hasSubSub = Array.isArray(sub.dropdown) && sub.dropdown.length > 0;
                      const subKey = `${idx}-${sIdx}`;
                      const isSubSubExpanded = !!expandedSubItems[subKey];

                      return (
                        <div
                          key={sIdx}
                          className={`rounded-xl border bg-white transition-all overflow-hidden shadow-xs ${
                            isSubActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50"
                          }`}
                        >
                          {/* Level 2 Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="w-6 h-6 rounded bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                                {sIdx + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold text-sm text-slate-800">
                                    {sub.name || "(Unnamed)"}
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-[#007a87] border border-teal-200 uppercase">
                                    Level 2
                                  </span>
                                  {hasSubSub && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                      {sub.dropdown!.length} Sub-sub items
                                    </span>
                                  )}
                                  {!isSubActive && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                      Hidden
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-slate-400 font-mono block truncate">
                                  {sub.href || "#"}
                                </span>
                              </div>
                            </div>

                            {/* Level 2 Actions */}
                            <div className="flex items-center flex-wrap gap-1 shrink-0 self-end sm:self-center">
                              {/* Reorder Level 2 */}
                              <div className="flex items-center bg-slate-50 rounded p-0.5 border border-slate-200 mr-1">
                                <button
                                  onClick={() => moveSub(idx, sIdx, "up")}
                                  disabled={sIdx === 0}
                                  className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded"
                                  title="Move Sub-item Up"
                                >
                                  <ArrowUp size={13} />
                                </button>
                                <button
                                  onClick={() => moveSub(idx, sIdx, "down")}
                                  disabled={sIdx === item.dropdown!.length - 1}
                                  className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded"
                                  title="Move Sub-item Down"
                                >
                                  <ArrowDown size={13} />
                                </button>
                              </div>

                              {/* PROMOTE LEVEL 2 -> LEVEL 1 */}
                              <button
                                onClick={() => promoteToNav(idx, sIdx)}
                                className="px-2 py-1 rounded bg-teal-50 hover:bg-[#007a87] hover:text-white text-[#007a87] font-bold text-xs flex items-center gap-1 transition-all border border-teal-200"
                                title="Promote this sub-menu item to a direct Top Navbar link"
                              >
                                <ArrowUpRight size={13} />
                                Promote to Nav
                              </button>

                              {/* ADD LEVEL 3 SUB-SUB ITEM */}
                              <button
                                onClick={() => openAddModal("subsubmenu", idx, sIdx)}
                                className="px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-1 transition-colors border border-purple-200"
                                title="Add a nested Sub-Sub Item (Level 3)"
                              >
                                <Plus size={13} />
                                Sub-sub Item
                              </button>

                              {/* Move to another parent Level 1 menu */}
                              {menus.length > 1 && (
                                <button
                                  onClick={() => openMoveModal("sub", idx, sIdx, sub.name)}
                                  className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors"
                                  title="Move to another Parent Menu"
                                >
                                  Move to...
                                </button>
                              )}

                              {/* Toggle active */}
                              <button
                                onClick={() => toggleSubActive(idx, sIdx)}
                                className={`p-1.5 rounded transition-colors ${
                                  isSubActive
                                    ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                    : "text-slate-400 bg-slate-100"
                                }`}
                                title={isSubActive ? "Visible in Sub-menu" : "Hidden in Sub-menu"}
                              >
                                {isSubActive ? <Eye size={14} /> : <EyeOff size={14} />}
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => openEditModal(idx, sIdx)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                                title="Edit Sub-item"
                              >
                                <Edit2 size={13} />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => deleteSub(idx, sIdx)}
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Delete Sub-item"
                              >
                                <Trash2 size={13} />
                              </button>

                              {/* Expand/Collapse Level 3 */}
                              {hasSubSub && (
                                <button
                                  onClick={() => toggleSubExpand(idx, sIdx)}
                                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded ml-1"
                                  title={isSubSubExpanded ? "Collapse Level 3" : "Expand Level 3"}
                                >
                                  {isSubSubExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* LEVEL 3: SUB-SUB-ITEMS CONTAINER */}
                          {hasSubSub && isSubSubExpanded && (
                            <div className="bg-purple-50/30 p-3 sm:p-4 border-t border-purple-100/60 ml-4 sm:ml-6 pl-4 border-l-2 border-l-purple-300 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-bold text-purple-800 uppercase tracking-wider mb-2">
                                <span>Level 3 Flyout Sub-menus ({sub.dropdown!.length})</span>
                                <button
                                  onClick={() => openAddModal("subsubmenu", idx, sIdx)}
                                  className="text-purple-700 hover:underline flex items-center gap-1 normal-case font-bold"
                                >
                                  <Plus size={12} /> Add sub-sub item
                                </button>
                              </div>

                              <div className="space-y-1.5">
                                {sub.dropdown!.map((subSub, ssIdx) => {
                                  const isSubSubActive = subSub.isActive !== false;
                                  return (
                                    <div
                                      key={ssIdx}
                                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg border bg-white transition-all ${
                                        isSubSubActive
                                          ? "border-slate-200"
                                          : "border-slate-200 opacity-60 bg-slate-50"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <GitCommit size={14} className="text-purple-500 shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="font-semibold text-xs text-slate-800">
                                              {subSub.name || "(Unnamed)"}
                                            </span>
                                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                              Level 3
                                            </span>
                                            {!isSubSubActive && (
                                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                                Hidden
                                              </span>
                                            )}
                                          </div>
                                          <span className="text-[11px] text-slate-400 font-mono block truncate">
                                            {subSub.href || "#"}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Level 3 Actions */}
                                      <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                                        {/* Reorder Level 3 */}
                                        <div className="flex items-center bg-slate-50 rounded p-0.5 border border-slate-200 mr-1">
                                          <button
                                            onClick={() => moveSubSub(idx, sIdx, ssIdx, "up")}
                                            disabled={ssIdx === 0}
                                            className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded"
                                            title="Move Up"
                                          >
                                            <ArrowUp size={12} />
                                          </button>
                                          <button
                                            onClick={() => moveSubSub(idx, sIdx, ssIdx, "down")}
                                            disabled={ssIdx === sub.dropdown!.length - 1}
                                            className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 rounded"
                                            title="Move Down"
                                          >
                                            <ArrowDown size={12} />
                                          </button>
                                        </div>

                                        {/* PROMOTE LEVEL 3 -> LEVEL 2 */}
                                        <button
                                          onClick={() => promoteSubSubToSub(idx, sIdx, ssIdx)}
                                          className="px-2 py-0.5 rounded bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 font-bold text-[11px] flex items-center gap-1 transition-all border border-purple-200"
                                          title="Promote to Level 2 Sub-menu"
                                        >
                                          <ArrowUpRight size={11} />
                                          Promote to L2
                                        </button>

                                        {/* Toggle Active */}
                                        <button
                                          onClick={() => toggleSubSubActive(idx, sIdx, ssIdx)}
                                          className={`p-1 rounded transition-colors ${
                                            isSubSubActive
                                              ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                              : "text-slate-400 bg-slate-100"
                                          }`}
                                          title={isSubSubActive ? "Visible in Flyout" : "Hidden"}
                                        >
                                          {isSubSubActive ? <Eye size={13} /> : <EyeOff size={13} />}
                                        </button>

                                        {/* Edit */}
                                        <button
                                          onClick={() => openEditModal(idx, sIdx, ssIdx)}
                                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                                          title="Edit Sub-sub-item"
                                        >
                                          <Edit2 size={12} />
                                        </button>

                                        {/* Delete */}
                                        <button
                                          onClick={() => deleteSubSub(idx, sIdx, ssIdx)}
                                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                          title="Delete Sub-sub-item"
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredMenus.length === 0 && (
          <div className="p-10 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No menu items match your search.</p>
          </div>
        )}
      </div>

      {/* Floating Save Bar when dirty */}
      {isDirty && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
          <div className="bg-[#002b5c] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-blue-900/40">
            <div>
              <p className="text-sm font-bold">You have unsaved navigation changes!</p>
              <p className="text-xs text-blue-200">Save to apply changes to the live website.</p>
            </div>
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-5 py-2.5 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#00606a] transition-all flex items-center gap-2 text-sm shadow-md"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Now"}
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT ITEM (SUPPORTS LEVEL 1, 2, AND 3) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-[#002b5c]">
                {modalMode === "add" ? "Add Navigation Item" : "Edit Navigation Item"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="space-y-4">
              {/* 3-Level Placement selection (only when adding) */}
              {modalMode === "add" && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Menu Level / Placement
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setItemForm({ ...itemForm, placement: "nav" })}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        itemForm.placement === "nav"
                          ? "border-[#007a87] bg-teal-50 text-[#007a87]"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-sm font-black mb-0.5">Level 1</span>
                      Top Navbar
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemForm({ ...itemForm, placement: "submenu" })}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        itemForm.placement === "submenu"
                          ? "border-[#007a87] bg-teal-50 text-[#007a87]"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-sm font-black mb-0.5">Level 2</span>
                      Sub-Menu
                    </button>

                    <button
                      type="button"
                      onClick={() => setItemForm({ ...itemForm, placement: "subsubmenu" })}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                        itemForm.placement === "subsubmenu"
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-sm font-black mb-0.5">Level 3</span>
                      Sub-Sub Menu
                    </button>
                  </div>
                </div>
              )}

              {/* If placement is Level 2 (submenu): Choose Level 1 parent */}
              {modalMode === "add" && itemForm.placement === "submenu" && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Top-Level Parent Menu
                  </label>
                  <select
                    value={itemForm.targetParentIdx}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, targetParentIdx: parseInt(e.target.value, 10) })
                    }
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#007a87]"
                  >
                    {menus.map((m, idx) => (
                      <option key={idx} value={idx}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* If placement is Level 3 (subsubmenu): Choose Level 1 AND Level 2 parent */}
              {modalMode === "add" && itemForm.placement === "subsubmenu" && (
                <div className="space-y-3 p-3 rounded-2xl bg-purple-50/50 border border-purple-200/60">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider">
                      1. Select Top-Level Parent (Level 1)
                    </label>
                    <select
                      value={itemForm.targetParentIdx}
                      onChange={(e) => {
                        const newPIdx = parseInt(e.target.value, 10);
                        setItemForm({
                          ...itemForm,
                          targetParentIdx: newPIdx,
                          targetSubIdx: 0,
                        });
                      }}
                      className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {menus.map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-purple-900 uppercase tracking-wider">
                      2. Select Sub-Menu Parent (Level 2)
                    </label>
                    <select
                      value={itemForm.targetSubIdx}
                      onChange={(e) =>
                        setItemForm({ ...itemForm, targetSubIdx: parseInt(e.target.value, 10) })
                      }
                      className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {(menus[itemForm.targetParentIdx]?.dropdown || []).map((sub, sIdx) => (
                        <option key={sIdx} value={sIdx}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                    {(!menus[itemForm.targetParentIdx]?.dropdown ||
                      menus[itemForm.targetParentIdx].dropdown!.length === 0) && (
                      <p className="text-xs text-red-500 font-medium">
                        This top-level menu has no sub-menus. Please create a Level 2 sub-menu first.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Menu Title / Label *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Simulation Lab 1, Health Packages"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#007a87]"
                />
              </div>

              {/* URL / Href */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Destination URL / Route *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /simulation-center/lab-1 or https://..."
                  value={itemForm.href}
                  onChange={(e) => setItemForm({ ...itemForm, href: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#007a87]"
                />
                <p className="text-[11px] text-slate-500">
                  Use relative paths (e.g., <code>/out-patient</code>) for internal pages, or full URLs (e.g., <code>https://...</code>) for external links.
                </p>
              </div>

              {/* Visibility switch */}
              <div className="flex items-center justify-between pt-2">
                <label className="text-xs font-bold text-slate-700">Display / Active Status</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isActive}
                    onChange={(e) => setItemForm({ ...itemForm, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007a87]"></div>
                  <span className="ml-2 text-xs font-bold text-slate-600">
                    {itemForm.isActive ? "Active" : "Hidden"}
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#007a87] text-white font-bold hover:bg-[#00606a] text-sm shadow-md"
                >
                  {modalMode === "add" ? "Add to Navigation" : "Update Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MOVE TO SUB-MENU */}
      {moveModalOpen && movingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#002b5c]">Move to Sub-menu</h3>
              <button
                onClick={() => setMoveModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600">
              Select which parent top-level menu <strong>&quot;{movingItem.itemName}&quot;</strong> should be placed under:
            </p>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Target Parent Menu
              </label>
              <select
                value={selectedTargetParent}
                onChange={(e) => setSelectedTargetParent(parseInt(e.target.value, 10))}
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#007a87]"
              >
                {menus
                  .map((m, idx) => ({ idx, name: m.name }))
                  .filter((m) =>
                    movingItem.sourceType === "top" ? m.idx !== movingItem.parentIdx : true
                  )
                  .map((m) => (
                    <option key={m.idx} value={m.idx}>
                      {m.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setMoveModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeMoveToSubmenu}
                className="px-5 py-2 rounded-xl bg-[#007a87] text-white font-bold hover:bg-[#00606a] text-sm shadow-md"
              >
                Confirm Move
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
