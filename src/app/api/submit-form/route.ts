import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract formType
    const formType = formData.get("formType") as string;
    if (!formType) {
      return NextResponse.json({ error: "Missing formType" }, { status: 400 });
    }

    const data: Record<string, any> = {};
    const filesArray: string[] = [];

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "public", "uploads", "submissions");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Process all fields
    for (const [key, value] of formData.entries()) {
      if (key === "formType") continue;

      if (value instanceof File) {
        if (value.size > 0 && value.name) {
          // It's an actual file
          const bytes = await value.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          // Generate unique filename
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = value.name.split(".").pop() || "bin";
          const filename = `${key}-${uniqueSuffix}.${ext}`;
          
          // Save file
          const filepath = join(uploadDir, filename);
          await writeFile(filepath, buffer);
          
          // Store relative path for frontend access
          filesArray.push(`/uploads/submissions/${filename}`);
          
          // Also put a reference in the data object
          data[key] = `/uploads/submissions/${filename}`;
        }
      } else {
        // It's a regular text field
        data[key] = value;
      }
    }

    // Save to database
    const submission = await prisma.formSubmission.create({
      data: {
        formType,
        data: JSON.stringify(data),
        files: JSON.stringify(filesArray),
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
    
  } catch (error: any) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form", details: error.message },
      { status: 500 }
    );
  }
}
