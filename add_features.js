const fs = require('fs');
const path = require('path');

const clientFormPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/events/client-form.tsx');
const clientPagePath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/events/client-page.tsx');

let formContent = fs.readFileSync(clientFormPath, 'utf-8');
let pageContent = fs.readFileSync(clientPagePath, 'utf-8');

// Update client-form.tsx typings
formContent = formContent.replace(/'overview' \| 'objectives' \| 'gallery'/g, "'overview' | 'objectives' | 'features' | 'gallery'");

// Add Key Features block in client-form.tsx
const featuresFormBlock = `
          {/* Key Features */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <input type="text" value={data.featuresTitle !== undefined ? data.featuresTitle : "Key Features"} onChange={e => updateField(selectedIndex, "featuresTitle", e.target.value)} className="text-[20px] font-black text-[#002b5c] bg-transparent border-b-2 border-transparent hover:border-slate-200 focus:border-[#007a87] focus:ring-0 p-0 m-0 w-full max-w-[300px] transition-colors" />
              <button type="button" onClick={() => addArrayItem(selectedIndex, 'features')} className="px-4 py-2 text-sm bg-[#002b5c] text-white rounded-lg hover:bg-[#001a38] hover:shadow-sm flex items-center gap-2 font-bold transition-all duration-300">
                <Plus size={16} /> Add Feature
              </button>
            </div>
            <div className="space-y-4">
              {(data.features || []).map((feat: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="text-slate-400 cursor-move"><GripVertical size={20} /></div>
                  <input type="text" value={feat} onChange={e => updateArrayItem(selectedIndex, 'features', idx, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87]" placeholder="Feature description..." />
                  <button type="button" onClick={() => removeArrayItem(selectedIndex, 'features', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
`;
formContent = formContent.replace(/\{\/\* Organizers \*\/\}/, featuresFormBlock.trim() + '\n\n          {/* Organizers */}');
fs.writeFileSync(clientFormPath, formContent, 'utf-8');

// Update client-page.tsx
pageContent = pageContent.replace(
  /overviewTitle, objectivesTitle, organizersTitle, agendaTitle, galleryTitle \} = event;/g,
  'overviewTitle, objectivesTitle, organizersTitle, agendaTitle, galleryTitle, features, featuresTitle } = event;'
);

const featuresPageBlock = `
                  {/* Key Features */}
                  {features && features.length > 0 && features[0] !== "" && (
                    <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-6 h-6 text-[#005f6b]" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">{featuresTitle || "Key Features"}</h2>
                      </div>
                      <ul className="space-y-4">
                        {features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                            <CheckCircle2 className="w-6 h-6 text-[#00a69c] shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-[18px] leading-[31px] font-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
`;

pageContent = pageContent.replace(/\{\/\* Summary \*\/\}/, featuresPageBlock.trim() + '\n\n                  {/* Summary */}');
fs.writeFileSync(clientPagePath, pageContent, 'utf-8');
console.log('Added Key Features section successfully.');
