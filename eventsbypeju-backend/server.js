// ════════════════════════════════════════════════════════════════
// EVENTS BY PEJUBLACK — FORM TO EMAIL BACKEND
// Node.js + Express + Nodemailer
// ════════════════════════════════════════════════════════════════

// Import required packages
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// ════════════════════════════════════════════════════════════════
// MIDDLEWARE SETUP
// ════════════════════════════════════════════════════════════════

// Allow requests from your frontend
app.use(cors({
  origin: 'https://event-by-peju.vercel.app', // ⚠️ For production, replace '*' with your actual domain: 'https://yourdomain.com'
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON request bodies
app.use(express.json());

// ════════════════════════════════════════════════════════════════
// EMAIL TRANSPORTER SETUP — GMAIL CONFIGURATION
// ════════════════════════════════════════════════════════════════

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,        // PUT YOUR GMAIL EMAIL HERE (or in .env file)
    pass: process.env.EMAIL_PASSWORD     // PUT YOUR APP PASSWORD HERE (or in .env file)
  }
});

// Test the transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email transporter error:', error);
  } else {
    console.log('✅ Email transporter ready!');
  }
});

// ════════════════════════════════════════════════════════════════
// FORM SUBMISSION ENDPOINT
// ════════════════════════════════════════════════════════════════

app.post('/submit-enquiry', async (req, res) => {
  try {
    // Extract form data from request body
    const {
      fname,
      lname,
      email,
      phone,
      eventType,
      package: pkg,
      eventDate,
      guests,
      budget,
      services,
      message
    } = req.body;

    // ── VALIDATION: Check if required fields are filled
    if (!fname || !lname || !email || !phone || !eventType || !pkg) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // ── FORMAT THE EMAIL BODY (what will show in your Gmail)
    const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📧 NEW EVENT ENQUIRY — Events by Pejublack
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT INFORMATION
─────────────────────────────────────────────────────────────
Name:        ${fname} ${lname}
Email:       ${email}
Phone:       ${phone}

📋 EVENT DETAILS
─────────────────────────────────────────────────────────────
Event Type:  ${eventType}
Package:     ${pkg}
Event Date:  ${eventDate || 'Not specified'}
Guest Count: ${guests || 'Not specified'}
Budget:      ${budget || 'Not specified'}

🎨 SERVICES INTERESTED IN
─────────────────────────────────────────────────────────────
${Array.isArray(services) && services.length > 0 
  ? services.map(s => `✓ ${s}`).join('\n') 
  : '(None selected)'}

💭 VISION & MESSAGE
─────────────────────────────────────────────────────────────
${message || '(No additional message)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted on: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    // ── EMAIL OPTIONS (what gets sent to your Gmail)
    const mailOptions = {
      from: process.env.EMAIL_USER,                    // Your Gmail address
      to: process.env.RECEIVE_EMAIL,                   // Your Gmail address (or other email to receive at)
      subject: `🎉 New Event Enquiry from ${fname} ${lname}`,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #D4237A 0%, #F5A623 100%); color: white; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📧 New Event Enquiry</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Events by Pejublack</p>
          </div>
          
          <div style="padding: 24px;">
            <h2 style="color: #D4237A; margin-top: 0; border-bottom: 2px solid #F5A623; padding-bottom: 10px;">👤 Contact Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${fname} ${lname}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #D4237A;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #D4237A;">${phone}</a></p>

            <h2 style="color: #D4237A; margin-top: 20px; border-bottom: 2px solid #F5A623; padding-bottom: 10px;">📋 Event Details</h2>
            <p style="margin: 8px 0;"><strong>Event Type:</strong> ${eventType}</p>
            <p style="margin: 8px 0;"><strong>Package:</strong> ${pkg}</p>
            <p style="margin: 8px 0;"><strong>Event Date:</strong> ${eventDate || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Guest Count:</strong> ${guests || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Budget:</strong> ${budget || 'Not specified'}</p>

            <h2 style="color: #D4237A; margin-top: 20px; border-bottom: 2px solid #F5A623; padding-bottom: 10px;">🎨 Services Interested In</h2>
            <p style="margin: 8px 0;">
              ${Array.isArray(services) && services.length > 0 
                ? services.map(s => `✓ ${s}`).join('<br>') 
                : '(None selected)'}
            </p>

            <h2 style="color: #D4237A; margin-top: 20px; border-bottom: 2px solid #F5A623; padding-bottom: 10px;">💭 Vision & Message</h2>
            <p style="margin: 8px 0; white-space: pre-wrap; line-height: 1.6;">${message || '(No additional message)'}</p>

            <div style="background: #f5f5f5; padding: 16px; border-radius: 6px; margin-top: 24px; text-align: center; font-size: 12px; color: #666;">
              <p style="margin: 0;">Submitted on: <strong>${new Date().toLocaleString()}</strong></p>
            </div>
          </div>

          <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 12px; color: #999;">
            <p style="margin: 0;">© 2026 Events by Pejublack. All rights reserved.</p>
          </div>
        </div>
      `
    };

    // ── SEND EMAIL
    await transporter.sendMail(mailOptions);

    // ── SEND SUCCESS RESPONSE TO FRONTEND
    res.status(200).json({
      success: true,
      message: 'Enquiry sent successfully! We will respond within 24 hours.',
      timestamp: new Date().toISOString()
    });

    console.log(`✅ Email sent to ${process.env.RECEIVE_EMAIL} from ${fname} ${lname}`);

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending enquiry. Please try again later.',
      error: error.message
    });
  }
});
app.post('/submit-enquiry', async()=>{console.log("testing 1-2")});
// ════════════════════════════════════════════════════════════════
// TEST ENDPOINT (optional — to test if server is running)
// ════════════════════════════════════════════════════════════════

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'Events by Pejublack Backend — Form to Email Service',
    endpoint: '/submit-enquiry (POST)'
  });
});

// ════════════════════════════════════════════════════════════════
// START SERVER
// ════════════════════════════════════════════════════════════════

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Form submissions will be sent to: ${process.env.RECEIVE_EMAIL || 'check .env file'}`);
  console.log(`${'='.repeat(60)}\n`);
});