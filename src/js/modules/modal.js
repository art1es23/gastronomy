function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('hide');
    modal.classList.add('show', 'fade');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show', 'fade');
    modal.classList.add('hide');
    document.body.style.overflow = 'auto';
}

function modal(triggerSelector, modalSelector) {
    //Modal window

    const
        modal = document.querySelector(modalSelector),
        modalOpen = document.querySelectorAll(triggerSelector);

    modalOpen.forEach(item =>
        item.addEventListener('click', () => openModal(modalSelector)));

    modal.addEventListener('click', (event) => {
        let target = event.target;
        if (target === modal || target === document.querySelector('[data-close]')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
    openModal
};
export {
    closeModal
};