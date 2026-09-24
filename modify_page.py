import re

with open("src/app/(patient-guide)/in-patient/client-page.tsx", "r") as f:
    content = f.read()

# For the frontend we should map over images if it exists, otherwise fall back to image.
# We can use a simple CSS overflow-x-auto snap container for multiple images.

old_main_image = """                            <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                              <img src={room.image || "/images/hospital.webp"} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-[#002b5c]/20 to-transparent" />
                              <Bed className="absolute bottom-4 right-4 w-6 h-6 text-white/90 drop-shadow-md" />
                              {room.rate && room.rate !== "-" && (
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#007a87] px-3 py-1 rounded-lg font-extrabold text-sm shadow-sm">
                                  Rs. {room.rate}
                                </div>
                              )}
                            </div>"""

new_image_ui = """                            <div className="relative h-48 bg-slate-100 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                              {((room.images && room.images.length > 0) ? room.images : [room.image || "/images/hospital.webp"]).map((imgUrl: string, idx: number) => (
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
                              {((room.images && room.images.length > 0) ? room.images : [room.image]).length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-10 backdrop-blur-sm">
                                  Swipe
                                </div>
                              )}
                            </div>"""

content = content.replace(old_main_image, new_image_ui)

# Update super specialty building as well
old_super_image = """                            <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                              <img src={room.image || "/images/hospital1.webp"} alt="Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-[#002b5c]/20 to-transparent" />
                              <Bed className="absolute bottom-4 right-4 w-6 h-6 text-white/90 drop-shadow-md" />
                              {room.rate && room.rate !== "-" && (
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#007a87] px-3 py-1 rounded-lg font-extrabold text-sm shadow-sm">
                                  Rs. {room.rate}
                                </div>
                              )}
                            </div>"""

new_super_image_ui = new_image_ui.replace("/images/hospital.webp", "/images/hospital1.webp")

content = content.replace(old_super_image, new_super_image_ui)

with open("src/app/(patient-guide)/in-patient/client-page.tsx", "w") as f:
    f.write(content)
