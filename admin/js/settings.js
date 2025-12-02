// admin/js/settings.js
document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.querySelector('.btn-save:not(.btn-danger)');
  if (!saveBtn) return;

  saveBtn.addEventListener('click', () => {
    const settings = {
      shopName: document.querySelector('input[value*="Val"]').value,
      phone: document.querySelector('input[type="tel"]').value,
      deliveryAreas: document.querySelector('input[value*="Lagos"]').value,
      alerts: {
        newOrder: document.querySelectorAll('input[type="checkbox"]')[0].checked,
        lowStock: document.querySelectorAll('input[type="checkbox"]')[1].checked,
        dailyReport: document.querySelectorAll('input[type="checkbox"]')[2].checked
      }
    };
    localStorage.setItem('valspack_settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  });
});