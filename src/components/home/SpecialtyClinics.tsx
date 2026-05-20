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
   <section className="relative mt-24  overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ecfdf5] via-[#f0fdf4] to-[#d1fae5] py-12 px-6 sm:px-8">

  {/* Green Glow Effects */}
  <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-300/30 blur-3xl"></div>

  {/* Grid Pattern */}
  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#065f46_1px,transparent_1px),linear-gradient(to_bottom,#065f46_1px,transparent_1px)] bg-[size:40px_40px]"></div>

  <div className="relative z-10 max-w-7xl mx-auto">
    
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-emerald-200/60 pb-8">
      
      <div>
        <p className="text-[10px] font-bold text-[#007a87] uppercase tracking-[0.2em] mb-2">
          Specialized Medical Care
        </p>

        <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
          Our Specialty{" "}
          <span className="font-semibold text-emerald-700">
            Care Clinics
          </span>
        </h2>
      </div>

      <p className="text-slate-600 text-xs sm:text-sm font-light max-w-md leading-relaxed">
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
            className="
              group relative
              rounded-2xl
              border border-emerald-100
              bg-white/70
              backdrop-blur-xl
              p-6
              overflow-hidden
              shadow-[0_10px_30px_rgba(16,185,129,0.08)]
              hover:shadow-[0_20px_45px_rgba(16,185,129,0.18)]
              hover:border-emerald-300
              hover:-translate-y-2
              transition-all duration-500
              flex flex-col justify-between
              min-h-[160px]
              cursor-pointer
            "
          >

            {/* Hover Glow */}
            <div className="
              absolute inset-0 opacity-0
              group-hover:opacity-100
              transition duration-500
              bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_60%)]
            "></div>

            {/* Top */}
            <div className="relative z-10 flex justify-between items-start">

              <div
                className={`
                  w-11 h-11 rounded-xl
                  flex items-center justify-center
                  transition-transform duration-300
                  group-hover:scale-110
                  shadow-sm
                  ${clinic.color}
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-bold text-emerald-200 tracking-widest">
                {clinic.id}
              </span>

            </div>

            {/* Bottom */}
            <div className="relative z-10">

              <h3 className="
                text-xs sm:text-[13px]
                font-bold
                text-slate-800
                tracking-tight
                leading-snug
                group-hover:text-emerald-700
                transition-colors duration-300
              ">
                {clinic.name}
              </h3>

              <div className="
                flex items-center gap-1
                text-[9px]
                font-bold
                text-emerald-600
                uppercase
                tracking-widest
                mt-3
                opacity-0
                translate-y-2
                group-hover:opacity-100
                group-hover:translate-y-0
                transition-all duration-300
              ">
                <span>Explore</span>

                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="
              absolute bottom-0 left-0
              h-[3px] w-0
              bg-gradient-to-r from-emerald-500 to-teal-500
              group-hover:w-full
              transition-all duration-500
            "></div>

          </div>
        );
      })}
    </div>
  </div>
</section>
  );
}
