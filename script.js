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
function sendContact(e){e.preventDefault();const s='ESR Exchange Contact Request';const b=`Name: ${document.getElementById('contact-name').value}
Email: ${document.getElementById('contact-email').value}

Message:
${document.getElementById('contact-message').value}`;location.href=`mailto:${emailTo}?subject=${enc(s)}&body=${enc(b)}`}