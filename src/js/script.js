'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';

// import tabsToggle from './modules/tabs';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    timer('.timer', '2021-05-20');
    cards();
    calc();
    forms('form');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});