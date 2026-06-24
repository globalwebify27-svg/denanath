const fs = require('fs');
const path = require('path');

const labs = ['lab-1', 'lab-2', 'lab-3', 'other-facilities'];
const baseAdminPath = path.join(__dirname, 'src/app/admin/(dashboard)/academics/simulation-center');
const baseFrontendPath = path.join(__dirname, 'src/app/(academics)/simulation-center');

for (const lab of labs) {
  // 1. Update admin page.tsx
  const adminPagePath = path.join(baseAdminPath, lab, 'page.tsx');
  if (fs.existsSync(adminPagePath)) {
    let content = fs.readFileSync(adminPagePath, 'utf8');
    content = content.replace(
      /if \(typeof pageData\.gallery === 'string'\) \{[\s\S]*?\} else if \(\!Array\.isArray\(pageData\.gallery\)\) \{[\s\S]*?\}/,
      `if (typeof pageData.gallery === 'string') {
        pageData.gallery = pageData.gallery ? [{ url: pageData.gallery, name: "" }] : [];
      } else if (!Array.isArray(pageData.gallery)) {
        pageData.gallery = pageData.image ? [{ url: pageData.image, name: "" }] : [];
      } else {
        pageData.gallery = pageData.gallery.map((item: any) => typeof item === 'string' ? { url: item, name: "" } : item);
      }`
    );
    fs.writeFileSync(adminPagePath, content, 'utf8');
  }

  // 2. Update frontend page.tsx
  const frontendPagePath = path.join(baseFrontendPath, lab, 'page.tsx');
  if (fs.existsSync(frontendPagePath)) {
    let content = fs.readFileSync(frontendPagePath, 'utf8');
    
    // Check if it already uses the new mapping
    if (!content.includes('const url = typeof item')) {
      content = content.replace(
        /\{pageData\.gallery\.map\(\(img: string, idx: number\) => \([\s\S]*?\}\)\)/,
        `{pageData.gallery.map((item: any, idx: number) => {
                const url = typeof item === 'string' ? item : item.url;
                const name = typeof item === 'string' ? "" : item.name;
                return (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={url} alt={name || \`\${pageData.title} Image \${idx + 1}\`} className="w-full h-auto max-h-[500px] object-contain bg-slate-50" />
                    {name && <div className="p-4 bg-slate-50 border-t border-slate-200 text-center font-semibold text-slate-700">{name}</div>}
                  </div>
                );
              })}`
      );
      fs.writeFileSync(frontendPagePath, content, 'utf8');
    }
  }

  // 3. Update admin client-form.tsx
  const clientFormPath = path.join(baseAdminPath, lab, 'client-form.tsx');
  if (fs.existsSync(clientFormPath)) {
    let content = fs.readFileSync(clientFormPath, 'utf8');

    // Replace handleAddHeaderImage
    content = content.replace(
      /gallery: \[\.\.\.\(prev\.gallery \|\| \[\]\), ""\]/,
      `gallery: [...(prev.gallery || []), { url: "", name: "" }]`
    );

    // Replace handleHeaderImageChange
    content = content.replace(
      /const newGallery = \[\.\.\.\(prev\.gallery \|\| \[\]\)\];\s*newGallery\[index\] = reader\.result;\s*\/\/ Sync the first image to `data\.image` for backwards compatibility with frontend\s*return \{ \.\.\.prev, gallery: newGallery, image: newGallery\.length > 0 \? newGallery\[0\] : "" \};/,
      `const newGallery = [...(prev.gallery || [])];
          if (typeof newGallery[index] === 'string') {
            newGallery[index] = { url: reader.result, name: "" };
          } else {
            newGallery[index] = { ...newGallery[index], url: reader.result };
          }
          return { ...prev, gallery: newGallery, image: newGallery.length > 0 ? (typeof newGallery[0] === 'string' ? newGallery[0] : newGallery[0].url) : "" };`
    );

    // Add handleImageNameChange
    if (!content.includes('handleImageNameChange')) {
      content = content.replace(
        /const removeHeaderImage = \(index: number\) => \{/,
        `const handleImageNameChange = (index: number, name: string) => {
    setData((prev: any) => {
      const newGallery = [...(prev.gallery || [])];
      if (typeof newGallery[index] === 'string') {
        newGallery[index] = { url: newGallery[index], name };
      } else {
        newGallery[index] = { ...newGallery[index], name };
      }
      return { ...prev, gallery: newGallery };
    });
  };

  const removeHeaderImage = (index: number) => {`
      );
    }

    // Replace removeHeaderImage
    content = content.replace(
      /image: newGallery\.length > 0 \? newGallery\[0\] : ""/,
      `image: newGallery.length > 0 ? (typeof newGallery[0] === 'string' ? newGallery[0] : newGallery[0].url) : ""`
    );

    // Replace JSX map loop signature and add name inputs
    if (!content.includes('const url = typeof img === \'string\' ? img : img.url;')) {
      content = content.replace(
        /\{data\.gallery\.map\(\(img: string, idx: number\) => \(/,
        `{data.gallery.map((img: any, idx: number) => {
                  const url = typeof img === 'string' ? img : img.url;
                  const name = typeof img === 'string' ? "" : (img.name || "");
                  return (`
      );

      // Close the map loop correctly
      content = content.replace(
        /\}\)\}\s*<\/div>\s*\)\}/,
        `  );
                })}
              </div>
            )}`
      );

      // Replace img reference in preview
      content = content.replace(
        /\{img \?\s*\(\s*<img src=\{img\} alt=\{`Header Image \$\{idx \+ 1\}`\} className="w-full h-full object-cover" \/>\s*\)/,
        `{url ? (
                        <img src={url} alt={\`Header Image \${idx + 1}\`} className="w-full h-full object-cover" />
                      )`
      );

      // Add image name input
      content = content.replace(
        /<div>\s*<label className="block text-\[11px\] font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Photo<\/label>[\s\S]*?<\/div>\s*<\/div>/,
        `<div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Photo</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleHeaderImageChange(idx, e)}
                          className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#002b5c] file:text-white hover:file:bg-[#001f44] transition-all cursor-pointer bg-slate-50 rounded-md border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Image Caption / Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => handleImageNameChange(idx, e.target.value)}
                          placeholder="e.g. ICU Simulator"
                          className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all"
                        />
                      </div>
                    </div>`
      );
      
      fs.writeFileSync(clientFormPath, content, 'utf8');
    }
  }
}
