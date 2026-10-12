import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

async function saveLocally(file: File, buffer: Buffer): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  }
  const originalExt = path.extname(file.name || "");
  const fallbackExt = file.type === "application/pdf" ? ".pdf" : file.type?.startsWith("image/") ? ".png" : "";
  const ext = originalExt || fallbackExt;
  const rawBase = path.basename(file.name || "file", originalExt);
  const cleanBase = (rawBase.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40) || "upload");
  const filename = `${cleanBase}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
  const filepath = path.join(uploadDir, filename);
  await fs.promises.writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("files[0]")) as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf = file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");
    const ext = path.extname(file.name || "") || (isPdf ? ".pdf" : "");
    const originalName = file.name ? path.basename(file.name, ext) : undefined;
    const customName = formData.get("customName") as string;
    const rawPublicId = customName || originalName || "file";
    const cleanPublicId = rawPublicId.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60);
    const finalPublicId = isPdf && !cleanPublicId.endsWith(".pdf")
      ? `${cleanPublicId}-${Date.now()}.pdf`
      : `${cleanPublicId}-${Date.now()}`;

    // If Cloudinary is configured, try Cloudinary first
    if (isCloudinaryConfigured) {
      try {
        const uploadResult: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folder,
              resource_type: isPdf ? "raw" : "auto",
              public_id: finalPublicId,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        if (uploadResult?.secure_url) {
          return NextResponse.json({ url: uploadResult.secure_url });
        }
      } catch (cloudinaryError) {
        console.warn("Cloudinary upload failed, falling back to local storage:", cloudinaryError);
        // Fall back to local storage below
      }
    }

    // Local storage fallback
    const localUrl = await saveLocally(file, buffer);
    return NextResponse.json({ url: localUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

