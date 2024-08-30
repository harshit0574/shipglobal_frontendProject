document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');
  
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('open');
  
        // Close all sections
        document.querySelectorAll('.accordion-content').forEach(c => {
          c.classList.remove('open');
          c.style.maxHeight = null;
        });
  
        // Open the clicked section if it was not already open
        if (!isOpen) {
          content.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
  