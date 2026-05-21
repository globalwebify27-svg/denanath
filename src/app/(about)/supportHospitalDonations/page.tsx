"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Heart, ArrowRight } from "lucide-react";

export default function SupportHospitalPage() {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: true },
    { name: "Unique features of DMH", href: "/unique-features", active: false },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: false },
    { name: "Charity Details", href: "/charity-details", active: false },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on mobile/tablet (horizontal scroll)
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        // Calculate scroll position to center the active element
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        
        // Use setTimeout to ensure DOM is fully painted before scrolling
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const institutionalDonors = [
    "Accolade Electronics Pvt.Ltd.", "Aquarius Engineers Private Limited", "Avaya India Private Limited", 
    "Bajaj Finance Limited", "Blue Cross Laboratories Pvt. Ltd.", "BOBST India Private Limited", 
    "CA Mujumdar & Dixit", "Calsoft Private Limited", "Corbelo Projects Pvt.Ltd.", 
    "Datsons Electronics Pvt.Ltd.", "Ecoclean Machines Pvt.Ltd.", "Fluid Controls Private Limited", 
    "Garware Fulflex Social Foundation", "General Industrial Controls Private Limited", "Globant India Private Limited"
  ];

  const donationInKind = [
    "CybageAsha Trust", "Mahale Dr.Nilesh", "Potdar Anant Padmakar", 
    "Roche Products India P L", "Rotary Club of Poona Charity Trust (Camp)"
  ];

  const individualDonors50to1Cr = [
    "Beharay Ashok Shrikrishna", "Chaudhari Pramod Madhukar", "Firodia Arun Hastimal", 
    "Karmarkar Sunanda Vasudeo", "Vakil Vasantika Girish"
  ];

  const individualDonors25to50 = [
    "Tole Prabhakar Yashwant", "Vaidya Sarita Aniruddha"
  ];

  const individualDonors1to25 = [
    "Bang Sapna Ajit", "Bapat Mandar Shripad", "Beharay Anuja Raghunandan", "Beharay Aruna Ashok",
    "Beharay Raghunandan Ashok", "Beharay Raghunandan Ashok (HUF)", "Bhide Dr.Vijayshree Milind", 
    "Bhurke Dr. Bhagyashree", "Chandrashekhar Venkataraman", "Dalvi Dr.Pradip Balasaheb", 
    "Dani Pradeep Shankar", "Gujarathi Nandkumar Balkrishna", "Gujrathi Hemant Balkrishna", 
    "Hasabnis Lt.Gen.Sudarshan", "Joglekar Vinayak Manik", "Kopargaonkar Dr Swati", 
    "Kulkarni Abhiijt Madhukar", "Kulkarni Aparna Vijaykumar", "Kulkarni Ulhas Narayanrao", 
    "Lagu Lalita Kamalakar", "Lakhapati Sanjay Vasant", "Maloo Manjusha", "Malshe Madhura Vinit", 
    "Mirchandani Daljit Lilaram", "Mistry Kirti Ashok", "Pai Vinayak Ratnakar", "Pansare Mandakini Sudhakar", 
    "Parasnis Dr.Amit Surendra", "Patwardhan Sadashiv Gajanan", "Pendse Surekha Jayasinha", 
    "Phadke Radhika Vinayak", "Phadke Sunita Pandurang", "Phadke Vinayak Pandurang", 
    "Prabhudesai Manjiri Shriram", "Prabhudesai Shriram Gopal", "Pradhan Shekharchandra Dattatraya", 
    "Purandare Maya Dattatraya", "Puranik Smita Nitin", "Puranik Sunil Anant", "Rane Sandeep Manohar", 
    "Rawat Pramod Trimbak", "Rawat Savita Pramod", "Sawant Vivek Vijay", "Sewak Gayatree Anant", 
    "Sewak Yogesh Anant", "Shrivastava Sonal Mitra", "Tilloo Sudheer Bhaskar", "Vaidya Aniruddha Sudhir", 
    "Vellore Jayaraman Rangashaye", "Wakankar Dr. Hemant Madhukar"
  ];

  const individualDonorsUpto1 = [
    "Abhyankar Dattatraya Ramchandra", "Agarkhedkar Dr. Nikhil Shrikant", "Agashe Shripad Kamlakant", "Agrawal Poonam", 
    "Argade Mugdha", "Badve Dnyaneshwar Anant", "Bakare Neena Mangesh", "Bakshi Shweta", "Bang Ajit Jivanram", 
    "Bapat Ananya Aditya", "Bapaye Dr.Amol Mahadeo", "Barve Avinash", "Baxi Gira Tushar", "Baxi Tushar Mahendrarai", 
    "Bhadbhade Nita Milind", "Bhagwat Anita Baban", "Bhargav Prashant Pankaj", "Bhargava Pradeep", 
    "Bhargave Sanjay Ramchandra", "Bhat Dr.Madhav Jayant", "Bhave Dr. Asmita Arvind", "Bhave Dr.Arvind Dattatraya", 
    "Bhave Dr.Arvind Vishnu", "Bhave Gayatri Atul", "Bhave Manjiri Arvind", "Bhondwe Rashmi Amit", "Bhope Sujata Amit", 
    "Chaitanya Tejashree Tushar", "Chhatre Meghana V", "Chugh Karun Kumar", "Dabak Sadhana Abhay", "Dabir Manisha Mahesh", 
    "Damle Ameya Nandkishor", "Damle Sukhada Ashok", "Dandekar Vijay Jayram", "Desai Swaroopa", "Deshmukh Dr. Chetan Dilip", 
    "Deshmukh Dr. Vaishali Chetan", "Deshpande Deepti Susheel", "Deshpande Sheetal Praful", "Deshpande Suresh Purushottam", 
    "Deshpande Vaidehi Ramchandra", "Deshpande Vidyullata Balkrishna", "Dhakul Chitra Chintaman", "Dhand Amit", 
    "Dharmadhikari Mayur Mukund", "Dhaygude Amruta Rajendra", "Dixit Anjali Yogesh", "Dixit Nikhil Padmakar", 
    "Doshi Dr.Prajakta Haridas", "Dudhbhate Dr.Anagha Jaideep", "Dudhbhate Dr.Jaideep Anant", "Gadage Dr.Vijaya Siddharth", 
    "Gadhikar Dr.Harshal Prabhakar", "Gadkari Aaratee Ashok", "Gaidu Dr.Jyoti Amarjitsingh", "Gaurav Suhas Bhalerao", 
    "Ghag Ganesh Dilip", "Gharpure Ajey Arvind", "Ghodke Ashwini Nivrutti", "Godbole Dr.Ravibhushan Ramesh", 
    "Gogate Nirmal Shriram", "Gurjar Trupti Omkar", "Hanamannavar Seetal", "Hande Dr.Varsha Rajesh", "Hingmire Sheetal Sachin", 
    "Hulyalkar Bhagyashree Aditya", "Jadhav Bhushan Dyanoba", "Jadhav Rashmi Amit", "Jagtap Shital Sagar", "Jagtap Vishwas Annasaheb", 
    "Jain Nandini", "Jhurani Hemant Kannayalal", "Joglekar Ishan Vinayak", "Joglekar Smita Sanjay", "Joshi Amruta Vitthal", 
    "Joshi Hemlata Gajanan", "Joshi Nisha Nitin", "Joshi Sachin Subhash", "Joshi Shrinivas Madhav", "Joshi Sushama Mangesh", 
    "Joshi Vaibhav Chandrashekhar", "Joshi Vishal Vishwambhar", "Joshi Yatin Balkrishna", "Juvekar Dr.Nilesh Manohar", 
    "Kale Ketan Avinash", "Kale Mayuri Mihir", "Kanike Divyashree", "Kanitkar Vaibhav", "Kanswa Prateek", "Karmarkar Kedar Kashinath", 
    "Kedari Rameshwari", "Ketkar Anisha Hemant", "Khaladkar Dr.Bhagyashree", "Khare Dr. Prasanna Waman", "Khare Dr. Sangita Shriram", 
    "Kirkole Pradip Balkrishna", "Kolte Ujwala Pritam", "Kotwal Dr.Meera Pravin", "Ksheersagar Bhakti Sameer", 
    "Kulkarni Deepak Jagannath", "Kulkarni Kalyani Aditya", "Kulkarni Ketaki Ketan", "Kulkarni Neeta", "Kulkarni Vikas Bhalchandra", 
    "Kurlekar Dr.Utkrant", "Lele Aniruddha", "Malwade Sameer Vilas", "Manchanda Ruchika", "Mane Dr.Nilima", "Maranure Rajendra Kondiba", 
    "Mate Pooja Prashant", "Medhi Sayali Sandeep", "Mehmi Vikramjit", "Moharir Ashwini Amol", "Nagle Vikalp", "Nakhate Manjiri Sameer", 
    "Navathe Dr.Pushan Dattatreya", "Navrat Tara Rakesh", "Nerlekar Dr.(Mrs.) Mrinal Ashish", "Palande Tanuja Shripad", 
    "Palnitkar Dr. Sachin Sudhakarrao", "Pande Dr. Avinash A.", "Panse Dr.Archana Manish", "Panshikar Madhuri Atul", 
    "Parande Supriya Abhijit", "Paranjape Atul Ashok", "Paranjape Minal", "Paranjape Prafulla Ashok", "Parchure Dr.Bhakti Narendra", 
    "Patil Ajit Govind", "Pawar Shrikant S.", "Pendse Yogesh Prakash", "Pethkar Shriyavallabh Vidyadhar", "Phadke Anagha Abhinav", 
    "Phadke Sureshkumar Vasant", "Pimprikar Saurabh Ashok", "Pitkar Shilpa Sateesh", "Punekar Swati Suresh", "Puranik Swati Ravindra", 
    "Rairikar Sneha Devidas", "Rasane Mrunal Sandeep", "Rasane Pradnya Ashwinkumar", "Rasane Sandeep Suresh", "Sanas Kishor Shivaji", 
    "Sathe Dr. Shireesh Prabhakar", "Sathe Sanjay Shantanu", "Sathe Swati Sanjay", "Sathe Trupti Ganesh", "Sawai Suvarna Amit", 
    "Saxena Ankur", "Sharma Neelamkumar", "Sheeja George", "Sheeja Izak Shrisundar", "Shende Abhijeet", "Shinde Reshma Mangesh", 
    "Shirdhonkar Yashada Vijay", "Shirke Deepti", "Singh Manjiree", "Sure Dhanashri Mahesh", "Tambe Riya Abhijit", 
    "Tamboli Ramkrishna Sitaram", "Tialk Makarand Prabhakar", "Tol Abhaya", "Tol Arundhati Dattatray", "Ugine Karadi", 
    "Utpat Kiran Dnyaneshwar", "Uttarwar Dr.Akshay Jayant", "Vaidya Madhura Shailesh", "Valvekar Madan Anant", 
    "Valvekar Medha Madan", "Waikar Sachin Yashwant", "Wikhe Kishor Keshaorao", "Zambre Dr.Smita Mohan", "Zope Neena Prafulla"
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about-hospital" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Support Hospital / Donations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Support Hospital / Donations</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {aboutOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={`snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal ${
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  } ${idx !== aboutOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : ""}`}
                >
                  <span>{option.name}</span>
                  <ChevronRight 
                    className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                      option.active 
                        ? "text-[#007a87] translate-x-1" 
                        : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-12">
              
              {/* Introduction & Contact */}
              <div className="mb-10">
                <div className="flex items-center gap-3 text-[#007a87] bg-teal-50 border border-teal-100 p-4 rounded-xl mb-8">
                  <Phone className="w-6 h-6 shrink-0" />
                  <p className="text-sm md:text-base font-semibold">
                    Please call Deenanath Mangeshkar Hospital at <a href="tel:+912040151000" className="underline hover:text-teal-700">(+91) 20 4015 1000</a> for more information or to make a credit card donation.
                  </p>
                </div>
                
                <p className="text-slate-600 leading-relaxed font-light mb-6">
                  Deenanath Mangeshkar Hospital also relies on philanthropy to provide essential health care services in Pune. Gifts may be made to support efforts to help educate patients and families, provide necessary supplies and state-of-the-art equipment and enhancements for patient care needs for people of the community.
                </p>

                <p className="text-slate-700 font-medium mb-4">
                  Your contributions will help us, You can count on us to be:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 leading-relaxed text-sm">
                      <strong className="text-slate-700">100% dedicated to bringing you specialists who are highly trained at some of the best institutions in the country</strong> – Our focus remains solely on hiring and training the most highly skilled, talented professionals, expanding our education and screening programs and continuing to invest in the latest life-saving technology.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 leading-relaxed text-sm">
                      <strong className="text-slate-700">100% committed to patient safety and long-term recovery</strong> – Deenanath Mangeshkar Hospital is nationally recognized not only for their quality of care, but for their advanced and proactive approach toward integrated long-term care and support for patients.
                    </p>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-[#002b5c] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#007a87]" />
                  You can donate in form of
                </h3>
                <ul className="space-y-3 mb-10 border-l-2 border-teal-100 pl-4 py-1">
                  <li className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Money (As Donation or Deposit)
                  </li>
                  <li className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Real Estate ( Open space or a apartment – on rent / sale )
                  </li>
                </ul>

                <h2 className="text-2xl font-extrabold text-[#002b5c] border-b pb-4 mb-8">
                  Donations received during: FY 2024-25
                </h2>
              </div>

              {/* Donor Tables Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Institutional Donors */}
                <div className="border border-slate-200 bg-white flex flex-col h-[600px]">
                  {/* Table Header */}
                  <div className="bg-[#1eb7a6] text-white shrink-0">
                    <div className="py-2.5 px-4 text-center font-bold text-sm tracking-wide">
                      Institutional Donors
                    </div>
                    <div className="flex border-t border-white/20 text-sm font-semibold">
                      <div className="w-16 py-2 text-center border-r border-white/20 shrink-0">Sr.No</div>
                      <div className="flex-1 py-2 px-4">Donor Name</div>
                    </div>
                  </div>
                  {/* Table Body */}
                  <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {institutionalDonors.map((donor, idx) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donation in Kind */}
                <div className="border border-slate-200 bg-white flex flex-col h-[600px]">
                  {/* Table Header */}
                  <div className="bg-[#1eb7a6] text-white shrink-0">
                    <div className="py-2.5 px-4 text-center font-bold text-sm tracking-wide">
                      Donation in Kind
                    </div>
                    <div className="flex border-t border-white/20 text-sm font-semibold">
                      <div className="w-16 py-2 text-center border-r border-white/20 shrink-0">Sr.No</div>
                      <div className="flex-1 py-2 px-4">Donor Name</div>
                    </div>
                  </div>
                  {/* Table Body */}
                  <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {donationInKind.map((donor, idx) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Donors */}
                <div className="border border-slate-200 bg-white flex flex-col h-[600px]">
                  {/* Table Header */}
                  <div className="bg-[#1eb7a6] text-white shrink-0">
                    <div className="py-2.5 px-4 text-center font-bold text-sm tracking-wide">
                      Individual Donors
                    </div>
                    <div className="flex border-t border-white/20 text-sm font-semibold">
                      <div className="w-16 py-2 text-center border-r border-white/20 shrink-0">Sr.No</div>
                      <div className="flex-1 py-2 px-4">Donor Name</div>
                    </div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="overflow-y-auto flex-1 custom-scrollbar relative">
                    {/* Category 1 */}
                    <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                      Donation Rs. 50 Lakh to 1 crore
                    </div>
                    {individualDonors50to1Cr.map((donor, idx) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}

                    {/* Category 2 */}
                    <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-y border-slate-200 sticky top-0 z-20 shadow-sm">
                      Donation Rs. 25 Lakh to 50 Lakh
                    </div>
                    {individualDonors25to50.map((donor, idx) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}

                    {/* Category 3 */}
                    <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-y border-slate-200 sticky top-0 z-20 shadow-sm">
                      Donation Rs. 1 Lakh to 25 Lakh
                    </div>
                    {individualDonors1to25.map((donor, idx) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}

                    {/* Category 4 */}
                    <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-y border-slate-200 sticky top-0 z-20 shadow-sm">
                      Donation upto Rs.1 Lakh
                    </div>
                    {individualDonorsUpto1.map((donor, idx) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
