const ESR_EMAIL = 'info@esrexchange.com';

function encodeBody(lines) {
  return encodeURIComponent(lines.filter(Boolean).join('\n'));
}

function openEmail(subject, bodyLines, noteId) {
  const mailto = `mailto:${ESR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeBody(bodyLines)}`;
  const note = document.getElementById(noteId);
  if (note) note.textContent = 'Your email app should open now. Please attach any files/photos before sending.';
  window.location.href = mailto;
}

function handleForm(formId, noteId, subject, fields) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const lines = fields.map(([label, name]) => `${label}: ${data.get(name) || ''}`);
    const file = data.get('file');
    if (file && file.name) lines.push('', `File selected: ${file.name}`, 'Please attach this file manually before sending.');
    openEmail(subject, lines, noteId);
  });
}

handleForm('inventoryForm', 'inventoryNote', 'New Inventory Submission - ESR Exchange', [
  ['Company', 'company'], ['Name', 'name'], ['Email', 'email'], ['Phone', 'phone'], ['Category', 'category'], ['Inventory Details', 'details']
]);

handleForm('buyerForm', 'buyerNote', 'Buyer Match Request - ESR Exchange', [
  ['Company', 'company'], ['Name', 'name'], ['Email', 'email'], ['Buying Category', 'buying'], ['Buying Notes', 'notes']
]);

handleForm('contactForm', 'contactNote', 'Contact Request - ESR Exchange', [
  ['Name', 'name'], ['Email', 'email'], ['Message', 'message']
]);

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
}
