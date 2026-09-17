#!/bin/bash
sed -i '' '/if (found && found.status !== "Completed" && activeConsultation?._id !== found._id) {/i\
      if (found \&\& found.status === "Completed") {\
        window.location.href = "/doctor/appointments";\
        return;\
      }\
' /Users/ahmadsana/Documents/intima-health/src/app/doctor/consultations/page.tsx
