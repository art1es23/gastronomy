function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {
    // MAIN SLIDER WITH 2 - VERSIONS
    const slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter);

    let slidesWrapperWidth = slidesWrapper.clientWidth;
    let slideIndex = 1;
    let slideOffset = 0;
    let dots = [];

    function counter() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
    }


    function showCounter() {
        if (slides.length >= 10) {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        } else {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }
    }

    function showIndicators() {

        const sliderIndicators = document.createElement('ol');
        sliderIndicators.classList.add('carousel-indicators');
        slider.append(sliderIndicators);

        for (let i = 0; i < slides.length; i++) {
            const sliderDot = document.createElement('li');
            sliderDot.classList.add('dot');
            sliderDot.setAttribute('data-target', i + 1);
            if (i == 0) {
                sliderDot.style.opacity = 1;
            }
            sliderIndicators.append(sliderDot);
            dots.push(sliderDot);
        }

        dotsOpacity(dots);

        dots.forEach(dot => {
            dot.addEventListener('click', e => {
                const slideTo = e.target.getAttribute('data-target');

                slideIndex = slideTo;

                slideOffset = slidesWrapperWidth * (slideTo - 1);
                slidesField.style.transform = `translateX(-${slideOffset}px)`;

                counter();
                dotsOpacity(dots);

            });
        });
    }

    function init() {
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = 'all 0.5s ease';

        slidesWrapper.style.overflow = 'hidden';

        slides.forEach(item => {
            item.style.width = slidesWrapperWidth;
        });

        next.addEventListener('click', () => {
            if (slideOffset == slidesWrapperWidth * (slides.length - 1)) {
                slideOffset = 0;
            } else {
                slideOffset += slidesWrapperWidth;
            }
            slidesField.style.transform = `translateX(-${slideOffset}px)`;

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            counter();
            dotsOpacity(dots);

        });

        prev.addEventListener('click', () => {
            if (slideOffset == 0) {
                slideOffset = slidesWrapperWidth * (slides.length - 1);
            } else {
                slideOffset -= slidesWrapperWidth;
            }
            slidesField.style.transform = `translateX(-${slideOffset}px)`;


            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            counter();
            dotsOpacity(dots);

        });

    }

    function dotsOpacity(boxDots) {
        boxDots.forEach(dot => {
            dot.style.opacity = 0.5;
            boxDots[slideIndex - 1].style.opacity = 1;
        });
    }


    showCounter();
    showIndicators();
    init();


    // Calculator


    // SLIDER-2


    // Slider-1 //

    // init() {
    //     showCounter(slides);
    //     showSlides(slideIndex);
    //     prev.addEventListener('click', () => {
    //         plusSlides(-1);
    //     });
    //     next.addEventListener('click', () => {
    //         plusSlides(1);
    //     });
    // },
    // showCounter(n) {
    //     if (n.length >= 10) {
    //         total.textContent = `${n.length}`;
    //     } else {
    //         total.textContent = `0${n.length}`;
    //     }
    // },
    // showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';
    //     if (slideIndex >= 10) {
    //         current.textContent = `${slideIndex}`;
    //     } else {
    //         current.textContent = `0${slideIndex}`;
    //     }
    // },
    // plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

}


export default slider;