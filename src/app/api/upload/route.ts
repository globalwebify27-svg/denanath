import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = (formData.get("file") || formData.get("files[0]")) as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Vercel serverless functions do not allow writing to the local file system.
    // As a workaround that doesn't require setting up Cloud Storage (like AWS S3 or Vercel Blob),
    // we convert the image directly to a Base64 string. 
    // This string can be saved in the database and used directly as an image URL.
    const mimeType = file.type || "image/png";
    const base64Data = buffer.toString("base64");
    const fileUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
