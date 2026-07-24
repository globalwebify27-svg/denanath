import os

files_to_update = [
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/events/client-page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/ec-approval/page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/disclaimer/page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/(academics)/laryngology-fellowship/client-page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/(academics)/vasant-nirmala-oswal-centre/client-page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/(academics)/neuro-radiology-fellowship/client-page.tsx"
]

target1 = 'className="relative bg-gradient-to-r from-[#004d56] to-[#007b8a] pt-24 pb-16 overflow-hidden"'
rep1 = 'className="w-full bg-[#002b5c] relative overflow-hidden pt-24 pb-16"'

target2 = '{/* Abstract Background Shapes */}'

# The exact strings might have newlines, so we do replace.
rep2 = """{/* Abstract Background Shapes */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />"""

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace(target1, rep1)
        
        # Now we need to remove the two abstract background shape divs that follow target2.
        # So we split by target2, and for the second part, we remove the first two lines containing the old shapes.
        parts = content.split(target2)
        if len(parts) == 2:
            lines = parts[1].split('\\n')
            # The next two lines are the divs we want to remove.
            # lines[0] might be empty or whitespace.
            # Let's just find and replace the whole block using regex in python.
            import re
            content = re.sub(
                r'\{\/\* Abstract Background Shapes \*\/\}[\s\S]*?<div className="absolute bottom-0 left-0 w-\[400px\] h-\[400px\] bg-\[#d9232d\]\/20 rounded-full blur-\[100px\] pointer-events-none" \/>',
                rep2,
                content
            )
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")
    else:
        print(f"Not found: {filepath}")
