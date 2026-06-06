import os
import re

directory = r"c:\Users\91870\Desktop\globalwebify\denanath\src\app\admin\(dashboard)"

# The pattern matches the basic header block.
pattern = re.compile(
    r'<div className="mb-8">\s*<h1 className="text-\[36px\] font-\[800\] leading-\[40px\] text-\[#002b5c\] tracking-tight mb-2">(.*?)</h1>\s*<p className="text-\[14px\] font-\[600\] text-gray-500">(.*?)</p>\s*</div>',
    re.DOTALL
)

def replace_header(match):
    title = match.group(1).strip()
    desc = match.group(2).strip()
    return f'''<div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            {title}
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            {desc}
          </p>
        </div>
      </div>'''

updated_count = 0
for root, _, files in os.walk(directory):
    if "page.tsx" in files:
        filepath = os.path.join(root, "page.tsx")
        # skip about-hospital as it's already customized
        if "about-hospital" in filepath:
            continue
            
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content, count = pattern.subn(replace_header, content)
        
        if count > 0:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated_count += 1
            print(f"Updated {filepath}")

print(f"Total files updated: {updated_count}")
