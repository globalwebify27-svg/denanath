import re

with open("src/app/(patient-guide)/in-patient/client-page.tsx", "r") as f:
    content = f.read()

# Create the AutoSwipingRoomCard component
auto_swipe_component = """
function AutoSwipingRoomCard({ room, defaultImage }: { room: any, defaultImage: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = (room.images && room.images.length > 0) ? room.images : [room.image || defaultImage];
  const totalImages = images.length;

  React.useEffect(() => {
    if (totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalImages]);

  React.useEffect(() => {
    if (scrollRef.current && totalImages > 1) {
      const container = scrollRef.current;
      const width = container.clientWidth;
      container.scrollTo({ left: width * currentIndex, behavior: 'smooth' });
    }
  }, [currentIndex, totalImages]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#D9232D] hover:shadow-md transition-all group overflow-hidden flex flex-col">
      <div 
        ref={scrollRef}
        className="relative h-48 bg-slate-100 flex overflow-x-hidden snap-x snap-mandatory"
      >
        {images.map((imgUrl: string, idx: number) => (
          <div key={idx} className="relative w-full shrink-0 snap-center h-full">
            <img src={imgUrl} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-[#002b5c]/20 to-transparent pointer-events-none" />
        <Bed className="absolute bottom-4 right-4 w-6 h-6 text-white/90 drop-shadow-md z-10" />
        {room.rate && room.rate !== "-" && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#007a87] px-3 py-1 rounded-lg font-extrabold text-sm shadow-sm z-10">
            Rs. {room.rate}
          </div>
        )}
        {totalImages > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h5 className="font-bold text-base text-[#002b5c] group-hover:text-[#D9232D] transition-colors mb-3 leading-tight">{room.name}</h5>
        {room.fac && room.fac !== "-" && <p className="text-sm text-slate-600 leading-relaxed flex-1">{room.fac}</p>}
      </div>
    </div>
  );
}
"""

if "AutoSwipingRoomCard" not in content:
    # Insert component before default export
    export_index = content.find("export default function InPatientClientPage")
    content = content[:export_index] + auto_swipe_component + "\n" + content[export_index:]

# Replace main building room rendering
old_main_map_match = re.search(r'\{mainBuildingRooms\.map\(\(room: any, i: number\) => \(\s*<div key=\{i\} className="bg-white rounded-2xl border border-slate-200.*?</div>\s*</div>\s*\)\}', content, re.DOTALL)
if old_main_map_match:
    content = content.replace(
        old_main_map_match.group(0),
        '{mainBuildingRooms.map((room: any, i: number) => <AutoSwipingRoomCard key={i} room={room} defaultImage="/images/hospital.webp" />)}'
    )

# Replace super specialty room rendering
old_super_map_match = re.search(r'\{superSpecialityRooms\.map\(\(room: any, i: number\) => \(\s*<div key=\{i\} className="bg-white rounded-2xl border border-slate-200.*?</div>\s*</div>\s*\)\}', content, re.DOTALL)
if old_super_map_match:
    content = content.replace(
        old_super_map_match.group(0),
        '{superSpecialityRooms.map((room: any, i: number) => <AutoSwipingRoomCard key={i} room={room} defaultImage="/images/hospital1.webp" />)}'
    )

with open("src/app/(patient-guide)/in-patient/client-page.tsx", "w") as f:
    f.write(content)
