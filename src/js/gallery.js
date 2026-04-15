window.addEventListener("load", () => {
    const tracks = document.querySelectorAll('.track');

    tracks.forEach(track => {
        const list = track.querySelector('.list');
        if (!list) return;

        const setupMarquee = () => {
            const allLists = track.querySelectorAll('.list');
            allLists.forEach((el, index) => {
                if (index !== 0) el.remove();
            });

            const listWidth = list.getBoundingClientRect().width;

            if (listWidth === 0) return;

            track.style.setProperty('--scroll-width', `${listWidth}px`);

            const screenWidth = window.innerWidth;
            const clonesNeeded = Math.ceil(screenWidth / listWidth) + 1;

            for (let i = 0; i < clonesNeeded; i++) {
                const clone = list.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            }
        };

        setupMarquee();

        window.addEventListener('resize', setupMarquee);
    });
});