import {
    openModal,
    closeModal
} from './modal';
import {
    postData
} from '../services/services';

function forms(formSelector) {
    // WORKING WITH GET & POST REQUESTS

    const forms = document.querySelectorAll(formSelector),
        message = {
            loading: './icons/spinner.svg',
            success: 'Success!',
            fail: 'Fail!..',
        };

    forms.forEach(item => bindPostData(item));


    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            // statusMessage.classList.add('status');
            statusMessage.src = message.loading;
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

            postData('http://localhost:3000/requests', json)
                .then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.fail);
                })
                .finally(() => {
                    form.reset();
                });


            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.fail);
            //     }
            // });
        });

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');


            prevModalDialog.classList.add('hide');
            openModal('.modal');

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
                closeModal('.modal');
            }, 4000);
        }

        // fetch('./db.json')
        //     .then(data => data.json())
        //     .then(res => console.log(res));
    }

}

export default forms;