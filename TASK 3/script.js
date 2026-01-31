let cart = [];

document.getElementById('add-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!name || price <= 0 || quantity < 1 || isNaN(quantity)) {
        alert('Invalid input!');
        return;
    }

    const product = { name, price, quantity };
    cart.push(product);
    updateCart();
    document.getElementById('product-form').reset();
});

function updateCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';
    let totalAmount = 0;

    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        totalAmount += total;
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${total.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
        cartBody.innerHTML += row;
    });

    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}