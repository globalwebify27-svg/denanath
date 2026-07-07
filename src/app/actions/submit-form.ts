"use server";

import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function submitFormAction(formType: string, formData: FormData) {
  try {
    const data: Record<string, any> = {};
    
    // Process form data
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.name) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const filename = `${Date.now()}-${value.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        data[key] = `/uploads/${filename}`;
      } else if (typeof value === 'string') {
        if (data[key] !== undefined) {
          if (!Array.isArray(data[key])) {
            data[key] = [data[key]];
          }
          data[key].push(value);
        } else {
          data[key] = value;
        }
      }
    }

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
