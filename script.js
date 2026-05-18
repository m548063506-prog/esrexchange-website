function toggleMenu(){
  document.getElementById('nav').classList.toggle('open');
}

const emailTo='sales@esrresale.com';

function enc(v){
  return encodeURIComponent(v || '');
}

function sendInventory(e){
  e.preventDefault();

  const s='Inventory submission for ESR Exchange';
  const b=`Name: ${name.value}

Email: ${email.value}

Inventory:

${items.value}`;

  location.href=`mailto:${emailTo}?subject=${enc(s)}&body=${enc(b)}`;
}

function sendBuyerMatch(e){
  e.preventDefault();

  const s='Buyer Match Request';
  const b=`Email: ${document.getElementById('bm-email').value}

Items:

${document.getElementById('bm-items').value}`;

  location.href=`mailto:${emailTo}?subject=${enc(s)}&body=${enc(b)}`;
}

async function sendContact(e){
  e.preventDefault();

  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  try {

    const response = await fetch(
      'https://formsubmit.co/ajax/sales@esrresale.com',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      }
    );

    if(response.ok){

      alert('Thank you for your information. We will contact you shortly.');

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } else {

      alert('There was a problem sending your message.');

    }

  } catch(error){

    alert('Error sending message.');

  }
}
