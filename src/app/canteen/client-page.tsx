"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, Coffee, UtensilsCrossed, Clock, MapPin, Phone, 
  ShieldCheck, Sparkles, CheckCircle2, HeartPulse, Coins, 
  Info, ChefHat, Apple, Flame, Soup, AlertCircle, ArrowRight
} from "lucide-react";

interface CanteenPageProps {
  initialData?: any;
}

export default function CanteenClientPage({ initialData }: CanteenPageProps) {
  const [activeTab, setActiveTab] = useState<"outlets" | "inpatient" | "diets" | "vending">("outlets");

  const outlets = [
    {
      title: "24-Hour Coffee Shop",
      location: "SS (New) Building, Ground Floor",
      timings: "Open 24 Hours (Day & Night)",
      desc: "Serves fresh tea, specialty coffee, cold beverages, quick snacks, sandwiches, and light meals. A limited night menu is available during late-night hours.",
      highlights: ["Open 24x7", "Quick Service", "Beverages & Snacks", "Take-away Available"],
      badge: "24x7 Service",
      icon: Coffee
    },
    {
      title: "Main Canteen",
      location: "GS (Old) Building, Basement",
      timings: "Breakfast, Lunch & Dinner Hours",
      desc: "The central dining facility featuring freshly cooked meals including authentic Maharashtrian Thali, Punjabi Thali, Special Thali, South Indian snacks, and hot beverages.",
      highlights: ["Maharashtrian Thali", "Punjabi Thali", "Table Service", "Comfortable Seating"],
      badge: "Full Meals & Thali",
      icon: UtensilsCrossed
    },
    {
      title: "Take Away Counter",
      location: "SS (New) Building, 2nd Floor",
      timings: "Standard Hospital Hours",
      desc: "Designed for visitors and healthcare staff looking for quick takeaway meals, packed snacks, fresh tea, coffee, and packaged health beverages on the go.",
      highlights: ["Fast-Track Counter", "Grab & Go", "Fresh Teas & Juices", "Staff & Visitor Friendly"],
      badge: "Quick Takeaway",
      icon: ChefHat
    }
  ];

  const specializedDiets = [
    { name: "Full Normal Diet", desc: "Balanced diet meeting daily nutritional requirements for non-restricted patients." },
    { name: "Salt-Restricted Diet", desc: "Low sodium diet carefully prepared for hypertension, cardiac, and renal patients." },
    { name: "Diabetic Diet", desc: "Calorie-controlled, low-glycemic index meals formulated to stabilize blood sugar." },
    { name: "Renal Diet", desc: "Monitored potassium, sodium, and protein levels tailored for kidney health." },
    { name: "Soft Diet", desc: "Easily digestible, lightly cooked foods for post-operative and gastrointestinal recovery." },
    { name: "Semi-Solid Diet", desc: "Pureed and mashed nutritious textures for patients with mastication difficulties." },
    { name: "Bland Diet", desc: "Non-irritating, non-spicy meals gentle on the digestive tract and ulcers." },
    { name: "Liquid Diet", desc: "Clear and full fluids providing hydration and vital electrolytes post-procedure." },
    { name: "Chemo Diet", desc: "Specially formulated hygienic, calorie-dense foods supporting oncology patients." },
    { name: "High-Fibre Diet", desc: "Rich in whole grains, dietary fibre, and legumes to promote healthy gut motility." },
    { name: "Fat-Free Diet", desc: "Minimal fat preparation for patients recovering from gallbladder or liver procedures." },
    { name: "High-Protein Diet", desc: "Enhanced protein content to accelerate wound healing and surgical recovery." },
    { name: "Ryle's Tube Feeding", desc: "Clinically calculated enteral liquid formulas delivered via nasogastric feeding." }
  ];

  const mealSchedule = [
    { time: "07:00 AM – 07:30 AM", title: "Early Morning Tea", desc: "Freshly brewed tea served warm at bedside." },
    { time: "08:30 AM – 09:30 AM", title: "Breakfast with Milk", desc: "Nutritious hot breakfast tailored to patient's clinical diet." },
    { time: "11:30 AM – 01:30 PM", title: "Wholesome Lunch", desc: "Complete balanced lunch served in temperature-insulated food-grade trays." },
    { time: "03:30 PM – 04:00 PM", title: "Afternoon Tea & Biscuits", desc: "Light beverage and healthy snacks for afternoon nourishment." },
    { time: "06:30 PM – 08:30 PM", title: "Balanced Dinner", desc: "Wholesome, easily digestible dinner to conclude the daily meal schedule." }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/facilities" className="hover:text-white transition-colors">Facilities</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Canteen Facilities</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-3">
            Canteen & Catering Facilities
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mt-1.5 font-medium leading-relaxed">
            Wholesome, hygienically safe, and clinically guided nutrition for patients, visitors, doctors, and healthcare staff.
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pt-10 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Quick Overview Card */}
          <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-28">
            
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 p-6 space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#002b5c] text-base leading-tight">Catering Service</h3>
                  <span className="text-xs font-semibold text-teal-600">Open 24x7 x 365 Days</span>
                </div>
              </div>

              {/* Key Outlets at a Glance */}
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">Our Outlets</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-[#002b5c] block">24-Hour Coffee Shop</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#007a87]" /> SS Building, Ground Floor
                    </span>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-teal-100/70 text-teal-700 text-[10px] font-bold">24x7 Service</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-[#002b5c] block">Main Canteen</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#007a87]" /> GS Building, Basement
                    </span>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-700 text-[10px] font-bold">Maharashtrian & Punjabi Thali</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-[#002b5c] block">Take Away Counter</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#007a87]" /> SS Building, 2nd Floor
                    </span>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-700 text-[10px] font-bold">Quick Bites & Drinks</span>
                  </div>
                </div>
              </div>

              {/* Hygiene & Kitchen */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Kitchen & Hygiene</h4>
                
                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Flame className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span><strong>Steam Heating:</strong> Cooking preserves essential nutrients and vitamins.</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <Sparkles className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span><strong>Auto Dishwashers:</strong> High-temperature sanitization in all outlets.</span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Dietician Verified:</strong> Patient meals verified before dispatch.</span>
                </div>
              </div>

              {/* Vending Tokens */}
              <div className="pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
                  <div className="flex items-center gap-2 text-[#007a87] font-bold text-xs mb-1">
                    <Coins className="w-4 h-4 text-teal-600" />
                    <span>Tea & Coffee Vending</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Tokens are available at the main reception desks of GS, SS, Annex, SS OT & ICU.
                  </p>
                </div>
              </div>

              {/* Hospital Contact */}
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#007a87]" />
                  <span>Hospital General Enquiry:</span>
                </div>
                <div className="pl-5 text-slate-600 font-semibold space-y-0.5">
                  <p>GS Building: 020 - 4015 1000</p>
                  <p>SS Building: 020 - 4915 3000</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1 min-w-0 space-y-10">
            
            {/* Overview Card */}
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Hospital Dining Experience</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002b5c] tracking-tight mb-4">
                Welcome to Deenanath Hospital Catering Facilities
              </h2>
              <div className="w-16 h-1 bg-[#007a87] rounded-full mb-6"></div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Deenanath Mangeshkar Hospital & Research Center provides a well-equipped, dedicated catering facility designed to serve inpatients, their visiting relatives, hospital doctors, and healthcare staff, as well as any walk-in visitors.
                </p>
                <p>
                  The primary commitment of our catering department is to provide <strong className="text-[#002b5c]">high quality, nutritious, and hygienically safe food</strong> to all patrons. The main central kitchen is located in the <strong className="text-[#002b5c]">"B" Wing of the Basement</strong>, equipped with modern automatic culinary equipment and steam-heating technology that ensures food is cooked cleanly while retaining its vital nutritional value.
                </p>
                <p>
                  To uphold the highest hygiene benchmarks, automatic industrial dishwashers are operational across all canteens to ensure complete sanitization of cutlery and serving utensils at all times.
                </p>
              </div>
            </div>

            {/* Food Outlets Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                    <Coffee className="w-6 h-6 text-[#007a87]" />
                    3 Food Outlets on Campus
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Conveniently situated across our hospital buildings for easy access.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {outlets.map((outlet, idx) => {
                  const Icon = outlet.icon;
                  return (
                    <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-[#007a87]/40 shadow-sm hover:shadow-[0_12px_36px_rgba(0,122,135,0.08)] transition-all duration-300 flex flex-col group">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#007a87] group-hover:bg-[#007a87] group-hover:text-white flex items-center justify-center transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          {outlet.badge}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-[#002b5c] mb-1.5 group-hover:text-[#007a87] transition-colors">{outlet.title}</h4>
                      
                      <div className="space-y-1.5 mb-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#007a87] shrink-0" />
                          <span className="font-medium text-slate-700">{outlet.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="font-semibold text-teal-600">{outlet.timings}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                        {outlet.desc}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {outlet.highlights.map((h, hIdx) => (
                          <span key={hIdx} className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Culinary Menus & Ordering System */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Menu & Specialties Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <Soup className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#002b5c] text-lg">Delicious Variety of Menus</h3>
                    <p className="text-xs text-slate-400">Fresh local & regional recipes</p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 flex-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Authentic Maharashtrian Thali:</strong> Served exclusively at the GS Basement Canteen.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Punjabi & Special Thali:</strong> Available daily in both GS and SS canteen facilities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Snacks:</strong> Fresh Maharashtrian snacks, South Indian dosas & idlis, sandwiches, and burgers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Beverages:</strong> Specialty teas, brewed filter coffee, fresh seasonal juices, and traditional Kokum/Lemon Sarbats.</span>
                  </li>
                </ul>

                <div className="mt-6 p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#007a87] shrink-0" />
                  <span><strong>24/7 Service:</strong> The Coffee Shop is open through the night with a curated late-night menu.</span>
                </div>
              </div>

              {/* Ordering & Table Service System */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#002b5c] text-lg">Simple Table Service</h3>
                    <p className="text-xs text-slate-400">Hassle-free ordering process</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 flex-1">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#007a87] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-[#002b5c] block">Order & Payment</strong>
                      <p className="text-xs text-slate-500">Place your food order with the cashier at the counter and pay by Cash, Card, or UPI.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#007a87] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-[#002b5c] block">Table Number Token</strong>
                      <p className="text-xs text-slate-500">You will receive a printed table number token along with your payment receipt.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#007a87] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-[#002b5c] block">Place on Table Stand</strong>
                      <p className="text-xs text-slate-500">Place your token onto the number-stand located on your chosen table.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#007a87] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                    <div>
                      <strong className="text-[#002b5c] block">Table Service by Waiter</strong>
                      <p className="text-xs text-slate-500">Our courteous floor staff will bring your freshly prepared order right to your table.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* In-Patient Catering & Dietetics */}
            <div className="bg-gradient-to-br from-[#002b5c] to-[#003d82] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 pointer-events-none -mr-16 -mt-16">
                <HeartPulse size={300} />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold tracking-wider uppercase border border-white/10">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>Clinical Nutrition & Dietetics Department</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  In-Patient Dietary Services
                </h3>

                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
                  Admitted hospital patients can receive customized daily meals formulated by our clinical dieticians. To request the hospital meal service, inform the nursing station on your floor or contact the dieticians directly. A clinical dietician visits the patient bedside to assess health condition, caloric intake, and nutritive requirements before prescribing the tailored meal plan.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-teal-300 mb-2" />
                    <h5 className="font-bold text-sm text-white">Dietician Supervised</h5>
                    <p className="text-xs text-blue-200 mt-1">Every meal batch is tasted and verified by a dietician prior to service.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <Sparkles className="w-5 h-5 text-teal-300 mb-2" />
                    <h5 className="font-bold text-sm text-white">Insulated Trolleys</h5>
                    <p className="text-xs text-blue-200 mt-1">Supplied in imported food-grade covered trays in insulated warm trolleys.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <UtensilsCrossed className="w-5 h-5 text-teal-300 mb-2" />
                    <h5 className="font-bold text-sm text-white">Relative Meal Plan</h5>
                    <p className="text-xs text-blue-200 mt-1">Relatives can opt for daily room meal packages billed to the patient account.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 13 Specialized Hospital Diets */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                  <Apple className="w-6 h-6 text-emerald-600" />
                  13 Specialized Therapeutic Diets
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Prepared daily under strict nutritional guidelines tailored to individual clinical requirements.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {specializedDiets.map((diet, dIdx) => (
                  <div key={dIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                        {dIdx + 1}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#002b5c]">{diet.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-7">
                      {diet.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily In-Patient Meal Schedule */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#002b5c] tracking-tight flex items-center gap-2.5">
                  <Clock className="w-6 h-6 text-[#007a87]" />
                  In-Patient Daily Meal Schedule
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Fixed service schedule ensuring timely nutrition for all admitted patients.
                </p>
              </div>

              <div className="space-y-3">
                {mealSchedule.map((meal, mIdx) => (
                  <div key={mIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 gap-2 sm:gap-4 hover:bg-teal-50/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-teal-100 text-[#007a87] font-bold text-xs flex items-center justify-center shrink-0">
                        {mIdx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#002b5c]">{meal.title}</h4>
                        <p className="text-xs text-slate-500">{meal.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-sm shrink-0 self-start sm:self-auto">
                      {meal.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tea & Coffee Vending Machines Info */}
            <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/10 to-transparent rounded-3xl p-6 sm:p-8 border border-teal-200/50 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#007a87] text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-700/20">
                <Coins className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 flex-1 text-center md:text-left">
                <h4 className="text-lg font-bold text-[#002b5c]">Hot Tea & Coffee Vending Machines</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Convenient coin-operated vending machines are stationed on various patient floors and near the GS Building Main Reception. Dispenses hot, fresh tea and coffee instantly.
                </p>
                <p className="text-xs font-semibold text-teal-800 pt-1">
                  Tokens are available at the Main Receptions (GS, SS & Annex) and OT / ICU Reception counters.
                </p>
              </div>
              <Link 
                href="/facilities" 
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#002b5c] hover:bg-[#007a87] text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Back to All Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
