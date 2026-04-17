document.addEventListener("DOMContentLoaded", () => {
    const filterWrappers = document.querySelectorAll('.filter-wrapper');

    filterWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector('.filter-button');
        const dropdown = wrapper.querySelector('.filter-dropdown');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            filterWrappers.forEach(w => {
                if (w !== wrapper) {
                    w.querySelector('.filter-dropdown').classList.remove('active');
                    w.querySelector('.filter-button').classList.remove('active');
                }
            });

            dropdown.classList.toggle('active');
            btn.classList.toggle('active');
        });

        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    document.addEventListener('click', () => {
        filterWrappers.forEach(wrapper => {
            wrapper.querySelector('.filter-dropdown').classList.remove('active');
            wrapper.querySelector('.filter-button').classList.remove('active');
        });
    });

    const cards = document.querySelectorAll('.card');
    const checkboxes = document.querySelectorAll('.filter-dropdown input[type="checkbox"]');
    const minPriceInput = document.getElementById('price-min');
    const maxPriceInput = document.getElementById('price-max');

    function filterCards() {
        const selectedFilters = {
            category: [],
            farmer: [],
            region: []
        };

        checkboxes.forEach(cb => {
            if (cb.checked) {
                selectedFilters[cb.dataset.filter].push(cb.value);
            }
        });

        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardFarmer = card.dataset.farmer;
            const cardRegion = card.dataset.region;
            const cardPrice = parseFloat(card.dataset.price) || 0;

            const matchCategory = selectedFilters.category.length === 0 || selectedFilters.category.includes(cardCategory);
            const matchFarmer = selectedFilters.farmer.length === 0 || selectedFilters.farmer.includes(cardFarmer);
            const matchRegion = selectedFilters.region.length === 0 || selectedFilters.region.includes(cardRegion);
            const matchPrice = cardPrice >= minPrice && cardPrice <= maxPrice;

            if (matchCategory && matchFarmer && matchRegion && matchPrice) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
    minPriceInput.addEventListener('input', filterCards);
    maxPriceInput.addEventListener('input', filterCards);
});