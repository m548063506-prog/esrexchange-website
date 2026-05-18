function toggleMenu(){
  document.getElementById('nav').classList.toggle('open');
}

const WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

async function submitToWeb3Forms(payload, successMessage){
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...payload
      })
    });

    const result = await response.json();

    if(result.success){
      alert(successMessage || "Thank you. Your information was submitted successfully.");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } else {
      alert("There was a problem sending your information. Please try again.");
    }

  } catch(error){
    alert("Error sending information. Please try again.");
  }
}

function sendInventory(e){
  e.preventDefault();

  const nameValue = document.getElementById("name") ? document.getElementById("name").value : "";
  const emailValue = document.getElementById("email") ? document.getElementById("email").value : "";
  const itemsValue = document.getElementById("items") ? document.getElementById("items").value : "";

  submitToWeb3Forms({
    subject: "Inventory Submission for ESR Exchange",
    form_type: "Upload Inventory",
    name: nameValue,
    email: emailValue,
    inventory: itemsValue
  }, "Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e){
  e.preventDefault();

  const emailValue = document.getElementById("bm-email") ? document.getElementById("bm-email").value : "";
  const itemsValue = document.getElementById("bm-items") ? document.getElementById("bm-items").value : "";

  submitToWeb3Forms({
    subject: "Buyer Match Request",
    form_type: "Buyer Match",
    email: emailValue,
    items: itemsValue
  }, "Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e){
  e.preventDefault();

  const nameValue = document.getElementById("contact-name") ? document.getElementById("contact-name").value : "";
  const emailValue = document.getElementById("contact-email") ? document.getElementById("contact-email").value : "";
  const messageValue = document.getElementById("contact-message") ? document.getElementById("contact-message").value : "";

  submitToWeb3Forms({
    subject: "ESR Exchange Contact Request",
    form_type: "Contact Form",
    name: nameValue,
    email: emailValue,
    message: messageValue
  }, "Thank you for your information. We will contact you shortly.");
}
