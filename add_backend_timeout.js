const fs = require('fs');
const path = require('path');

const clientFormPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/events/client-form.tsx');

let content = fs.readFileSync(clientFormPath, 'utf-8');

// 1. import useEffect
content = content.replace(/import React, \{ useState \} from 'react';/, "import React, { useState, useEffect } from 'react';");

// 2. Add state and effect
const hookCode = `  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAllEvents(false);
    }, 120000); // 2 minutes
    return () => clearTimeout(timer);
  }, []);`;
content = content.replace(/  const \[uploadingIdx, setUploadingIdx\] = useState<number \| null>\(null\);/, hookCode);

// 3. Update the map
const mapTarget = `{events.length > 0 && events.map((data, selectedIndex) => (
        <div key={data.id || selectedIndex} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-12">`;
const mapReplacement = `{events.length > 0 && events.map((data, selectedIndex) => {
        if (!showAllEvents && selectedIndex !== events.length - 1) return null;
        return (
        <div key={data.id || selectedIndex} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 mt-12">`;

content = content.replace(mapTarget, mapReplacement);

// 4. Update the closing tags for the map
// Current:
//         </div>
//       ))}
//     </div>
//   );
// }
const closingTarget = `        </div>
      ))}
    </div>
  );
}`;
const closingReplacement = `        </div>
        );
      })}
    </div>
  );
}`;
content = content.replace(closingTarget, closingReplacement);

fs.writeFileSync(clientFormPath, content, 'utf-8');
console.log('client-form.tsx updated successfully');
