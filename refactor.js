const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/admin/(dashboard)/events/client-form.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove the tabs rendering
content = content.replace(/<div className="flex flex-wrap gap-2 pt-2">[\s\S]*?<\/div>\s*<\/div>/, '</div>');

// 2. Change the event rendering from single selected to map over all events
content = content.replace(/{events\.length > 0 && \(\s*<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">/, `{events.length > 0 && events.map((data, selectedIndex) => (
        <div key={data.id || selectedIndex} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 p-4 md:p-8 border-2 border-slate-200 rounded-3xl relative mt-8">
          <div className="absolute top-6 right-6 z-10">
              <button
                type="button"
                onClick={() => handleDeleteEvent(selectedIndex)}
                className="px-4 py-2 bg-red-50 text-red-500 font-bold rounded-lg hover:bg-red-100 flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete Event
              </button>
          </div>
          <h2 className="text-[28px] font-black text-[#002b5c] mb-8 border-b pb-4">Event {selectedIndex + 1}: {data.title || 'New Event'}</h2>`);

// 3. Update the closing tags for the map
content = content.replace(/<\/div>\s*\)\}\s*<\/div>\s*\);\s*\}/, `        </div>
      ))}
    </div>
  );
}`);

// 4. Update the subtitle text
content = content.replace(/Select an event to edit or add a new one\./, 'Manage events individually below.');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('client-form updated successfully.');
