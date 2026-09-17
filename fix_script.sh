#!/bin/bash
sed -i '' 's/const aptId = updated.appointmentId;/const aptId = (updated.appointmentId as any)?._id || updated.appointmentId;/' /Users/ahmadsana/Documents/intima-health/src/modules/consultations/service.ts
