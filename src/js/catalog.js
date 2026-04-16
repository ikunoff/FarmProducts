document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards');
    const cartBadge = document.getElementById('cartBadge');

    let cart = JSON.parse(localStorage.getItem('farmer_cart')) || [];

    const updateBadge = () => {
        cartBadge.textContent = cart.length;
        cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    };

    window.updateCartButtonsState = () => {
        const allCards = document.querySelectorAll('.card');

        allCards.forEach(card => {
            const titleElem = card.querySelector('.card-title');
            if (!titleElem) return;

            const title = titleElem.textContent.trim();
            const btn = card.querySelector('.card-button');
            const btnText = btn.querySelector('.title');

            const isInCart = cart.some(item => item.title === title);

            if (isInCart) {
                btn.classList.add('in-cart');
                if (btnText) {
                    btnText.textContent = 'В корзине';
                }
            } else {
                btn.classList.remove('in-cart');
                if (btnText) btnText.textContent = 'В корзину';
            }
        });
    };

    if (cardsContainer) {
        cardsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.card-button');
            if (!btn) return;

            const card = btn.closest('.card');
            const title = card.querySelector('.card-title').textContent.trim();

            if (btn.classList.contains('in-cart')) {
                cart = cart.filter(item => item.id !== title);

                localStorage.setItem('farmer_cart', JSON.stringify(cart));

                updateBadge();
                window.updateCartButtonsState();

                return;
            }

            const priceText = card.querySelector('.card-price').textContent.trim();
            const tag = card.querySelector('.card-tag').textContent.trim();
            const priceNumber = parseInt(priceText.replace(/\D+/g,""));
            const imgElement = card.querySelector('.card-img');
            const bgImageStyle = window.getComputedStyle(imgElement).backgroundImage;

            let imageUrl = "";
            if (bgImageStyle !== "none") {
                imageUrl = bgImageStyle.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            }

            const product = {
                id: title,
                title: title,
                price: priceNumber || 0,
                tag: tag,
                image: imageUrl,
                quantity: 1
            };

            cart.push(product);
            localStorage.setItem('farmer_cart', JSON.stringify(cart));

            updateBadge();
            window.updateCartButtonsState();
        });
    }

    updateBadge();
    window.updateCartButtonsState();
});