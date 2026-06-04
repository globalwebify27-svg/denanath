"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DoctorForm({ doctor }: { doctor: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Parse JSON strings to objects/arrays for the form
  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    specialty: doctor?.specialty || "",
    qualifications: doctor?.qualifications || "",
    image: doctor?.image || "",
    timings: doctor?.timings ? JSON.parse(doctor.timings) : [],
    education: doctor?.education ? JSON.parse(doctor.education) : [],
    training: doctor?.training ? JSON.parse(doctor.training) : [],
    experience: doctor?.experience ? JSON.parse(doctor.experience) : [],
    publications: doctor?.publications ? JSON.parse(doctor.publications) : [],
  });

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleArrayAdd = (field: string) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field as keyof typeof formData] as string[]), ""],
    });
  };

  const handleArrayRemove = (field: string, index: number) => {
    const newArray = [...formData[field as keyof typeof formData] as string[]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleTimingChange = (index: number, key: string, value: string) => {
    const newTimings = [...formData.timings];
    newTimings[index] = { ...newTimings[index], [key]: value };
    setFormData({ ...formData, timings: newTimings });
  };

  const handleTimingAdd = () => {
    setFormData({
      ...formData,
      timings: [...formData.timings, { branch: "", day: "", time: "" }],
    });
  };

  const handleTimingRemove = (index: number) => {
    const newTimings = [...formData.timings];
    newTimings.splice(index, 1);
    setFormData({ ...formData, timings: newTimings });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = doctor?.id ? `/api/doctors/${doctor.id}` : `/api/doctors`;
      const method = doctor?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timings: JSON.stringify(formData.timings),
          education: JSON.stringify(formData.education.filter(Boolean)),
          training: JSON.stringify(formData.training.filter(Boolean)),
          experience: JSON.stringify(formData.experience.filter(Boolean)),
          publications: JSON.stringify(formData.publications.filter(Boolean)),
        }),
      });

      if (!response.ok) throw new Error("Failed to save");
      
      router.push("/admin/doctors");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save doctor");
    } finally {
      setLoading(false);
    }
  };

  const renderStringArrayField = (label: string, field: "education" | "training" | "experience" | "publications") => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <button
          type="button"
          onClick={() => handleArrayAdd(field)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>
      {formData[field].map((item: string, index: number) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${label.toLowerCase()} item...`}
          />
          <button
            type="button"
            onClick={() => handleArrayRemove(field, index)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      {formData[field].length === 0 && (
        <p className="text-gray-500 text-sm italic">No items added yet.</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/doctors" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} /> Back to Directory
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          <span>{loading ? "Saving..." : "Save Doctor"}</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
          <input
            type="text"
            value={formData.qualifications}
            onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Photo (optional)</label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-200" />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({ ...formData, image: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007a87] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
              />
            </div>
            {formData.image && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: "" })}
                className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">OPD Timings</h3>
          <button
            type="button"
            onClick={handleTimingAdd}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} /> Add Timing
          </button>
        </div>
        {formData.timings.map((timing: any, index: number) => (
          <div key={index} className="flex gap-2 mb-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Branch"
              value={timing.branch}
              onChange={(e) => handleTimingChange(index, "branch", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Day"
              value={timing.day}
              onChange={(e) => handleTimingChange(index, "day", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Time"
              value={timing.time}
              onChange={(e) => handleTimingChange(index, "time", e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleTimingRemove(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {formData.timings.length === 0 && (
          <p className="text-gray-500 text-sm italic">No timings added yet.</p>
        )}
      </div>

      {renderStringArrayField("Education", "education")}
      {renderStringArrayField("Training", "training")}
      {renderStringArrayField("Experience", "experience")}
      {renderStringArrayField("Publications", "publications")}

    </form>
  );
}
