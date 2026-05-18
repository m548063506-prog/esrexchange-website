function toggleMenu(){
  const nav = document.getElementById("nav");
  if(nav) nav.classList.toggle("open");
}

const WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

function valueOf(id){
  const el = document.getElementById(id);
  return el ? el.value : "";
}

async function submitToWeb3Forms(payload, successMessage){
  try{
    const response = await fetch("https://api.web3forms.com/submit",{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({access_key:WEB3FORMS_ACCESS_KEY,...payload})
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

function sendInventory(e){
  if(e) e.preventDefault();
  submitToWeb3Forms({
    subject:"Inventory Submission for ESR Exchange",
    form_type:"Upload Inventory",
    company:valueOf("company"),
    name:valueOf("name"),
    email:valueOf("email"),
    phone:valueOf("phone"),
    inventory:valueOf("items")
  },"Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e){
  if(e) e.preventDefault();
  submitToWeb3Forms({
    subject:"Buyer Match Request",
    form_type:"Buyer Match",
    company:valueOf("bm-company"),
    email:valueOf("bm-email"),
    phone:valueOf("bm-phone"),
    items:valueOf("bm-items")
  },"Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e){
  if(e) e.preventDefault();
  submitToWeb3Forms({
    subject:"ESR Exchange Contact Request",
    form_type:"Contact Form",
    name:valueOf("contact-name"),
    email:valueOf("contact-email"),
    phone:valueOf("contact-phone"),
    message:valueOf("contact-message")
  },"Thank you for your information. We will contact you shortly.");
}

document.addEventListener("DOMContentLoaded",function(){
  const inventoryForm = document.getElementById("inventory-form");
  if(inventoryForm) inventoryForm.addEventListener("submit",sendInventory);

  const buyerForm = document.getElementById("buyer-match-form");
  if(buyerForm) buyerForm.addEventListener("submit",sendBuyerMatch);

  const contactForm = document.getElementById("contact-form");
  if(contactForm) contactForm.addEventListener("submit",sendContact);
});