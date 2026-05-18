function toggleMenu(){
  const nav = document.getElementById("nav");
  if(nav) nav.classList.toggle("open");
}

const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_KEY_HERE";

async function submitFormData(form, successMessage){
  try{
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if(result.success){
      alert(successMessage || "Thank you. Your information was submitted successfully.");
      window.location.href = "index.html";
    } else {
      console.error(result);
      alert("There was a problem sending your information. Please try again.");
    }

  } catch(error){
    console.error(error);
    alert("There was a problem sending your information. Please try again.");
  }
}

const contactForm = document.getElementById("contactForm");

if(contactForm){
  contactForm.addEventListener("submit", async function(e){
    e.preventDefault();
    await submitFormData(contactForm, "Thank you for contacting ESR Exchange.");
  });
}

const uploadForm = document.getElementById("uploadForm");

if(uploadForm){
  uploadForm.addEventListener("submit", async function(e){
    e.preventDefault();
    await submitFormData(uploadForm, "Inventory uploaded successfully.");
  });
}
