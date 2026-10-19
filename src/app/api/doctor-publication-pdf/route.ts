import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  const rawName = searchParams.get("name") || "Doctor_Publication.pdf";
  const isDownload = searchParams.get("download") === "1" || searchParams.get("download") === "true";

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Sanitize filename to prevent header injection or invalid characters
  const cleanName = rawName.replace(/[^a-zA-Z0-9_\-\.\s]/g, "_").trim();
  const filename = cleanName.toLowerCase().endsWith(".pdf") ? cleanName : `${cleanName}.pdf`;
  const dispositionType = isDownload ? "attachment" : "inline";
  const contentDisposition = `${dispositionType}; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`;

  try {
    // 1. Local upload handling (e.g. /uploads/...)
    if (targetUrl.startsWith("/uploads/")) {
      const localPath = path.join(process.cwd(), "public", targetUrl);
      if (fs.existsSync(localPath)) {
        const fileBuffer = await fs.promises.readFile(localPath);
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": contentDisposition,
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    }

    // 2. Remote URL handling (Cloudinary, dmhospital.org, etc.)
    const parsedTarget = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsedTarget.protocol)) {
      return NextResponse.json({ error: "Invalid protocol" }, { status: 400 });
    }

    const upstreamRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/pdf, application/octet-stream, */*',
      },
    });
    if (!upstreamRes.ok) {
      return NextResponse.json(
        { error: `Upstream resource error: ${upstreamRes.status}` },
        { status: upstreamRes.status }
      );
    }

    const arrayBuffer = await upstreamRes.arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": contentDisposition,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    console.error("Error proxying doctor publication PDF:", error);
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 500 });
  }
}
