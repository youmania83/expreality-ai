import { NextResponse } from "next/server";
import { google } from "googleapis";
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

    const timestamp = new Date().toISOString();

    // 1. Google Sheets API Integration
    try {
      const glAuth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          // Handle replacing explicit literal string \n characters from .env files
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });

      const sheets = google.sheets({ auth: glAuth, version: "v4" });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: "Sheet1!A:E", // Ensure your sheet is named 'Sheet1' or adjust accordingly
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [timestamp, name, phone, budget || "N/A", location || "N/A"]
          ],
        },
      });
      console.log("Successfully appended lead to Google Sheets.");
    } catch (sheetError: any) {
      console.error("Google Sheets API Error:", sheetError);
      // We log but deliberately do not stop the flow if they haven't configured Sheets yet,
      // or optionally we return an error. The user wants to: 'Return success/failure response properly.'
      // Since Google Sheets is now the primary DB, we should probably fail if Sheets fails.
      return NextResponse.json(
        { success: false, message: "Storage failed. Check database credentials.", error: sheetError.message },
        { status: 500 }
      );
    }

    // 2. Email Notification using Nodemailer (Preserved)
    try {
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      
      let transporter;
      if (user && pass) {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: false, // true for 465, false for other ports
          auth: { user, pass },
        });
      } else {
        // Fallback to test account for smooth local dev if SMTP is not provided
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
        text: `New Lead Notification: \nName: ${name}\nPhone: ${phone}\nBudget: ${budget}\nLocation: ${location}\nTimestamp: ${timestamp}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #0A0A0A; color: #FFF;">
            <h2 style="color: #C6A15B; border-bottom: 1px solid #333; padding-bottom: 10px;">New Private Client Lead</h2>
            <table style="width: 100%; max-width: 500px; margin-top: 20px; border-collapse: collapse;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${name}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Phone:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${phone}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Budget:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${budget || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Location:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${location || 'N/A'}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #222;"><strong>Time:</strong></td><td style="padding: 10px; border-bottom: 1px solid #222;">${timestamp}</td></tr>
            </table>
          </div>
        `,
      });

      console.log("Lead Email sent: %s", info.messageId);
      if (!user) {
        console.log("Email Preview URL (Ethereal test): %s", nodemailer.getTestMessageUrl(info));
      }
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // We might not want to fail the entire request if just email fails, 
      // since the lead is successfully in Google Sheets.
    }

    return NextResponse.json({ success: true, message: "Confidential briefing requested." });
  } catch (error: any) {
    console.error("Lead capture general error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process request." },
      { status: 500 }
    );
  }
}
