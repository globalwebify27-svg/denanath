const fs = require('fs');

const files = [
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/lab-1/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/lab-2/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/lab-3/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/other-facilities/client-form.tsx',
  'c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/academics/simulation-center/home/client-form.tsx'
];

const improvedHeaderImage = `
        <div>
          <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Header Image</label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            {data.image ? (
              <div className="flex items-center gap-6 w-full">
                <div className="relative group shrink-0">
                  <img src={data.image} alt="Header" className="w-40 h-28 object-cover rounded-xl border border-slate-200 shadow-sm" />
                  <button 
                    type="button" 
                    onClick={() => handleChange("image", "")} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                    title="Remove Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
                <div className="relative w-full max-w-sm">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title="Change Image"
                  />
                  <div className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 text-[#007a87] font-bold rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    <span>Change Image</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 hover:border-[#007a87] transition-colors flex flex-col items-center justify-center gap-3 text-slate-500 group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  title="Add Image"
                />
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#007a87] group-hover:scale-110 transition-transform shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div className="font-bold text-slate-700 text-lg">Click to Add Image</div>
                <div className="text-sm">PNG, JPG, JPEG up to 5MB</div>
              </div>
            )}
          </div>
        </div>
`;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the block starting with "<div><label className=\"block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3\">Header Image</label>"
  // and ending with the next "<div><label className=\"block text-[13px]"
  const searchPattern = /<div>\s*<label className="block text-\[13px\] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Header Image<\/label>[\s\S]*?(?=<div>\s*<label className="block text-\[13px\] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Content<\/label>)/;
  
  if (searchPattern.test(content)) {
      content = content.replace(searchPattern, improvedHeaderImage + '\n\n        ');
      fs.writeFileSync(file, content);
      console.log('Updated ' + file);
  } else {
      console.log('Could not find header image block in ' + file);
  }
}
