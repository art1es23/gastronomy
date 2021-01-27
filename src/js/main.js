'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabsToggle = {
        tabsWrapper: document.querySelector('.tabheader__items'),
        tabs: document.querySelectorAll('.tabheader__item'),
        tabContent: document.querySelectorAll('.tabcontent'),

        init: function () {
            this.hideTabs();
            this.showTabs();
            this.toggleTabs();
        },

        showTabs: function (i = 0) {
            this.tabs[i].classList.add('tabheader__item_active');
            this.tabContent[i].classList.add('show', 'fade');
            this.tabContent[i].classList.remove('hide');
        },

        hideTabs: function () {
            this.tabContent.forEach((item, i) => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            this.tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        },

        toggleTabs: function () {
            this.tabsWrapper.addEventListener('click', (event) => {
                const target = event.target;
                if (target && target.classList.contains('tabheader__item')) {
                    this.tabs.forEach((item, i) => {
                        if (item === target) {
                            this.hideTabs();
                            this.showTabs(i);
                        }
                    });
                }
            });
        }

    };

    //Modal window
    const modal = {
        modalWrapper: document.querySelector('.modal'),
        modalClose: document.querySelector('[data-close]'),
        modalOpen: document.querySelectorAll('[data-modal]'),
        modalForm: document.querySelector('.modal__content'),

        init: function () {
            this.openModal();
            this.closeModal();
        },

        openModal: function () {

            const openModalWrapper = () => {
                this.modalWrapper.classList.remove('hide');
                this.modalWrapper.classList.add('show', 'fade');
                document.body.style.overflow = 'hidden';

                clearInterval(modalTimer);
            };

            this.modalOpen.forEach(item =>
                item.addEventListener('click', openModalWrapper));

            const modalTimer = setTimeout(openModalWrapper, 3000);

            const showModalByScroll = () => {
                if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                    openModalWrapper();
                    window.removeEventListener('scroll', showModalByScroll);
                }
            };

            window.addEventListener('scroll', showModalByScroll);

        },

        closeModal: function () {

            const closeModalWrapper = () => {
                this.modalWrapper.classList.remove('show', 'fade');
                this.modalWrapper.classList.add('hide');
                document.body.style.overflow = 'auto';
            };

            this.modalWrapper.addEventListener('click', (event) => {
                let target = event.target;
                if (!(target && target.classList.contains('modal__content')) || target === this.modalClose) {
                    closeModalWrapper();
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.code === 'Escape' && this.modalWrapper.classList.contains('show')) {
                    closeModalWrapper();
                }
            });
        },

    };

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.classes = classes;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
            this.parentSelector = document.querySelector(parentSelector);
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parentSelector.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "Vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "Vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "Vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();


    modal.init();
    tabsToggle.init();

});