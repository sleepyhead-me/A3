document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileSideMenu = document.querySelector('.mobile-side-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileSideMenu.classList.add('active');
    });
    
    closeMenu.addEventListener('click', function() {
        mobileSideMenu.classList.remove('active');
    });
    
    // Check for saved user data
    checkUserRegistration();
    
    // Dark mode detection
    detectDarkMode();
    
    // Search functionality
    setupSearch();
});

function checkUserRegistration() {
    const studentName = localStorage.getItem('studentName');
    const academicYear = localStorage.getItem('academicYear');
    
    const welcomeSection = document.getElementById('personalized-welcome');
    const registrationForm = document.getElementById('registration-form');
    
    if (studentName && academicYear) {
        welcomeSection.innerHTML = `
            <h2>Welcome back, ${studentName}!</h2>
            <p>${academicYear} Student - Department of Mathematics</p>
        `;
        registrationForm.classList.add('hidden');
    } else {
        welcomeSection.innerHTML = `
            <h2>Welcome to Saadat Notes</h2>
            <p>Department of Mathematics Resources Hub</p>
        `;
        registrationForm.classList.remove('hidden');
        
        // Handle registration form submission
        document.getElementById('student-registration').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('student-name').value;
            const year = document.getElementById('academic-year').value;
            
            localStorage.setItem('studentName', name);
            localStorage.setItem('academicYear', year);
            
            location.reload();
        });
    }
}

function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });
}

function setupSearch() {
    const searchInput = document.getElementById('global-search');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

function performSearch(query) {
    if (!query.trim()) return;
    
    // Simple search implementation - can be enhanced with Firebase search
    const normalizedQuery = query.toLowerCase();
    
    // Check if the query matches any of our main pages
    if (normalizedQuery.includes('note') || normalizedQuery.includes('pdf') || normalizedQuery.includes('hand')) {
        window.location.href = 'notes.html';
    } else if (normalizedQuery.includes('gallery') || normalizedQuery.includes('photo') || normalizedQuery.includes('image')) {
        window.location.href = 'gallery.html';
    } else if (normalizedQuery.includes('contact') || normalizedQuery.includes('help') || normalizedQuery.includes('support')) {
        window.location.href = 'contact.html';
    } else {
        // Default to notes page with search parameter
        window.location.href = `notes.html?search=${encodeURIComponent(query)}`;
    }
}
