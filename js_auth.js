// Admin authentication
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is logged in
            if (window.location.pathname.includes('login.html')) {
                window.location.href = 'index.html';
            }
            
            // Update admin links in main site
            updateAdminLinks(true);
        } else {
            // User is not logged in
            if (window.location.pathname.includes('admin/') && 
                !window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
            
            // Update admin links in main site
            updateAdminLinks(false);
        }
    });
    
    // Handle login form submission
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginError = document.getElementById('login-error');
            const loginBtn = document.getElementById('login-btn');
            
            loginBtn.disabled = true;
            loginBtn.textContent = 'Logging in...';
            
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Login successful
                    window.location.href = 'index.html';
                })
                .catch(error => {
                    // Login failed
                    loginError.textContent = error.message;
                    loginBtn.disabled = false;
                    loginBtn.textContent = 'Login';
                });
        });
    }
    
    // Handle logout
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('logout-link')) {
            e.preventDefault();
            auth.signOut().then(() => {
                window.location.href = '../index.html';
            });
        }
    });
});

function updateAdminLinks(isLoggedIn) {
    const adminLinks = document.querySelectorAll('.admin-link');
    
    adminLinks.forEach(link => {
        if (isLoggedIn) {
            link.innerHTML = `
                <a href="admin/index.html">Admin Panel</a>
                <a href="#" class="logout-link">Logout</a>
            `;
        } else {
            link.innerHTML = '<a href="admin/login.html">Admin Login</a>';
        }
    });
}