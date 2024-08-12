document.addEventListener("DOMContentLoaded", function() {
    const iconContainers = document.querySelectorAll('.icons');

    iconContainers.forEach(container => {
        const favoriteLink = container.querySelector('.fa-heart');
        const cartLink = container.querySelector('.cart-btn');
        const alertBox = container.querySelector('.auth-alert');
        if (favoriteLink && alertBox) {
            favoriteLink.addEventListener('click', function(event) {
                if (alertBox.style.display === 'block') {
                    return; 
                }

                if (favoriteLink.getAttribute('href') === '#') {
                    event.preventDefault();
                    alertBox.style.display = 'block';
  
                    setTimeout(() => {
                        alertBox.style.display = 'none';
                    }, 3000);
                }
            });
        }

        if (cartLink && alertBox) {
            cartLink.addEventListener('click', function(event) {
                if (alertBox.style.display === 'block') {
                    return; 
                }

                if (cartLink.getAttribute('href') === '#') {
                    event.preventDefault();
                    alertBox.style.display = 'block';
  
                    setTimeout(() => {
                        alertBox.style.display = 'none';
                    }, 3000);
                }
            });
        }
    });
});
