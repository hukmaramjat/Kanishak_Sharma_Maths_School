import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { createServer as createViteServer } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory OTP Store (email -> { otp, expiresAt })
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

// Reusable transporter helper
async function getTransporter() {
  let transporter: nodemailer.Transporter;
  let fromAddress = process.env.SMTP_FROM || '"Kanishak Sharma Maths School" <no-reply@ksmathsschool.com>';

  // Check if custom SMTP is configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    let host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    // Strip any protocol prefixes or leading slashes (e.g., "smtp://smtp.gmail.com" -> "smtp.gmail.com", "//gmail.com" -> "gmail.com")
    host = host.replace(/^(?:[a-zA-Z]+:)?\/\/+/, '');
    host = host.replace(/^smtp:/i, '');
    host = host.trim();
    if (!host) {
      host = "smtp.gmail.com";
    }

    console.log(`[SMTP] Using configured SMTP credentials with sanitized host: "${host}"`);
    transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    console.log("[SMTP] Custom SMTP credentials not detected. Creating ephemeral Ethereal test account...");
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    fromAddress = `"Kanishak Sharma Maths School (Test)" <${testAccount.user}>`;
  }

  return { transporter, fromAddress };
}

// API Route: Send OTP
app.post("/api/auth/otp/send", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ success: false, error: "Please enter a valid email address." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  
  // Generate 6-digit random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP with 5-minute expiry
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(normalizedEmail, { otp, expiresAt });

  console.log(`[AUTH] Generated OTP for ${normalizedEmail}: ${otp}`);

  try {
    const { transporter, fromAddress } = await getTransporter();

    // HTML Email Template
    const mailOptions = {
      from: fromAddress,
      to: normalizedEmail,
      subject: "Verification Code: Kanishak Sharma Maths School",
      text: `Your 6-digit verification OTP is: ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #fe6b00; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">KANISHAK SHARMA</h2>
            <p style="color: #000928; margin: 2px 0 0 0; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Maths School</p>
          </div>
          
          <div style="border-top: 2px solid #fe6b00; padding-top: 25px;">
            <p style="font-size: 15px; color: #333333; line-height: 1.6; margin-top: 0;">Hello,</p>
            <p style="font-size: 15px; color: #333333; line-height: 1.6;">You are logging in or signing up for the Kanishak Sharma Maths School Portal. Please use the following 6-digit verification code to complete your login:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; background-color: #fcf6f2; border: 1px dashed #fe6b00; color: #fe6b00; font-size: 32px; font-weight: 800; letter-spacing: 6px; padding: 12px 30px; border-radius: 12px; font-family: monospace;">${otp}</span>
            </div>
            
            <p style="font-size: 13px; color: #666666; line-height: 1.5; margin-bottom: 0;"><strong>Security Notice:</strong> This code is valid for exactly 5 minutes. Do not share this OTP with anyone, including members of our admissions team.</p>
          </div>

          <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #f0f0f0; text-align: center;">
            <p style="font-size: 11px; color: #999999; margin: 0;">&copy; 2026 Kanishak Sharma Maths School. All rights reserved.</p>
            <p style="font-size: 10px; color: #bbbbbb; margin: 4px 0 0 0;">Dedicated to conceptual clarity and deep analytical mastery.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP] Email successfully dispatched to ${normalizedEmail}. MessageId: ${info.messageId}`);
    
    // If using Ethereal, log a link where the developer can view the email
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[SMTP] [TEST PREVIEW] View sent email at: ${previewUrl}`);
    }

    return res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully!",
      previewUrl: previewUrl || undefined,
      // For effortless testing if no custom SMTP credentials are set
      isTestAccount: !process.env.SMTP_USER,
      testOtp: !process.env.SMTP_USER ? otp : undefined
    });

  } catch (error: any) {
    console.error("[SMTP] Failed to send email via Nodemailer:", error);
    // If emailing fails, let them know, but output to console so they can still copy-paste in dev mode
    return res.status(200).json({
      success: true,
      message: "OTP generated, but email delivery failed (SMTP offline). Use the development log code below.",
      isTestAccount: true,
      testOtp: otp
    });
  }
});

// API Route: Notify Admin of New Booking
app.post("/api/bookings/notify", async (req, res) => {
  const { booking } = req.body;

  if (!booking) {
    return res.status(400).json({ success: false, error: "Booking details are required." });
  }

  const { id, parentName, studentName, grade, boardId, date, timeSlot, contactNumber, email, socialId } = booking;

  try {
    const { transporter, fromAddress } = await getTransporter();
    const recipient = "mathsschoolbykanishak@gmail.com";

    const mailOptions = {
      from: fromAddress,
      to: recipient,
      subject: `🚨 NEW TRIAL LESSON BOOKING: ${studentName} (${grade})`,
      text: `New complimentary trial lesson booked!\n\nBooking ID: ${id}\nStudent Name: ${studentName}\nGrade: ${grade}\nParent Name: ${parentName}\nContact Number: ${contactNumber}\nEmail: ${email}\nBoard ID: ${boardId}\nDate: ${date}\nTime Slot: ${timeSlot}\nSocial ID: ${socialId || 'None'}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #f0f0f0;">
            <span style="background-color: #fe6b00; color: #ffffff; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">New Booking Alert</span>
            <h2 style="color: #000928; margin: 15px 0 0 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Kanishak Sharma Maths School</h2>
          </div>
          
          <div style="margin-bottom: 25px;">
            <p style="font-size: 15px; color: #333333; line-height: 1.6; margin-top: 0;">Hi Kanishak,</p>
            <p style="font-size: 15px; color: #333333; line-height: 1.6;">A new student has booked a complimentary trial lesson on the website! Below are their full details:</p>
          </div>

          <!-- Details Grid -->
          <div style="background-color: #f9fbfd; border: 1px solid #eef2f6; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
            <h4 style="margin: 0 0 15px 0; color: #fe6b00; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Student Information</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777; width: 35%;">Booking ID:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold; font-family: monospace;">${id}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777;">Student Name:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${studentName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777;">Current Grade:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${grade}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777;">Curriculum Board:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold; text-transform: uppercase;">${boardId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777;">Parent Name:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${parentName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777;">Contact Number:</td>
                <td style="padding: 8px 0; color: #fe6b00; font-weight: bold;">
                  <a href="https://wa.me/${contactNumber.replace(/[^0-9]/g, "")}" style="color: #fe6b00; text-decoration: none;">${contactNumber} (WhatsApp Link)</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777;">Email Address:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777777;">Social Profile:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${socialId || "Not specified"}</td>
              </tr>
            </table>
          </div>

          <!-- Schedule Grid -->
          <div style="background-color: #fcf6f2; border: 1px solid #fbece0; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
            <h4 style="margin: 0 0 15px 0; color: #fe6b00; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">Scheduled Window</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #777777; width: 35%;">Requested Date:</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #777777;">Time Slot (IST):</td>
                <td style="padding: 8px 0; color: #000928; font-weight: bold;">${timeSlot}</td>
              </tr>
            </table>
          </div>

          <!-- WhatsApp Shortcut Button -->
          <div style="text-align: center; margin: 30px 0 10px 0;">
            <a href="https://wa.me/${contactNumber.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(parentName)},%20this%20is%20Kanishak%20Sharma.%20I%20have%20received%20your%20complimentary%20trial%20lesson%20booking%20for%20${encodeURIComponent(studentName)}%20for%20${encodeURIComponent(date)}.%20Looking%20forward%20to%20our%20session!" 
               style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 12px 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(37,211,102,0.15);">
               Initiate Chat via WhatsApp
            </a>
          </div>

          <div style="text-align: center; border-top: 1px solid #f0f0f0; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 11px; color: #999999; margin: 0;">&copy; 2026 Kanishak Sharma Maths School System</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP] Booking alert successfully dispatched to ${recipient}. MessageId: ${info.messageId}`);
    return res.status(200).json({ success: true, message: "Booking notification delivered successfully." });

  } catch (error: any) {
    console.error("[SMTP] Failed to send booking notification via Nodemailer:", error);
    // Return 200 to prevent user block if SMTP offline, but report error
    return res.status(200).json({ success: false, error: "Failed to dispatch booking email notification." });
  }
});

// API Route: Verify OTP
app.post("/api/auth/otp/verify", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: "Email and verification code are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const storedData = otpStore.get(normalizedEmail);

  if (!storedData) {
    return res.status(400).json({ success: false, error: "No active verification request found for this email address." });
  }

  if (Date.now() > storedData.expiresAt) {
    otpStore.delete(normalizedEmail);
    return res.status(400).json({ success: false, error: "This verification code has expired. Please request a new one." });
  }

  if (storedData.otp !== otp.trim()) {
    return res.status(400).json({ success: false, error: "The verification code you entered is incorrect." });
  }

  // OTP is correct! Clear it from memory to prevent reuse
  otpStore.delete(normalizedEmail);
  console.log(`[AUTH] Successfully authenticated student/visitor: ${normalizedEmail}`);

  return res.status(200).json({ 
    success: true, 
    message: "Email successfully verified!",
    email: normalizedEmail
  });
});

// Configure Vite or Serve Production Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[SERVER] Configuring Vite development middleware...");
    const vite = await createViteServer({
      root: process.cwd(),
      configFile: false,
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
      plugins: [react(), tailwindcss()],
      resolve: { alias: { "@": process.cwd() + "/src" } },
    });
    app.use(vite.middlewares);
  } else {
    console.log("[SERVER] Production Mode: Serving static assets from /dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
