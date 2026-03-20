import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, budget, location } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required." },
        { status: 400 }
      );
    }

    // 1. Store lead in backend (simple JSON file appending)
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "leads.json");
    
    // Ensure directory exists
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing leads
    let leads = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      leads = JSON.parse(fileData);
    } catch (e) {
      // File doesn't exist or is empty
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      phone,
      budget,
      location,
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);
    await fs.writeFile(filePath, JSON.stringify(leads, null, 2));

    // 2. Email Notification using Nodemailer
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    
    let transporter;
    if (user && pass) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: { user, pass },
      });
    } else {
      // For demo/development without actual credentials using Ethereal
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: '"Expreality Leads" <leads@expreality-ai.dev>',
      to: process.env.LEAD_EMAIL || "sales@expreality-ai.com", 
      subject: `New Lead: ${name} - ${budget || 'No budget'}`,
      text: `New Lead Notification: \nName: ${name}\nPhone: ${phone}\nBudget: ${budget}\nLocation: ${location}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0A0A0A; color: #FFF;">
          <h2 style="color: #C6A15B; border-bottom: 1px solid #333; padding-bottom: 10px;">New Private Client Lead</h2>
          <table style="width: 100%; max-width: 500px; margin-top: 20px; border-collapse: collapse;">
            <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${name}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${phone}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Budget:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${budget || 'N/A'}</td></tr>
            <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Location:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${location || 'N/A'}</td></tr>
          </table>
        </div>
      `,
    });

    console.log("Lead Email sent: %s", info.messageId);
    if (!user) {
      console.log("Email Preview URL (Ethereal test): %s", nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json({ success: true, message: "Confidential briefing requested." });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request." },
      { status: 500 }
    );
  }
}
