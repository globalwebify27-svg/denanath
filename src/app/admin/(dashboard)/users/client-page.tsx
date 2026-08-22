"use client";

import { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Save, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CustomDropdown from '@/components/CustomDropdown';

export default function UsersClientPage({ initialUsers, roles }: { initialUsers: any[], roles: any[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', roleId: '' });
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email || '',
      password: '',
      roleId: user.roleId
    });
  };

  const handleNew = () => {
    setEditingUser({ id: 'new' });
    setFormData({ username: '', email: '', password: '', roleId: roles[0]?.id || '' });
  };

  const handleSave = async () => {
    if (!formData.username || !formData.roleId) return alert('Username and Role are required');
    if (editingUser.id === 'new' && !formData.password) return alert('Password is required for new users');
    
    setSaving(true);
    
    const url = editingUser.id === 'new' ? '/api/admin/users' : `/api/admin/users/${editingUser.id}`;
    const method = editingUser.id === 'new' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setEditingUser(null);
        router.refresh();
        if (method === 'POST') {
          setUsers([data.data, ...users]);
        } else {
          setUsers(users.map(u => u.id === data.data.id ? data.data : u));
        }
      } else {
        alert(data.message);
      }
    } catch (e: any) {
      alert('Error saving user');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string, username: string) => {
    if (!confirm('Are you sure you want to delete ' + username + '?')) return;
    
    try {
      const res = await fetch('/api/admin/users/' + id, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u.id !== id));
        router.refresh();
      } else {
        alert(data.message);
      }
    } catch (e) {
      alert('Error deleting user');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
        
        <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Users className="w-64 h-64 text-[#007a87]" />
        </div>

        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            User Management
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage administrative users and assign roles.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <button onClick={handleNew} className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#007a87]/90 transition-colors shadow-sm">
            <Plus size={20} />
            Create User
          </button>
        </div>
      </div>

      {editingUser && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{editingUser.id === 'new' ? 'Create New User' : 'Edit User'}</h2>
            <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <input 
                type="text" 
                value={formData.username} 
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email (Optional)</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Role</label>
              <CustomDropdown
                name="roleId"
                placeholder="Select Role"
                options={roles.map((r: any) => r.name)}
                value={roles.find((r: any) => r.id === formData.roleId)?.name || ""}
                onChange={(val: string) => {
                  const role = roles.find((r: any) => r.name === val);
                  if (role) setFormData({ ...formData, roleId: role.id });
                }}
                className="w-full !py-3 bg-slate-50 border-slate-200 rounded-xl text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                {editingUser.id === 'new' ? 'Password' : 'New Password (leave blank to keep current)'}
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={formData.password} 
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-3 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#007a87]/90 disabled:opacity-50">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save User
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-bold text-slate-700">Username</th>
              <th className="p-4 font-bold text-slate-700">Role</th>
              <th className="p-4 font-bold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{user.username}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 font-medium rounded-full text-sm">
                    {user.role?.name}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(user)} className="p-2 text-[#007a87] hover:bg-[#007a87]/10 rounded-lg mr-2"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(user.id, user.username)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
