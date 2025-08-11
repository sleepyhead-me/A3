document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // If campus life tab is selected, restart slideshow
            if (tabId === 'campus-life') {
                initSlideshow();
            }
        });
    });
    
    // Initialize slideshow
    initSlideshow();
    
    // Load student works
    loadStudentWorks();
});

let slideIndex = 0;
let slideInterval;
let isPaused = false;

function initSlideshow() {
    const slideshow = document.querySelector('.slideshow');
    
    // Clear existing slides
    slideshow.innerHTML = '';
    
    // Here you would load actual photos from Firebase
    // For example:
    // db.collection('gallery').get().then(snapshot => {
    //     snapshot.forEach(doc => {
    //         const photo = doc.data();
    //         slideshow.innerHTML += `
    //             <div class="slide">
    //                 <img src="${photo.imageUrl}" alt="${photo.title}">
    //                 <div class="slide-caption">${photo.title}</div>
    //             </div>
    //         `;
    //     });
    //     
    //     showSlides();
    //     startSlideshow();
    // });
    
    // For now, use dummy data
    const dummyPhotos = [
        { title: 'Campus Building', imageUrl: 'https://via.placeholder.com/800x400?text=Campus+Building' },
        { title: 'Classroom', imageUrl: 'https://via.placeholder.com/800x400?text=Classroom' },
        { title: 'Library', imageUrl: 'https://via.placeholder.com/800x400?text=Library' }
    ];
    
    dummyPhotos.forEach(photo => {
        slideshow.innerHTML += `
            <div class="slide">
                <img src="${photo.imageUrl}" alt="${photo.title}">
                <div class="slide-caption">${photo.title}</div>
            </div>
        `;
    });
    
    showSlides();
    startSlideshow();
    
    // Slideshow controls
    document.querySelector('.slideshow-prev').addEventListener('click', () => {
        plusSlides(-1);
    });
    
    document.querySelector('.slideshow-next').addEventListener('click', () => {
        plusSlides(1);
    });
    
    document.querySelector('.slideshow-pause').addEventListener('click', () => {
        togglePause();
    });
    
    // Pause on hover
    slideshow.addEventListener('mouseenter', () => {
        if (!isPaused) {
            clearInterval(slideInterval);
        }
    });
    
    slideshow.addEventListener('mouseleave', () => {
        if (!isPaused) {
            startSlideshow();
        }
    });
}

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Wrap around if needed
    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    
    // Show current slide
    slides[slideIndex].style.display = 'block';
}

function plusSlides(n) {
    slideIndex += n;
    showSlides();
    
    // Reset timer
    clearInterval(slideInterval);
    if (!isPaused) {
        startSlideshow();
    }
}

function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlides();
    }, 5000);
}

function togglePause() {
    isPaused = !isPaused;
    const pauseBtn = document.querySelector('.slideshow-pause');
    
    if (isPaused) {
        clearInterval(slideInterval);
        pauseBtn.textContent = '▶';
    } else {
        startSlideshow();
        pauseBtn.textContent = '⏸';
    }
}

function loadStudentWorks() {
    const worksList = document.querySelector('.works-list');
    worksList.innerHTML = '<p>Loading student works...</p>';
    
    // Here you would load actual works from Firebase
    // For example:
    // db.collection('works').get().then(snapshot => {
    //     if (snapshot.empty) {
    //         worksList.innerHTML = '<p>No student works found.</p>';
    //         return;
    //     }
    //     
    //     let html = '';
    //     snapshot.forEach(doc => {
    //         const work = doc.data();
    //         html += `
    //             <div class="work-item">
    //                 <h3>${work.title}</h3>
    //                 <p>${work.description}</p>
    //                 <a href="${work.fileUrl}" target="_blank" class="view-work">View Work</a>
    //             </div>
    //         `;
    //     });
    //     
    //     worksList.innerHTML = html;
    // });
    
    // For now, use dummy data
    setTimeout(() => {
        worksList.innerHTML = `
            <div class="work-item">
                <h3>Mathematics in Nature</h3>
                <p>A research paper exploring fractal patterns in natural formations.</p>
                <a href="#" class="view-work">View Work</a>
            </div>
            <div class="work-item">
                <h3>The Beauty of Prime Numbers</h3>
                <p>An artistic exploration of prime number distributions.</p>
                <a href="#" class="view-work">View Work</a>
            </div>
        `;
    }, 500);
}