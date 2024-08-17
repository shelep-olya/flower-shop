const stripe = Stripe('your-publishable-key');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

document.getElementById('payment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const { clientSecret } = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }) 
    }).then(r => r.json());

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
        },
    });

    if (error) {
        document.getElementById('payment-result').textContent = error.message;
    } else {
        document.getElementById('payment-result').textContent = 'Payment successful!';
    }
});