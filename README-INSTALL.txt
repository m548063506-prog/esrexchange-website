V7 GITHUB CONTACT FORM FIX

This is the correct fix for GitHub Pages.

What it fixes:
- The visitor fills out the contact form.
- Visitor presses Submit once.
- It does NOT open the visitor's email app.
- The information is sent to sales@esrresale.com.
- The visitor gets a thank-you message and returns to the home page.

FILES:
1. contact-fix.js
2. contact-form-replacement.html

FAST INSTALL:
1. Open your GitHub repository.
2. Upload contact-fix.js into the same place as index.html.
3. Open index.html.
4. Before the closing </body> tag, add this line:

<script src="contact-fix.js"></script>

5. Save / Commit changes.

IMPORTANT:
The first time someone submits the form, FormSubmit may send a verification email to:
sales@esrresale.com

Open that email and confirm it one time. After that the form will send normally.

If you want the full form replaced, use the code inside contact-form-replacement.html.
