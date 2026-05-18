function toggleMenu(){
  const nav = document.getElementById("nav");
  if(nav) nav.classList.toggle("open");
}

const WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

async function submitFormData(form, successMessage){
  try{
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
consol.log(response);
    const response = await fetch("https://api.web3forms.com/submit",{
      method:"POST",
      body:formData
    });

    const result = await response.json();

    if(result.success){
      alert(successMessage || "Thank you. Your information was submitted successfully.");
      window.location.href = "index.html";
    }else{
      alert("There was a problem sending your information. Please try again.");
    }
  }catch(error){
    alert("Error sending information. Please try again.");
  }
}

document.addEventListener("DOMContentLoaded",function(){
  const inventoryForm = document.getElementById("inventory-form");
  if(inventoryForm){
    inventoryForm.addEventListener("submit",function(e){
      e.preventDefault();
      submitFormData(inventoryForm,"Thank you. Your inventory was submitted successfully.");
    });
  }

  const buyerForm = document.getElementById("buyer-match-form");
  if(buyerForm){
    buyerForm.addEventListener("submit",function(e){
      e.preventDefault();
      submitFormData(buyerForm,"Thank you. Your buyer match request was submitted successfully.");
    });
  }

  const contactForm = document.getElementById("contact-form");
  if(contactForm){
    contactForm.addEventListener("submit",function(e){
      e.preventDefault();
      submitFormData(contactForm,"Thank you for your message. We will contact you shortly.");
    });
  }
});
