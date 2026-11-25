document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('lesothoTheme') || 'light';
  root.setAttribute('data-bs-theme', savedTheme);
  const updateThemeLabel = () => { if(themeBtn) themeBtn.textContent = root.getAttribute('data-bs-theme') === 'dark' ? ' Light mode' : 'Dark mode'; };
  updateThemeLabel();
  if(themeBtn) themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', next); localStorage.setItem('lesothoTheme', next); updateThemeLabel();
  });

  const form = document.getElementById('bookingForm');
  const alertBox = document.getElementById('formAlert');
  if(form) form.addEventListener('submit', event => {
    event.preventDefault();
    const phone = document.getElementById('userPhone');
    if(phone) phone.setCustomValidity(phone.value.trim().length < 7 ? 'Enter a valid phone number.' : '');
    if(!form.checkValidity()) { form.classList.add('was-validated'); alertBox?.classList.add('d-none'); return; }
    if(alertBox) { alertBox.classList.remove('d-none'); alertBox.textContent = 'Thank you! Your request has been saved as a demonstration. Please contact the tourism desk to confirm.'; }
    form.reset(); form.classList.remove('was-validated'); if(phone) phone.setCustomValidity('');
  });
  const date = document.getElementById('travelDate');
  if(date) { const today = new Date(); const localToday = new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().split('T')[0]; date.min = localToday; }

  const search = document.getElementById('destinationSearch');
  if(search) search.addEventListener('input', () => {
    const term = search.value.trim().toLowerCase();
    document.querySelectorAll('[data-searchable]').forEach(card => card.classList.toggle('d-none', !card.textContent.toLowerCase().includes(term)));
  });

  const tour = document.getElementById('estimateTour'), guests = document.getElementById('estimateGuests'), total = document.getElementById('estimateTotal');
  const calculate = () => { if(tour && guests && total) { const count = Math.max(1, Number(guests.value)||1); guests.value=count; total.textContent = 'M ' + (Number(tour.value)*count).toLocaleString('en-US'); } };
  tour?.addEventListener('change',calculate); guests?.addEventListener('input',calculate); calculate();

  const newsletter = document.getElementById('newsletterForm'), newsletterAlert = document.getElementById('newsletterAlert');
  if(newsletter) newsletter.addEventListener('submit', event => { event.preventDefault(); if(!newsletter.checkValidity()) {newsletter.classList.add('was-validated');return;}
    const name=document.getElementById('newsletterName').value.trim(), email=document.getElementById('newsletterEmail').value.trim();
    const subscriptions=JSON.parse(localStorage.getItem('lesothoNewsletter')||'[]'); subscriptions.push({name,email,date:new Date().toISOString()}); localStorage.setItem('lesothoNewsletter',JSON.stringify(subscriptions));
    newsletterAlert.textContent='Thanks, '+name+'! Your demo subscription has been saved in this browser.'; newsletterAlert.classList.remove('d-none'); newsletter.reset(); newsletter.classList.remove('was-validated');
  });
});

function previewImage(element) {
  const modalImageDisplay = document.getElementById('modalImageDisplay');
  const imageModalLabel = document.getElementById('imageModalLabel');
  if(modalImageDisplay && element) { modalImageDisplay.src = element.src; modalImageDisplay.alt = element.alt || 'Gallery image preview'; }
  if(imageModalLabel && element) imageModalLabel.textContent = element.alt || 'Image preview';
}
