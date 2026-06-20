"use server";

import { prisma } from "@/lib/prisma";

export async function submitFormAction(formType: string, formData: FormData) {
  try {
    const data: Record<string, any> = {};
    
    // Process form data
    formData.forEach((value, key) => {
      // Handle file uploads (skip for now or handle as string if it's a path)
      if (value instanceof File) {
        // Just store the file name for now if it's a raw file
        data[key] = value.name;
      } else {
        // If there are multiple values for the same key, convert to array
        if (data[key] !== undefined) {
          if (!Array.isArray(data[key])) {
            data[key] = [data[key]];
          }
          data[key].push(value);
        } else {
          data[key] = value;
        }
      }
    });

    await prisma.formSubmission.create({
      data: {
        formType,
        data: JSON.stringify(data),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit form:", error);
    return { success: false, error: "Failed to submit form" };
  }
}
