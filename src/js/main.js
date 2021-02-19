'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // TOGGLE TABS

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
            };

            this.modalOpen.forEach(item =>
                item.addEventListener('click', openModalWrapper));


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

    // GENERATION MENU CARDS
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

    const getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // getResources('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>`;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }


    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "Vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     "menu__item"
    // ).render();

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "Vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     "menu__item"
    // ).render();

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "Vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     "menu__item"
    // ).render();


    // WORKING WITH GET & POST REQUESTS

    const formGET = {
        forms: document.querySelectorAll('form'),
        message: {
            loading: './icons/spinner.svg',
            success: 'Success!',
            fail: 'Fail!..',
        },

        // INITIALIZATION 
        init: function () {
            this.forms.forEach(item => this.bindPostData(item));

            // this.showThanksModal();
        },

        // 
        postData: async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

            return await res.json();
        },

        bindPostData: function (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const statusMessage = document.createElement('img');
                // statusMessage.classList.add('status');
                statusMessage.src = this.message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);


                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                // const object = {};

                // formData.forEach((value, key) => {
                //     object[key] = value;
                // });

                // request.send(json);

                this.postData('http://localhost:3000/menu', json)
                    .then(data => data.text())
                    .then(data => {
                        showThanksModal(this.message.success);
                        statusMessage.remove();
                    })
                    .catch(() => {
                        showThanksModal(this.message.fail);
                    })
                    .finally(() => {
                        form.reset();
                    });


                // request.addEventListener('load', () => {
                //     if (request.status === 200) {
                //         console.log(request.response);
                //         showThanksModal(this.message.success);
                //         form.reset();
                //         statusMessage.remove();
                //     } else {
                //         showThanksModal(this.message.fail);
                //     }
                // });
            });

            function showThanksModal(message) {
                const prevModalDialog = document.querySelector('.modal__dialog');


                prevModalDialog.classList.add('hide');
                modal.openModal();

                const thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                        <div class="modal__content">
                            <div class="modal__close" data-close>x</div>
                            <div class="modal__title">${message}</div>
                        </div>
                    `;

                document.querySelector('.modal').append(thanksModal);

                setTimeout(() => {
                    thanksModal.remove();
                    prevModalDialog.classList.add('show');
                    prevModalDialog.classList.remove('hide');
                    modal.closeModal();
                }, 4000);
            }

            // fetch('./db.json')
            //     .then(data => data.json())
            //     .then(res => console.log(res));
        },

    };

    // MAIN SLIDER WITH 2 - VERSIONS
    class Slider {
        constructor() {
            this.sliderList = document.querySelector('.offer__slider');
            this.sliderWrapper = document.querySelector('.offer__slider-wrapper');
            this.sliderInner = document.querySelector('.offer__slider-inner');
            this.sliderListItems = document.querySelectorAll('.offer__slide');

            this.prevBtn = document.querySelector('.offer__slider-prev');
            this.nextBtn = document.querySelector('.offer__slider-next');

            this.counterSlide = document.querySelector('#current');
            this.counterSlideTotal = document.querySelector('#total');

            this.sliderWrapperWidth = this.sliderWrapper.clientWidth;

            this.sliderIndicatorList = document.querySelector('.carousel-indicators');

            this.slideIndex = 1;
            this.slideOffset = 0;
            this.dots = [];

            this.showCounter();
            this.showIndicators();
            this.init();
        }

        showCounter() {
            if (this.sliderListItems.length >= 10) {
                this.counterSlideTotal.textContent = this.sliderListItems.length;
                this.counterSlide.textContent = this.slideIndex;
            } else {
                this.counterSlideTotal.textContent = `0${this.sliderListItems.length}`;
                this.counterSlide.textContent = `0${this.slideIndex}`;
            }
        }

        showIndicators() {

            const sliderIndicators = document.createElement('ol');
            sliderIndicators.classList.add('carousel-indicators');
            this.sliderList.append(sliderIndicators);

            for (let i = 0; i < this.sliderListItems.length; i++) {
                const sliderDot = document.createElement('li');
                sliderDot.classList.add('dot');
                sliderDot.setAttribute('data-target', i + 1);
                if (i == 0) {
                    sliderDot.style.opacity = 1;
                }
                sliderIndicators.append(sliderDot);
                this.dots.push(sliderDot);
            }

            this.dotsOpacity(this.dots);

            this.dots.forEach(dot => {
                dot.addEventListener('click', e => {
                    const slideTo = e.target.getAttribute('data-target');

                    this.slideIndex = slideTo;

                    this.slideOffset = this.sliderWrapperWidth * (slideTo - 1);
                    this.sliderInner.style.transform = `translateX(-${this.slideOffset}px)`;

                    this.currentCounter();
                    this.dotsOpacity(this.dots);

                });
            });
        }

        init() {


            this.sliderInner.style.width = 100 * this.sliderListItems.length + '%';
            this.sliderInner.style.display = 'flex';
            this.sliderInner.style.transition = 'all 0.5s ease';

            this.sliderWrapper.style.overflow = 'hidden';

            this.sliderListItems.forEach(item => {
                item.style.width = this.sliderWrapperWidth;
            });

            this.nextBtn.addEventListener('click', () => {
                if (this.slideOffset == this.sliderWrapperWidth * (this.sliderListItems.length - 1)) {
                    this.slideOffset = 0;
                } else {
                    this.slideOffset += this.sliderWrapperWidth;
                }
                this.sliderInner.style.transform = `translateX(-${this.slideOffset}px)`;

                if (this.slideIndex == this.sliderListItems.length) {
                    this.slideIndex = 1;
                } else {
                    this.slideIndex++;
                }

                this.currentCounter();
                this.dotsOpacity(this.dots);

            });

            this.prevBtn.addEventListener('click', () => {
                if (this.slideOffset == 0) {
                    this.slideOffset = this.sliderWrapperWidth * (this.sliderListItems.length - 1);
                } else {
                    this.slideOffset -= this.sliderWrapperWidth;
                }
                this.sliderInner.style.transform = `translateX(-${this.slideOffset}px)`;


                if (this.slideIndex == 1) {
                    this.slideIndex = this.sliderListItems.length;
                } else {
                    this.slideIndex--;
                }

                this.currentCounter();
                this.dotsOpacity(this.dots);

            });

        }

        dotsOpacity(boxDots) {
            boxDots.forEach(dot => {
                dot.style.opacity = 0.5;
                boxDots[this.slideIndex - 1].style.opacity = 1;
            });
        }

        currentCounter() {
            if (this.sliderListItems.length < 10) {
                this.counterSlide.textContent = `0${this.slideIndex}`;
            } else {
                this.counterSlide.textContent = `${this.slideIndex}`;
            }
        }



        // SLIDER-2


        // Slider-1 //

        // init() {
        //     this.showCounter(this.sliderListItems);
        //     this.showSlides(this.slideIndex);
        //     this.prevBtn.addEventListener('click', () => {
        //         this.plusSlides(-1);
        //     });
        //     this.nextBtn.addEventListener('click', () => {
        //         this.plusSlides(1);
        //     });
        // },
        // showCounter(n) {
        //     if (n.length >= 10) {
        //         this.counterSlideTotal.textContent = `${n.length}`;
        //     } else {
        //         this.counterSlideTotal.textContent = `0${n.length}`;
        //     }
        // },
        // showSlides(n) {
        //     if (n > this.sliderListItems.length) {
        //         this.slideIndex = 1;
        //     }
        //     if (n < 1) {
        //         this.slideIndex = this.sliderListItems.length;
        //     }
        //     this.sliderListItems.forEach(item => item.style.display = 'none');
        //     this.sliderListItems[this.slideIndex - 1].style.display = 'block';
        //     if (this.slideIndex >= 10) {
        //         this.counterSlide.textContent = `${this.slideIndex}`;
        //     } else {
        //         this.counterSlide.textContent = `0${this.slideIndex}`;
        //     }
        // },
        // plusSlides(n) {
        //     this.showSlides(this.slideIndex += n);
        // }

    }

    formGET.init();
    modal.init();
    tabsToggle.init();
    // slider.init();
    const slider = new Slider();

});