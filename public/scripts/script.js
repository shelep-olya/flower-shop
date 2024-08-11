document.querySelectorAll('.fa-heart').forEach(button => {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-product-id');
        await fetch(`/add-to-favorites/${productId}`, { method: 'POST' });
        
    });
});
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-product-id');
        await fetch(`/add-to-cart/${productId}`, { method: 'POST' });
      
    });
});