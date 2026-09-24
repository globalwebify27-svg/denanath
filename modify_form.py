import re

with open("src/app/admin/(dashboard)/patient-visitors/in-patient/client-form.tsx", "r") as f:
    content = f.read()

# Make add room use images: [] instead of image: "/images/hospital.webp"
content = content.replace(
    'image: "/images/hospital.webp"',
    'images: ["/images/hospital.webp"]'
).replace(
    'image: "/images/hospital1.webp"',
    'images: ["/images/hospital1.webp"]'
)

# Function to generate multi-image UI
def get_multi_image_ui(update_fn):
    return f"""                    <div className="col-span-12 flex flex-col gap-3 bg-slate-50 p-3 rounded border border-slate-200 mt-2">
                      <div className="flex flex-wrap gap-2">
                        {{(r.images || (r.image ? [r.image] : [])).map((imgUrl: string, imgIdx: number) => (
                          <div key={{imgIdx}} className="relative group shrink-0">
                            <img src={{imgUrl}} alt="Preview" className="w-16 h-16 object-cover rounded border border-gray-200 bg-white" />
                            <button
                              type="button"
                              onClick={{() => {update_fn}(r.id, 'images', (r.images || (r.image ? [r.image] : [])).filter((_: any, i: number) => i !== imgIdx))}}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              x
                            </button>
                          </div>
                        ))}}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={{async (e) => {{
                            const files = Array.from(e.target.files || []);
                            if (files.length > 0) {{
                              const uploadedUrls = [];
                              for (const file of files) {{
                                const formData = new FormData();
                                formData.append('file', file);
                                try {{
                                  const res = await fetch('/api/upload', {{ method: 'POST', body: formData }});
                                  const data = await res.json();
                                  if (data.url) uploadedUrls.push(data.url);
                                }} catch (err) {{
                                  console.error('Upload error:', err);
                                }}
                              }}
                              const currentImages = r.images || (r.image ? [r.image] : []);
                              {update_fn}(r.id, 'images', [...currentImages, ...uploadedUrls]);
                            }}
                          }}}}
                          className="w-full text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                        />
                      </div>
                    </div>"""

# Replace the single image UI for Main Building
old_main_ui = """                    <div className="col-span-12 flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3 rounded border border-slate-200 mt-2">
                      {r.image && (
                        <div className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.image} alt="Preview" className="w-12 h-12 object-cover rounded border border-gray-200 bg-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const formData = new FormData();
      formData.append('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
                                updateMainRoom(r.id, 'image', data.url);
                              } else { alert('Upload failed'); }
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload error');
      });
                            }
                          }}
                          className="w-full text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#007a87]/10 file:text-[#007a87] hover:file:bg-[#007a87]/20 cursor-pointer"
                        />
                      </div>
                      {r.image && (
                        <button
                          type="button"
                          onClick={() => updateMainRoom(r.id, 'image', "")}
                          className="text-[#D9232D] text-xs font-bold px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors shrink-0"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>"""

old_super_ui = old_main_ui.replace("updateMainRoom", "updateSuperRoom")

content = content.replace(old_main_ui, get_multi_image_ui("updateMainRoom"))
content = content.replace(old_super_ui, get_multi_image_ui("updateSuperRoom"))

with open("src/app/admin/(dashboard)/patient-visitors/in-patient/client-form.tsx", "w") as f:
    f.write(content)
