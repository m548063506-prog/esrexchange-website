document.getElementById('inventoryForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const subject = encodeURIComponent('Inventory Submission for ESR Exchange');
  const body = encodeURIComponent(
    `Company: ${data.get('company') || ''}\n` +
    `Contact: ${data.get('name') || ''}\n` +
    `Email: ${data.get('email') || ''}\n` +
    `Phone: ${data.get('phone') || ''}\n` +
    `Inventory Type: ${data.get('type') || ''}\n` +
    `Location: ${data.get('location') || ''}\n\n` +
    `Inventory Details:\n${data.get('details') || ''}\n\n` +
    `Note: Please attach your Excel, CSV, PDF, or photos to this email before sending.`
  );
  const mailto = `mailto:sales@esrexchange.com?subject=${subject}&body=${body}`;
  const result = document.getElementById('formResult');
  result.innerHTML = `Submission prepared. <a href="${mailto}">Click here to open your email</a>. Attach your file before sending.`;
  window.location.href = mailto;
});
