document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            accordionItem.classList.toggle('active');
            
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }
        });
    });
    
    // PDF Preview functionality
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const closeModal = document.querySelector('.close-modal');
    
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pdfUrl = this.getAttribute('data-pdf');
            pdfViewer.src = pdfUrl;
            modal.style.display = 'block';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        pdfViewer.src = '';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            pdfViewer.src = '';
        }
    });
    
    // Open accordion based on URL search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        // Simple search implementation - can be enhanced
        const normalizedQuery = searchQuery.toLowerCase();
        let foundMatch = false;
        
        document.querySelectorAll('.note-item h3').forEach(title => {
            if (title.textContent.toLowerCase().includes(normalizedQuery)) {
                const accordionItem = title.closest('.accordion-item');
                const accordionContent = accordionItem.querySelector('.accordion-content');
                
                accordionItem.classList.add('active');
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                
                // Scroll to the matched item
                title.scrollIntoView({ behavior: 'smooth', block: 'center' });
                foundMatch = true;
            }
        });
        
        if (!foundMatch) {
            // Show all accordions if no match found
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.add('active');
                item.querySelector('.accordion-content').style.maxHeight = 
                    item.querySelector('.accordion-content').scrollHeight + 'px';
            });
        }
    }
});