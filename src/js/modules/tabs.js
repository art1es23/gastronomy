// TOGGLE TABS

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabsWrapper = document.querySelector(tabsSelector),
        tabs = document.querySelectorAll(tabsContentSelector),
        tabContent = document.querySelectorAll(tabsParentSelector);

    function showTabs(i = 0) {
        tabs[i].classList.add(activeClass);
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
    }

    function hideTabs() {
        tabContent.forEach((item, i) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    hideTabs();
    showTabs();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsContentSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });

}

export default tabs;