import React from "react";
import { 
  Mic, Baby, Activity, Footprints, Dumbbell, Mountain, Heart, Brain, ArrowRight 
} from "lucide-react";

export default function SpecialtyClinics() {
  const clinics = [
    { id: "01", name: "Voice Clinic", icon: Mic, color: "text-teal-600 bg-teal-50" },
    { id: "02", name: "IVF (In Vitro Fertilisation)", icon: Baby, color: "text-blue-600 bg-blue-50" },
    { id: "03", name: "Obesity Clinic", icon: Activity, color: "text-amber-600 bg-amber-50" },
    { id: "04", name: "Small Step", icon: Footprints, color: "text-purple-600 bg-purple-50" },
    { id: "05", name: "Thyroid Centre", icon: Activity, color: "text-teal-600 bg-teal-50" },
    { id: "06", name: "BILD Exercise Clinic", icon: Dumbbell, color: "text-blue-600 bg-blue-50" },
    { id: "07", name: "Swallowing Clinic", icon: Activity, color: "text-amber-600 bg-amber-50" },
    { id: "08", name: "Posture Pain Clinic", icon: Activity, color: "text-purple-600 bg-purple-50" },
    { id: "09", name: "VBS Mani Hypoxia", icon: Mountain, color: "text-teal-600 bg-teal-50" },
    { id: "10", name: "Knee Speciality", icon: Activity, color: "text-blue-600 bg-blue-50" },
    { id: "11", name: "Cardio Respiratory", icon: Heart, color: "text-red-600 bg-red-50" },
    { id: "12", name: "Epilepsy Monitoring", icon: Brain, color: "text-purple-600 bg-purple-50" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 relative z-30 py-12 px-6 sm:px-8 rounded-[2rem] overflow-hidden">
      <div className="relative z-10">
        {/* Asymmetrical Elegant Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-200/50 pb-8">
          <div>
            <p className="text-[10px] font-bold text-[#007a87] uppercase tracking-[0.2em] mb-2">Specialized Medical Care</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Our Specialty <span className="font-semibold text-[#002b5c]">Care Clinics</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm font-light max-w-md leading-relaxed">
            Highly focused clinical programs and centers of excellence addressing specialized therapeutic and medical disciplines.
          </p>
        </div>

        {/* Clinics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clinics.map((clinic) => {
            const Icon = clinic.icon;
            return (
              <div 
                key={clinic.id} 
                className="group relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-[#007a87]/30 hover:shadow-[0_15px_35px_rgba(0,122,135,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[150px] cursor-pointer"
              >
                {/* Red brand indicator in the corner */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${clinic.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 tracking-widest">{clinic.id}</span>
                </div>

                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-[#002b5c] tracking-tight group-hover:text-[#007a87] transition-colors duration-300 leading-snug">
                    {clinic.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-teal-600 uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
