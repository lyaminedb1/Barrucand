/* ============================================================
   CONTACT — Form validation
   ============================================================ */
(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const validate = (field) => {
    const parent = field.closest('.form-group');
    let ok = true;
    if (field.required && !field.value.trim()) ok = false;
    if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) ok = false;
    if (field.type === 'checkbox' && field.required && !field.checked) ok = false;
    parent.classList.toggle('has-error', !ok);
    return ok;
  };

  form.querySelectorAll('input, textarea, select').forEach(f => {
    f.addEventListener('blur', () => validate(f));
    f.addEventListener('input', () => { if (f.closest('.form-group').classList.contains('has-error')) validate(f); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allOk = true;
    form.querySelectorAll('input[required], textarea[required], input[type="checkbox"][required]').forEach(f => {
      if (!validate(f)) allOk = false;
    });
    if (!allOk) return;

    /* Simulate submission */
    const btn = form.querySelector('.form-submit');
    const originalText = btn.querySelector('span').textContent;
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Envoi en cours…';
    setTimeout(() => {
      form.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(f => { f.value = ''; });
      form.querySelector('#rgpd').checked = false;
      btn.disabled = false;
      btn.querySelector('span').textContent = originalText;
      document.getElementById('form-success').hidden = false;
    }, 1400);
  });
})();
