function toggleMenu(){document.getElementById('nav').classList.toggle('open')}
const emailTo='info@esrexchange.com';
function enc(v){return encodeURIComponent(v||'')}
function sendInventory(e){e.preventDefault();const s='Inventory submission for ESR Exchange';const b=`Company: ${company.value}
Name: ${name.value}
Email: ${email.value}

Inventory:
${items.value}`;location.href=`mailto:${emailTo}?subject=${enc(s)}&body=${enc(b)}`}
function sendBuyerMatch(e){e.preventDefault();const s='Buyer Match Request';const b=`Company: ${document.getElementById('bm-company').value}
Email: ${document.getElementById('bm-email').value}

Items:
${document.getElementById('bm-items').value}`;location.href=`mailto:${emailTo}?subject=${enc(s)}&body=${enc(b)}`}
function async function sendContact(e){
 e.preventDefault();

 const name = document.getElementById('contact-name').value;
 const email = document.getElementById('contact-email').value;
 const message = document.getElementById('contact-message').value;

 try {
   const response = await fetch('https://formsubmit.co/ajax/info@esrexchange.com', {
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
   });

   if(response.ok){
     alert('Message sent successfully!');
     window.location.href = '/';
   } else {
     alert('Failed to send message.');
   }

 } catch(error){
   alert('Error sending message.');
 }
}
