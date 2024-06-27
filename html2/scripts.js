document.addEventListener('DOMContentLoaded', () => {
    const readButtons = document.querySelectorAll('button[data-chapter-url]');
    const contentDisplay = document.getElementById('content-display');
    const featureSection = document.querySelector('section.feature');
    const latestUpdatesSection = document.querySelector('section.latest-updates');

    readButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-chapter-url');
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    contentDisplay.innerHTML = data;
                    hideSections();
                    contentDisplay.style.display = 'block';
                })
                .catch(error => console.error('Error loading content:', error));
        });
    });

    const navLinks = document.querySelectorAll('nav ul li a, .logo');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const sectionId = link.getAttribute('data-section');
            if (sectionId === "Home") {
                
                featureSection.style.display = 'block';
                latestUpdatesSection.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const section = document.getElementById(sectionId);
                hideSections();
                section.style.display = 'block';
            }
        });
    });

    function hideSections() {
        sections.forEach(sec => sec.style.display = 'none');
        contentDisplay.style.display = 'none';
    }

    
    featureSection.style.display = 'block';
    latestUpdatesSection.style.display = 'block';

    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        sections.forEach(section => {
            if (section.innerText.toLowerCase().includes(query)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});
