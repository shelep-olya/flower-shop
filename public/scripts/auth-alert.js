document.addEventListener("DOMContentLoaded", function() {
    const iconContainers = document.querySelectorAll('.icons');

    iconContainers.forEach(container => {
        const links = container.querySelectorAll('a');
        const alertBox = container.querySelector('.auth-alert');

        if (alertBox) {
            links.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    alertBox.style.display = 'block';
  
                    setTimeout(() => {
                        alertBox.style.display = 'none';
                    }, 3000);
                });
            });
        }
    });
});
