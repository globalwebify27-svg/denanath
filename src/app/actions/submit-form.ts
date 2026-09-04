"use server";

import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";
import nodemailer from "nodemailer";

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

    // Try sending email if SMTP is configured
    try {
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

          // Build email content with a premium template
          let htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; color: #333333;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7f6; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #002b5c; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 1px;">New ${formType} Submission</h1>
                      </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #555555;">
                          Hello,<br><br>
                          You have received a new submission from your website's <strong>${formType}</strong> form. Below are the details:
                        </p>
                        
                        <table width="100%" cellpadding="15" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 20px;">
          `;

          for (const key in data) {
             // Format key: capitalize first letter and replace dashes/underscores with spaces
             const formattedKey = key.replace(/[-_]/g, ' ').replace(/^./, str => str.toUpperCase());
             htmlContent += `
                          <tr>
                            <td width="35%" style="border-bottom: 1px solid #eeeeee; font-weight: 600; color: #007a87; font-size: 14px; text-transform: capitalize; vertical-align: top;">
                              ${formattedKey}
                            </td>
                            <td width="65%" style="border-bottom: 1px solid #eeeeee; color: #333333; font-size: 15px; line-height: 1.5;">
                              ${data[key]}
                            </td>
                          </tr>
             `;
          }

          htmlContent += `
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
                        <p style="margin: 0; font-size: 13px; color: #888888;">
                          This email was generated automatically by your website.<br>
                          Please do not reply directly to this automated notification.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
          `;

          const mailOptions = {
            from: `"${config.fromName || 'Website Contact Form'}" <${config.fromEmail}>`,
            to: config.fromEmail, // Send to the configured admin email
            replyTo: data.email || undefined,
            subject: `New Submission: ${formType}`,
            html: htmlContent
          };

          await transporter.sendMail(mailOptions);
        }
      }
    } catch (mailError) {
      console.error("Failed to send email notification:", mailError);
      // We don't fail the submission if email fails
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit form:", error);
    return { success: false, error: "Failed to submit form" };
  }
}
