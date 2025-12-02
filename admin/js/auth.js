// Login / logout logic(Oauth, JWT)-->
// PROTECT ALL ADMIN PAGES
document.addEventListener('DOMContentLoaded', () => {
  const current = location.pathname.split('/').pop();
  if (current !== 'login.html' && current !== 'register.html') {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
      window.location.href = 'login.html';
    }
  }
});

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem('adminLoggedIn');
  alert('Logged out safely');
  window.location.href = 'login.html';
}
