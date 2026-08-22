"use client";

import { useState } from 'react';
import { Shield, Plus, Edit2, Trash2, Save, X, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AVAILABLE_PERMISSIONS = [
  { id: 'manage_home', label: 'Home Page Settings' },
  { id: 'manage_events', label: 'News & Events' },
  { id: 'manage_pricing', label: 'Pricing' },
  { id: 'manage_submissions', label: 'Form Submissions' },
  { id: 'manage_menu_pages', label: 'Menu Pages' },
  { id: 'manage_pages', label: 'Dynamic Pages' },
  { id: 'manage_about', label: 'About Us' },
  { id: 'manage_patient', label: 'Patient & Visitors' },
  { id: 'manage_doctors', label: 'Doctors & Departments' },
  { id: 'manage_research', label: 'Research' },
  { id: 'manage_academics', label: 'Academics' },
  { id: 'manage_online_facilities', label: 'Online Facilities' },
  { id: 'manage_careers', label: 'Job & Vacancy' },
  { id: 'manage_contact', label: 'Contact Us' },
  { id: 'manage_settings', label: 'Settings & Mail' },
  { id: 'manage_users', label: 'User Management' },
  { id: '*', label: 'Super Admin (All Access)' }
];

export default function RolesClientPage({ initialRoles }: { initialRoles: any[] }) {
  const router = useRouter();
  const [roles, setRoles] = useState(initialRoles);
  const [editingRole, setEditingRole] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', permissions: [] as string[] });
  const [saving, setSaving] = useState(false);

  const handleEdit = (role: any) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      permissions: JSON.parse(role.permissions || '[]')
    });
  };

  const handleNew = () => {
    setEditingRole({ id: 'new' });
    setFormData({ name: '', permissions: [] });
  };

  const togglePermission = (permId: string) => {
    if (permId === '*') {
      setFormData(prev => ({ ...prev, permissions: prev.permissions.includes('*') ? [] : ['*'] }));
      return;
    }
    
    setFormData(prev => {
      let perms = prev.permissions.filter(p => p !== '*'); // Remove wildcard if specific is chosen
      if (perms.includes(permId)) {
        perms = perms.filter(p => p !== permId);
      } else {
        perms = [...perms, permId];
      }
      return { ...prev, permissions: perms };
    });
  };

  const handleSave = async () => {
    if (!formData.name) return alert('Name is required');
    setSaving(true);
    
    const url = editingRole.id === 'new' ? '/api/admin/roles' : `/api/admin/roles/${editingRole.id}`;
    const method = editingRole.id === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setEditingRole(null);
        router.refresh();
        // Optimistic update
        if (method === 'POST') {
          setRoles([{ ...data.data, _count: { users: 0 } }, ...roles]);
        } else {
          setRoles(roles.map(r => r.id === data.data.id ? { ...data.data, _count: r._count } : r));
        }
      } else {
        alert(data.message);
      }
    } catch (e: any) {
      alert('Error saving role');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, userCount: number) => {
    if (userCount > 0) return alert('Cannot delete role with assigned users');
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    try {
      const res = await fetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setRoles(roles.filter(r => r.id !== id));
        router.refresh();
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Error deleting role');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
        
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Shield className="w-64 h-64 text-[#007a87]" />
        </div>

        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            Roles & Permissions
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage access control roles for the admin panel.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button onClick={handleNew} className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#007a87]/90 transition-colors shadow-sm">
            <Plus size={20} />
            Create Role
          </button>
        </div>
      </div>

      {editingRole && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{editingRole.id === 'new' ? 'Create New Role' : 'Edit Role'}</h2>
            <button onClick={() => setEditingRole(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Role Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                placeholder="e.g. Editor"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {AVAILABLE_PERMISSIONS.map(p => {
                  const isChecked = formData.permissions.includes(p.id) || (formData.permissions.includes('*') && p.id !== '*');
                  return (
                  <label key={p.id} className={"flex items-center p-3 rounded-xl border cursor-pointer transition-colors " + (isChecked ? 'bg-[#007a87]/5 border-[#007a87]/20' : 'bg-slate-50 border-slate-200 hover:bg-slate-100')}>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={isChecked}
                      onChange={() => togglePermission(p.id)}
                      disabled={formData.permissions.includes('*') && p.id !== '*'}
                    />
                    <div className={"w-5 h-5 rounded border flex items-center justify-center mr-3 " + (isChecked ? 'bg-[#007a87] border-[#007a87]' : 'border-slate-300 bg-white')}>
                      {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                    </div>
                    <span className={"text-sm font-medium " + (isChecked ? 'text-[#007a87]' : 'text-slate-600')}>{p.label}</span>
                  </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#007a87]/90 disabled:opacity-50">
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-bold text-slate-700">Role Name</th>
              <th className="p-4 font-bold text-slate-700">Users</th>
              <th className="p-4 font-bold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{role.name}</div>
                  <div className="text-xs text-slate-500 mt-1 truncate max-w-md">
                    {role.permissions.includes('*') ? 'All Access' : JSON.parse(role.permissions || '[]').join(', ')}
                  </div>
                </td>
                <td className="p-4 font-medium text-slate-600">{role._count?.users || 0}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(role)} className="p-2 text-[#007a87] hover:bg-[#007a87]/10 rounded-lg mr-2"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(role.id, role._count?.users || 0)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
