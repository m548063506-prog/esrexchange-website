/*
ESR Exchange V7 GitHub Pages Contact Form Fix
This stops the contact form from opening the visitor's email app.

How it works:
- Finds the contact form on the page.
- Removes mailto behavior.
- Sends form data to FormSubmit using AJAX.
- Shows a thank-you message.
- Sends the visitor back to the home/top page.

Receiving email:
sales@esrresale.com

IMPORTANT:
The first time this is used, FormSubmit may send a confirmation email to sales@esrresale.com.
Open that email and confirm it one time.
*/

(function () {
  const RECEIVING_EMAIL = "sales@esrresale.com";
  const ENDPOINT = "https://formsubmit.co/ajax/" + encodeURIComponent(RECEIVING_EMAIL);

  function findContactForm() {
    const forms = Array.from(document.querySelectorAll("form"));

    // Prefer a form that currently uses mailto
    let form = forms.find(f => (f.getAttribute("action") || "").toLowerCase().startsWith("mailto:"));
    if (form) return form;

    // Then look for a contact style form
    form = forms.find(f => {
      const text = (f.innerText || "").toLowerCase();
      const html = (f.innerHTML || "").toLowerCase();
      return html.includes("email") && (html.includes("message") || html.includes("phone") || text.includes("contact"));
    });

    return form || forms[0] || null;
  }

  function ensureMessageBox(form) {
    let box = document.getElementById("contact-status-message");
    if (!box) {
      box = document.createElement("div");
      box.id = "contact-status-message";
      box.style.marginTop = "14px";
      box.style.padding = "12px 14px";
      box.style.borderRadius = "10px";
      box.style.display = "none";
      box.style.fontWeight = "600";
      form.appendChild(box);
    }
    return box;
  }

  function showMessage(box, message, success) {
    box.textContent = message;
    box.style.display = "block";
    box.style.background = success ? "#e8fff1" : "#fff1f1";
    box.style.color = success ? "#0b5f2a" : "#8a1111";
    box.style.border = success ? "1px solid #9ae6b4" : "1px solid #f3a6a6";
  }

  function normalizeFields(form) {
    const inputs = Array.from(form.querySelectorAll("input, textarea, select"));
    inputs.forEach(el => {
      const placeholder = (el.getAttribute("placeholder") || "").toLowerCase();
      const type = (el.getAttribute("type") || "").toLowerCase();
      const id = (el.getAttribute("id") || "").toLowerCase();
      const cls = (el.getAttribute("class") || "").toLowerCase();

      if (!el.name) {
        if (type === "email" || placeholder.includes("email") || id.includes("email") || cls.includes("email")) el.name = "email";
        else if (type === "tel" || placeholder.includes("phone") || placeholder.includes("mobile") || id.includes("phone")) el.name = "phone";
        else if (placeholder.includes("company") || id.includes("company")) el.name = "company";
        else if (placeholder.includes("message") || id.includes("message") || el.tagName.toLowerCase() === "textarea") el.name = "message";
        else if (placeholder.includes("name") || id.includes("name")) el.name = "name";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = findContactForm();
    if (!form) return;

    normalizeFields(form);

    form.setAttribute("method", "POST");
    form.setAttribute("action", "#");
    form.removeAttribute("enctype");

    const box = ensureMessageBox(form);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button');
      const originalButtonText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      const formData = new FormData(form);
      formData.append("_subject", "New ESR Exchange Website Contact");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        showMessage(box, "Thank you. Your information was submitted successfully.", true);
        form.reset();

        setTimeout(function () {
          window.location.href = window.location.origin + window.location.pathname.split("/").slice(0, -1).join("/") + "/";
        }, 1400);

      } catch (error) {
        showMessage(box, "There was a problem sending the form. Please call or email us directly.", false);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText || "Submit";
        }
      }
    });
  });
})();
