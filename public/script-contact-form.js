const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuButton && siteNav) {
  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    siteNav.classList.toggle('is-open', isOpen);
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !menuButton.contains(event.target)) setMenuOpen(false);
  });
}

const enquiryForm = document.getElementById('project-enquiry');
const enquiryStatus = document.getElementById('contact-form-status');

if (enquiryForm && enquiryStatus) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    const fields = new FormData(enquiryForm);
    const name = String(fields.get('Name') || '').trim();
    const email = String(fields.get('Reply email') || '').trim();
    const company = String(fields.get('Company or product') || '').trim();
    const engagement = String(fields.get('Engagement type') || 'Project enquiry').trim();
    const details = String(fields.get('Project details') || '').trim();
    const subject = `021Labs enquiry — ${engagement}`;
    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Company or product: ${company || 'Not provided'}`,
      `Engagement type: ${engagement}`,
      '',
      'Project details:',
      details,
    ].join('\n');

    enquiryStatus.textContent = 'Your email app should open a draft. Please review it and press Send when ready.';
    window.location.href = `mailto:info@021labs.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
