// Member sign-up form
// Submissions go to a Google Sheet through a Google Apps Script web app.
// Setup steps: see tools/member-signup.gs. Paste the web app URL here:
const SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxt-2hUJ_S2HhrPzo_QdqLcTO86zkWTY8NUPJmLaEv2ktZIp9EZgHvbd1hh2BhNguWg/exec';

const form = document.getElementById('member-form');
const errorBox = document.getElementById('form-error');
const successBox = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorBox.hidden = true;

  // Highlight the first missing or invalid field
  const invalid = form.querySelector(':invalid');
  if (invalid) {
    form.classList.add('was-validated');
    showError(invalid.id === 'consent'
      ? 'Please agree to receive emails so we can send you the newsletter.'
      : 'Please enter your name and a valid email address.');
    invalid.focus();
    return;
  }

  if (!SIGNUP_ENDPOINT) {
    showError('Sign-ups aren\'t open yet. Please email stemmedproject@gmail.com to join.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing you up...';

  try {
    // Apps Script doesn't send CORS headers, so the response can't be read.
    // A network failure still throws, which is the case we can catch.
    await fetch(SIGNUP_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(new FormData(form)),
    });
    form.hidden = true;
    successBox.hidden = false;
    successBox.focus();
  } catch {
    showError('Something went wrong. Please check your connection and try again.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Become a Member <i class="fas fa-arrow-right"></i>';
  }
});
