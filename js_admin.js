document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = 'login.html';
        } else {
            // User is authenticated, load data
            loadDashboardStats();
            loadNotes();
            loadGalleryPhotos();
            loadStudentWorks();
        }
    });
    
    // Navigation between sections
    document.querySelectorAll('.admin-sidebar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state in sidebar
            document.querySelectorAll('.admin-sidebar a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show the corresponding section
            const sectionId = this.getAttribute('data-section') + '-section';
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Add content buttons
    document.getElementById('add-note-btn').addEventListener('click', () => {
        openContentModal('note');
    });
    
    document.getElementById('add-photo-btn').addEventListener('click', () => {
        openContentModal('photo');
    });
    
    document.getElementById('add-work-btn').addEventListener('click', () => {
        openContentModal('work');
    });
    
    // Modal functionality
    const modal = document.getElementById('content-modal');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        resetForm();
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        resetForm();
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            resetForm();
        }
    });
    
    // Form submission
    document.getElementById('content-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveContent();
    });
});

function openContentModal(type, contentId = null) {
    const modal = document.getElementById('content-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('content-form');
    
    // Reset form and set type
    resetForm();
    document.getElementById('content-type').value = type;
    
    // Configure modal based on content type
    switch(type) {
        case 'note':
            modalTitle.textContent = contentId ? 'Edit Note' : 'Add New Note';
            document.getElementById('description-group').style.display = 'none';
            document.getElementById('year-group').style.display = 'block';
            break;
            
        case 'photo':
            modalTitle.textContent = contentId ? 'Edit Photo' : 'Add New Photo';
            document.getElementById('description-group').style.display = 'block';
            document.getElementById('year-group').style.display = 'none';
            break;
            
        case 'work':
            modalTitle.textContent = contentId ? 'Edit Student Work' : 'Add New Student Work';
            document.getElementById('description-group').style.display = 'block';
            document.getElementById('year-group').style.display = 'none';
            break;
    }
    
    // If editing, load the content data
    if (contentId) {
        document.getElementById('content-id').value = contentId;
        
        // Here you would load the existing data from Firebase
        // For example:
        // const docRef = type === 'note' ? db.collection('notes').doc(contentId) : 
        //                type === 'photo' ? db.collection('gallery').doc(contentId) : 
        //                db.collection('works').doc(contentId);
        //
        // docRef.get().then(doc => {
        //     if (doc.exists) {
        //         const data = doc.data();
        //         document.getElementById('content-title').value = data.title;
        //         // ... set other fields
        //     }
        // });
    }
    
    modal.style.display = 'block';
}

function resetForm() {
    const form = document.getElementById('content-form');
    form.reset();
    document.getElementById('content-id').value = '';
    document.getElementById('content-type').value = '';
    document.getElementById('description-group').style.display = 'block';
    document.getElementById('year-group').style.display = 'block';
}

function saveContent() {
    const type = document.getElementById('content-type').value;
    const contentId = document.getElementById('content-id').value;
    const title = document.getElementById('content-title').value;
    const description = document.getElementById('content-description').value;
    const year = document.getElementById('content-year').value;
    const file = document.getElementById('content-file').files[0];
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving...';
    
    // Here you would implement the Firebase save logic
    // For example:
    // if (type === 'note') {
    //     const noteData = { title, year, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
    //     
    //     if (contentId) {
    //         // Update existing note
    //         db.collection('notes').doc(contentId).update(noteData)
    //             .then(() => {
    //                 modal.style.display = 'none';
    //                 loadNotes();
    //             });
    //     } else {
    //         // Add new note
    //         db.collection('notes').add(noteData)
    //             .then(() => {
    //                 modal.style.display = 'none';
    //                 loadNotes();
    //             });
    //     }
    // }
    // Similar logic for other content types
    
    // For now, just simulate a successful save
    setTimeout(() => {
        modal.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save';
        alert('Content saved successfully!');
        
        // Refresh the appropriate list
        switch(type) {
            case 'note': loadNotes(); break;
            case 'photo': loadGalleryPhotos(); break;
            case 'work': loadStudentWorks(); break;
        }
    }, 1000);
}

function loadDashboardStats() {
    // Here you would load actual stats from Firebase
    // For example:
    // db.collection('notes').get().then(snapshot => {
    //     document.getElementById('total-notes').textContent = snapshot.size;
    // });
    //
    // Similar for photos and works
    
    // For now, just set some dummy values
    document.getElementById('total-notes').textContent = '12';
    document.getElementById('total-photos').textContent = '24';
    document.getElementById('total-works').textContent = '8';
}

function loadNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '<p>Loading notes...</p>';
    
    // Here you would load notes from Firebase
    // For example:
    // db.collection('notes').orderBy('createdAt', 'desc').get().then(snapshot => {
    //     if (snapshot.empty) {
    //         notesList.innerHTML = '<p>No notes found.</p>';
    //         return;
    //     }
    //     
    //     let html = '';
    //     snapshot.forEach(doc => {
    //         const note = doc.data();
    //         html += `
    //             <div class="content-item">
    //                 <div class="content-info">
    //                     <h3>${note.title}</h3>
    //                     <p>${note.year} • PDF • 2.4 MB</p>
    //                 </div>
    //                 <div class="content-actions">
    //                     <button class="btn-edit" data-id="${doc.id}" data-type="note">Edit</button>
    //                     <button class="btn-delete" data-id="${doc.id}" data-type="note">Delete</button>
    //                 </div>
    //             </div>
    //         `;
    //     });
    //     
    //     notesList.innerHTML = html;
    //     
    //     // Add event listeners to edit/delete buttons
    //     setupContentActions();
    // });
    
    // For now, just show some dummy data
    setTimeout(() => {
        notesList.innerHTML = `
            <div class="content-item">
                <div class="content-info">
                    <h3>Calculus I</h3>
                    <p>1st Year • PDF • 2.4 MB</p>
                </div>
                <div class="content-actions">
                    <button class="btn-edit" data-id="note1" data-type="note">Edit</button>
                    <button class="btn-delete" data-id="note1" data-type="note">Delete</button>
                </div>
            </div>
            <div class="content-item">
                <div class="content-info">
                    <h3>Linear Algebra</h3>
                    <p>2nd Year • PDF • 1.8 MB</p>
                </div>
                <div class="content-actions">
                    <button class="btn-edit" data-id="note2" data-type="note">Edit</button>
                    <button class="btn-delete" data-id="note2" data-type="note">Delete</button>
                </div>
            </div>
        `;
        
        setupContentActions();
    }, 500);
}

function loadGalleryPhotos() {
    const galleryList = document.getElementById('gallery-list');
    galleryList.innerHTML = '<p>Loading gallery photos...</p>';
    
    // Similar implementation to loadNotes() but for gallery photos
    // ...
    
    // Dummy data
    setTimeout(() => {
        galleryList.innerHTML = `
            <div class="content-item">
                <div class="content-info">
                    <h3>Campus Event 2023</h3>
                    <p>Annual mathematics department event</p>
                </div>
                <div class="content-actions">
                    <button class="btn-edit" data-id="photo1" data-type="photo">Edit</button>
                    <button class="btn-delete" data-id="photo1" data-type="photo">Delete</button>
                </div>
            </div>
        `;
        
        setupContentActions();
    }, 500);
}

function loadStudentWorks() {
    const worksList = document.getElementById('works-list');
    worksList.innerHTML = '<p>Loading student works...</p>';
    
    // Similar implementation to loadNotes() but for student works
    // ...
    
    // Dummy data
    setTimeout(() => {
        worksList.innerHTML = `
            <div class="content-item">
                <div class="content-info">
                    <h3>Mathematics in Nature</h3>
                    <p>Research paper by Student Name</p>
                </div>
                <div class="content-actions">
                    <button class="btn-edit" data-id="work1" data-type="work">Edit</button>
                    <button class="btn-delete" data-id="work1" data-type="work">Delete</button>
                </div>
            </div>
        `;
        
        setupContentActions();
    }, 500);
}

function setupContentActions() {
    // Edit buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const contentId = this.getAttribute('data-id');
            const contentType = this.getAttribute('data-type');
            openContentModal(contentType, contentId);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const contentId = this.getAttribute('data-id');
            const contentType = this.getAttribute('data-type');
            
            if (confirm('Are you sure you want to delete this item?')) {
                // Here you would delete from Firebase
                // For example:
                // db.collection(contentType === 'note' ? 'notes' : 
                //     contentType === 'photo' ? 'gallery' : 'works')
                //     .doc(contentId).delete().then(() => {
                //         // Refresh the appropriate list
                //         switch(contentType) {
                //             case 'note': loadNotes(); break;
                //             case 'photo': loadGalleryPhotos(); break;
                //             case 'work': loadStudentWorks(); break;
                //         }
                //     });
                
                // For now, just show a message
                alert('Item deleted successfully!');
                
                // Refresh the appropriate list
                switch(contentType) {
                    case 'note': loadNotes(); break;
                    case 'photo': loadGalleryPhotos(); break;
                    case 'work': loadStudentWorks(); break;
                }
            }
        });
    });
}