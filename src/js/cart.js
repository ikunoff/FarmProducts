document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem("isLogged") === null) {
        alert("Пожалуйста, войдите в аккаунт или зарегистрируйтесь, чтобы оформить заказ.");
        window.location.href = "./catalog.html";
        return;
    }

    const cartContainer = document.getElementById('cartContainer');
    const clearBtn = document.querySelector('.clear-cart-btn');

    const totalPriceElem = document.querySelector('.summary-total span:last-child');

    let cart = JSON.parse(localStorage.getItem('farmer_cart')) || [];

    function renderCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<div style="padding: 20px; text-align: center;">Ваша корзина пуста</div>';
            updateSummary(0, 0);
            return;
        }

        cartContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const itemHtml = `
                <div class="cart-item" data-index="${index}">
                    <img src="${item.image || '../image/products/default.jpg'}" alt="${item.title}" class="item-img">
                    <div class="item-details">
                        <div class="item-name">${item.title}</div>
                        <div class="item-price">${item.price} ₽/кг</div>
                    </div>
                    <div class="item-controls">
                        <button class="qty-btn minus" onclick="changeQty(${index}, -1)"></button>
                        <span class="qty-text">${item.quantity * 0.5} кг</span>
                        <button class="qty-btn plus" onclick="changeQty(${index}, 1)"></button>
                    </div>
                </div>
                <hr class="item-hr">
            `;
            cartContainer.insertAdjacentHTML('beforeend', itemHtml);
        });

        calculateTotals();
    }

    window.changeQty = (index, delta) => {
        cart[index].quantity += delta;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveAndRefresh();
    };

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Очистить корзину?')) {
                cart = [];
                saveAndRefresh();
            }
        });
    }

    function calculateTotals() {
        let totalWeight = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalWeight += item.quantity * 0.5;
            totalPrice += (item.price * (item.quantity * 0.5));
        });

        const discount = totalPrice > 2000 ? 300 : 0;
        const finalPrice = Math.max(0, totalPrice - discount);

        updateSummary(totalWeight, finalPrice, discount);
    }

    function updateSummary(weight, price, discount) {
        const summaryLines = document.querySelectorAll('.summary-line span:last-child');
        if (summaryLines.length >= 3) {
            summaryLines[0].textContent = `${weight.toFixed(1)} кг`;
            summaryLines[2].textContent = `${discount} ₽`;
        }
        if (totalPriceElem) {
            totalPriceElem.textContent = `${price.toLocaleString()} ₽`;
        }
    }

    function saveAndRefresh() {
        localStorage.setItem('farmer_cart', JSON.stringify(cart));
        renderCart();
    }

    renderCart();

    const submitOrderBtn = document.querySelector('.submit-order-btn');
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();

            if (cart.length === 0) {
                alert('Корзина пуста! Пожалуйста, добавьте товары перед оформлением.');
                return;
            }

            alert('Ваш заказ успешно оформлен!');

            cart = [];
            localStorage.removeItem('farmer_cart');

            window.location.href = './catalog.html';
        });
    }

    renderCart();
});