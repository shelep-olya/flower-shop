document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');

    stars.forEach((star, index) => {
        star.addEventListener('click', function () {
            const ratingValue = star.getAttribute('data-value');
            ratingInput.value = ratingValue;

            stars.forEach((s, i) => {
                if (i < ratingValue) {
                    s.classList.add('active');
                    s.innerHTML = '&#9733;'; 
                } else {
                    s.classList.remove('active');
                    s.innerHTML = '&#9734;'; 
                }
            });
        });
    });
});
