        // Simple animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.login-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            cards.forEach((card, index) => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                observer.observe(card);
            });
            
            // Add hover effect to buttons
            const buttons = document.querySelectorAll('.login-btn');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    button.style.transform = 'scale(1.05)';
                });
                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'scale(1)';
                });
            });
        });