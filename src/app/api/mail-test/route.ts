import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { smtpHost, smtpPort, smtpUser, smtpPass, encryption, fromEmail, fromName, toEmail } = body;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const secure = encryption === 'ssl';
    
    // Some basic TLS config
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: secure, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: encryption === 'tls' ? {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      } : undefined
    });

    const mailOptions = {
      from: `"${fromName || 'Test Mail'}" <${fromEmail}>`,
      to: toEmail,
      subject: 'Test Email from Admin Panel',
      text: 'Hello! This is a test email sent from your website\'s Mail Configuration module. If you are receiving this, your SMTP settings are working perfectly!',
      html: '<h2>Hello!</h2><p>This is a test email sent from your website\'s Mail Configuration module. If you are receiving this, your SMTP settings are working perfectly!</p>'
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Test email sent successfully!', info });
  } catch (error: any) {
    console.error('Mail test error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Failed to send email' }, { status: 500 });
  }
}
