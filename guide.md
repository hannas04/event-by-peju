════════════════════════════════════════════════════════════════════════════════
  EVENTS BY PEJUBLACK — COMPLETE SETUP GUIDE
  Form Submission → Gmail Backend Setup
════════════════════════════════════════════════════════════════════════════════

TABLE OF CONTENTS:
  1. Prerequisites & Installation
  2. Gmail Setup (Get App Password)
  3. Backend Setup
  4. Frontend Integration
  5. Testing
  6. Deployment
  7. Troubleshooting

════════════════════════════════════════════════════════════════════════════════
PART 1: PREREQUISITES & INSTALLATION
════════════════════════════════════════════════════════════════════════════════

What you need:
  ✓ Node.js installed (https://nodejs.org/)
  ✓ A Gmail account
  ✓ A code editor (VS Code recommended)
  ✓ Your website HTML file

STEP 1A: Install Node.js
─────────────────────────────────────────────────────────────────────────────
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Install it (follow the installer)
4. Open Terminal/Command Prompt and run:
   
   node --version
   npm --version
   
   You should see version numbers. If yes, Node.js is installed ✅

STEP 1B: Create a project folder
─────────────────────────────────────────────────────────────────────────────
1. Create a new folder anywhere on your computer:
   
   📁 pejublack-backend
   
2. Inside that folder, create these files:
   
   📁 pejublack-backend/
      ├── server.js          (← Backend code)
      ├── package.json       (← Dependencies list)
      └── .env               (← Your Gmail credentials)

3. Open Terminal/Command Prompt
4. Navigate to your folder:
   
   cd path/to/pejublack-backend

STEP 1C: Install dependencies
─────────────────────────────────────────────────────────────────────────────
1. Copy the contents of package.json (provided) into your package.json file
2. In Terminal, run:
   
   npm install
   
   This will download and install:
   - express (web framework)
   - nodemailer (email sender)
   - cors (allow requests from your website)
   - dotenv (for storing credentials safely)
   
   Wait for it to finish. You'll see: "added X packages" ✅

════════════════════════════════════════════════════════════════════════════════
PART 2: GMAIL SETUP (Get App Password)
════════════════════════════════════════════════════════════════════════════════

⚠️  IMPORTANT: You CANNOT use your regular Gmail password!
You must create an "App Password" for security.

STEP 2A: Enable 2-Step Verification
─────────────────────────────────────────────────────────────────────────────
1. Go to https://myaccount.google.com/
2. Click "Security" in the left menu
3. Scroll down to "2-Step Verification"
4. Click it and follow Google's steps to enable it
5. Once enabled, you'll see a checkmark ✅

STEP 2B: Generate App Password
─────────────────────────────────────────────────────────────────────────────
1. Go back to https://myaccount.google.com/security
2. Scroll down to "App passwords" (it appears after 2FA is enabled)
3. Click on "App passwords"
4. You'll see a dropdown: Select "Mail" and "Windows Computer" (or your device)
5. Click "Generate"
6. Google will show you a 16-character password like: abcd efgh ijkl mnop
7. COPY THIS PASSWORD — You'll need it in the next step

STEP 2C: Save Your Credentials
─────────────────────────────────────────────────────────────────────────────
In your .env file, add:

────────────── .env file starts here ──────────────
EMAIL_USER=your_gmail_email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
RECEIVE_EMAIL=your_gmail_email@gmail.com
PORT=5000
NODE_ENV=development
────────────── .env file ends here ──────────────

Replace:
  • your_gmail_email@gmail.com → Your actual Gmail address
  • abcd efgh ijkl mnop → The 16-char password from Step 2B
  • RECEIVE_EMAIL can be the same or different

✅ Save the .env file

════════════════════════════════════════════════════════════════════════════════
PART 3: BACKEND SETUP
════════════════════════════════════════════════════════════════════════════════

STEP 3A: Copy Backend Code
─────────────────────────────────────────────────────────────────────────────
1. Copy the entire contents of server.js (provided)
2. Paste it into your server.js file
3. Save the file

STEP 3B: Start the Backend Server
─────────────────────────────────────────────────────────────────────────────
1. Open Terminal in your project folder
2. Run this command:
   
   npm start
   
   OR for development (auto-restart on changes):
   
   npm run dev

3. You should see:

   ============================================================
   🚀 Server running on http://localhost:5000
   📧 Form submissions will be sent to: your_email@gmail.com
   ============================================================

✅ Your backend is now RUNNING!

Keep this Terminal window OPEN while testing.
(When you close it, the server stops)

════════════════════════════════════════════════════════════════════════════════
PART 4: FRONTEND INTEGRATION
════════════════════════════════════════════════════════════════════════════════

STEP 4A: Update Your HTML Form
─────────────────────────────────────────────────────────────────────────────
In your HTML file (contact.html or wherever your form is):

1. Find this line in your existing JavaScript section:
   
   const BACKEND_URL = 'http://localhost:5000';
   
2. Add it at the very top of your <script> section (before any other code)

3. Replace your existing submitForm() function with the NEW one from:
   form-frontend-code.js (provided)

4. Keep all other functions (updateBudget, toggleFaq, etc.)

STEP 4B: Update the Backend URL for Production
─────────────────────────────────────────────────────────────────────────────
Later when you deploy:

Change:
  const BACKEND_URL = 'http://localhost:5000';

To:
  const BACKEND_URL = 'https://your-backend-domain.com';

════════════════════════════════════════════════════════════════════════════════
PART 5: TESTING
════════════════════════════════════════════════════════════════════════════════

STEP 5A: Test Locally
─────────────────────────────────────────────────────────────────────────────
1. Make sure your backend is running (npm start)
2. Open your HTML file in a browser
3. Fill out the form with test data
4. Click "Send My Enquiry"
5. You should see: ✅ "Enquiry Sent — We'll be in touch within 24 hours!"
6. Check your Gmail inbox for the submission

If you DON'T see the email:
  • Check SPAM folder
  • Check your .env file credentials are correct
  • Check Terminal for error messages

STEP 5B: Check Terminal Output
─────────────────────────────────────────────────────────────────────────────
When a form is submitted, you should see in Terminal:

  ✅ Email sent to your_email@gmail.com from [User Name]

════════════════════════════════════════════════════════════════════════════════
PART 6: DEPLOYMENT (Putting it online)
════════════════════════════════════════════════════════════════════════════════

When you're ready to launch publicly, you have 3 main options:

OPTION A: Heroku (FREE or Paid)
─────────────────────────────────────────────────────────────────────────────
1. Create account at https://www.heroku.com/
2. Install Heroku CLI
3. In Terminal: heroku login
4. In your project folder: heroku create
5. Set environment variables:
   heroku config:set EMAIL_USER=your_email@gmail.com
   heroku config:set EMAIL_PASSWORD="your_app_password"
   heroku config:set RECEIVE_EMAIL=your_email@gmail.com
6. Deploy: git push heroku main
7. Your backend URL will be: https://your-app-name.herokuapp.com

OPTION B: Render (FREE)
─────────────────────────────────────────────────────────────────────────────
1. Go to https://render.com/
2. Sign up with GitHub
3. Create new Web Service
4. Connect your GitHub repo
5. Set Environment Variables in dashboard
6. Deploy
7. Your backend URL will be: https://your-app-name.onrender.com

OPTION C: Railway (FREE to start)
─────────────────────────────────────────────────────────────────────────────
1. Go to https://railway.app/
2. Sign up with GitHub
3. Create new project from repo
4. Add environment variables
5. Deploy
6. Your backend URL will be: https://your-app-name.railway.app

Once deployed, update your HTML:

  const BACKEND_URL = 'https://your-deployed-backend-url.com';

════════════════════════════════════════════════════════════════════════════════
PART 7: TROUBLESHOOTING
════════════════════════════════════════════════════════════════════════════════

❌ Problem: "Email password incorrect"
─────────────────────────────────────────────────────────────────────────────
Solution: Make sure you're using the 16-character App Password, not your 
regular Gmail password. Check .env file.

❌ Problem: "Cannot connect to localhost:5000"
─────────────────────────────────────────────────────────────────────────────
Solution: 
  1. Is the backend running? (npm start)
  2. Check Terminal for error messages
  3. Is the port 5000 available? Try port 3000 instead:
     Change: PORT=3000 in .env
     Change: const BACKEND_URL = 'http://localhost:3000'; in HTML

❌ Problem: Email not arriving
─────────────────────────────────────────────────────────────────────────────
Solution:
  1. Check SPAM/Promotions folder in Gmail
  2. Go to: https://myaccount.google.com/security
  3. Look for "Less secure app access" and enable if needed
  4. Check Terminal output for errors
  5. Re-test with a different email address in form

❌ Problem: "CORS Error" in browser console
─────────────────────────────────────────────────────────────────────────────
Solution: In server.js, change:
  origin: '*'
To:
  origin: 'https://your-website.com'

❌ Problem: Form shows error after submitting
─────────────────────────────────────────────────────────────────────────────
Solution: Check browser console (F12 → Console tab) for error messages.
Screenshot and share with support.

════════════════════════════════════════════════════════════════════════════════
QUICK REFERENCE
════════════════════════════════════════════════════════════════════════════════

Local Testing:
  npm install         → Install dependencies (1x)
  npm start           → Start backend
  Browser:            → http://localhost:5000 (should show "running")
                        your_website.html → Fill & submit form

Files you need:
  ✓ server.js         → Backend code
  ✓ package.json      → Dependencies
  ✓ .env              → Your credentials (KEEP SECRET!)
  ✓ your HTML file    → Updated with new submitForm()

Environment Variables (.env):
  EMAIL_USER          → Your Gmail address
  EMAIL_PASSWORD      → Your 16-char App Password
  RECEIVE_EMAIL       → Where emails are sent
  PORT                → Server port (default 5000)

Endpoints:
  GET  /              → Test if server is running
  POST /submit-enquiry → Handle form submissions

════════════════════════════════════════════════════════════════════════════════
✅ YOU'RE DONE!

Your form will now send submissions directly to your Gmail inbox.

Questions? Issues? Check the Troubleshooting section above.

Good luck! 🎉
════════════════════════════════════════════════════════════════════════════════