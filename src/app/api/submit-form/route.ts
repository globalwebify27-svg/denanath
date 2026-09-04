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
          // Convert to base64 instead of saving to read-only filesystem (Vercel)
          const bytes = await value.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const mimeType = value.type || 'application/octet-stream';
          const base64DataUri = `data:${mimeType};base64,${buffer.toString('base64')}`;
          
          filesArray.push(base64DataUri);
          data[key] = base64DataUri;
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

    // Send Email Notification
    try {
      const nodemailer = require("nodemailer");
      const mailSetting = await prisma.siteSetting.findUnique({ where: { key: "mail_config" } });
      if (mailSetting && mailSetting.value) {
        const config = JSON.parse(mailSetting.value);
        if (config.smtpHost && config.smtpPort && config.smtpUser && config.smtpPass && config.fromEmail) {
          const secure = config.encryption === 'ssl';
          const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: parseInt(config.smtpPort),
            secure: secure,
            auth: {
              user: config.smtpUser,
              pass: config.smtpPass,
            },
            tls: config.encryption === 'tls' ? {
              ciphers: 'SSLv3',
              rejectUnauthorized: false
            } : undefined
          });

          let htmlContent = `
          <!DOCTYPE html>
          <html>
          <body style="font-family: sans-serif; background: #f4f7f6; padding: 20px;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #002b5c;">New ${formType}</h2>
              <table width="100%" cellpadding="10" border="1" style="border-collapse: collapse; border-color: #eee;">
          `;
          const attachments: any[] = [];
          for (const k in data) {
             const val = data[k];
             const formattedKey = k.replace(/[-_]/g, ' ').replace(/^./, str => str.toUpperCase());
             if (typeof val === 'string' && val.startsWith('data:')) {
                htmlContent += `<tr><td width="30%"><b>${formattedKey}</b></td><td>File attached to this email</td></tr>`;
                const mime = val.split(';')[0].split(':')[1];
                const base64 = val.split(',')[1];
                let ext = 'bin';
                if (mime.includes('pdf')) ext = 'pdf';
                else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
                else if (mime.includes('png')) ext = 'png';
                attachments.push({ filename: `${k}.${ext}`, content: Buffer.from(base64, 'base64'), contentType: mime });
             } else {
                htmlContent += `<tr><td width="30%"><b>${formattedKey}</b></td><td>${val}</td></tr>`;
             }
          }
          htmlContent += `</table></div></body></html>`;

          await transporter.sendMail({
            from: `"${config.fromName || 'Website Form'}" <${config.fromEmail}>`,
            to: config.fromEmail,
            replyTo: data.email || undefined,
            subject: `New Submission: ${formType}`,
            html: htmlContent,
            attachments
          });
        }
      }
    } catch (e) {
      console.error("Email error:", e);
    }

    return NextResponse.json({ success: true, id: submission.id });
    
  } catch (error: any) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form", details: error.message },
      { status: 500 }
    );
  }
}
