const fs = require('fs');
const path = require('path');

const clientPagePath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/events/client-page.tsx');

let content = fs.readFileSync(clientPagePath, 'utf-8');

// Add useEffect to imports
content = content.replace(/import React, \{ useState \} from 'react';/, "import React, { useState, useEffect } from 'react';");

// Add showAllEvents state and useEffect
const hookCode = `  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAllEvents(false);
    }, 120000); // 2 minutes
    return () => clearTimeout(timer);
  }, []);

  const displayedEvents = showAllEvents ? events : (events.length > 0 ? [events[events.length - 1]] : []);
`;
content = content.replace(/  const \[selectedImage, setSelectedImage\] = useState<string \| null>\(null\);/, hookCode);

// Replace events.map with displayedEvents.map
content = content.replace(/\{events\.map\(\(event, index\) => \{/g, "{displayedEvents.map((event, index) => {");

fs.writeFileSync(clientPagePath, content, 'utf-8');
console.log('client-page.tsx updated successfully');
