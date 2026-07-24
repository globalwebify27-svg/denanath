const fs = require('fs');
const path = require('path');

const clientPagePath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/events/client-page.tsx');
const clientFormPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/events/client-form.tsx');

function replaceLogic(content, isFrontend) {
  // Remove the useEffect and state
  content = content.replace(/  const \[showAllEvents, setShowAllEvents\] = useState\(true\);\s*useEffect\(\(\) => \{\s*const timer = setTimeout\(\(\) => \{\s*setShowAllEvents\(false\);\s*\}, 120000\); \/\/ 2 minutes\s*return \(\) => clearTimeout\(timer\);\s*\}, \[\]\);/, "");
  // For frontend:
  if (isFrontend) {
    content = content.replace(
      /  const displayedEvents = showAllEvents \? events : \(events\.length > 0 \? \[events\[events\.length - 1\]\] : \[\]\);/,
      `  const now = Date.now();
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  
  const displayedEvents = events.filter((data, index) => {
    if (index === events.length - 1) return true; // Always show the latest event just in case
    const eventDate = new Date(data.date);
    if (!isNaN(eventDate.getTime()) && (now - eventDate.getTime() > THIRTY_DAYS)) {
      return false; // Hide if older than 30 days
    }
    return true;
  });`
    );
  } else {
    // For backend:
    content = content.replace(
      /        if \(!showAllEvents && selectedIndex !== events\.length - 1\) return null;/,
      `        const now = Date.now();
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        const eventDate = new Date(data.date);
        const isOld = !isNaN(eventDate.getTime()) && (now - eventDate.getTime() > THIRTY_DAYS);
        if (isOld && selectedIndex !== events.length - 1) return null;`
    );
  }
  return content;
}

let pageContent = fs.readFileSync(clientPagePath, 'utf-8');
pageContent = replaceLogic(pageContent, true);
fs.writeFileSync(clientPagePath, pageContent, 'utf-8');

let formContent = fs.readFileSync(clientFormPath, 'utf-8');
formContent = replaceLogic(formContent, false);
fs.writeFileSync(clientFormPath, formContent, 'utf-8');

console.log("Updated both frontend and backend for 30-day logic.");
