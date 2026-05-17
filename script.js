document.getElementById('inventoryForm').addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(e.target);
  const lines = [];
  for (const [key, value] of data.entries()) {
    if (value && typeof value === 'string') lines.push(`${key}: ${value}`);
  }
  const body = encodeURIComponent(lines.join('\n'));
  const subject = encodeURIComponent('New Inventory Submission - ESR Exchange');
  document.getElementById('formMessage').textContent = 'Submission prepared. Your email program should open now.';
  window.location.href = `mailto:sales@esrexchange.com?subject=${subject}&body=${body}`;
});
