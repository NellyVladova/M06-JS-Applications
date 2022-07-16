import { renderer } from './renderer.js';
import { validateMonth, validateYear } from './validation.js';

const getYear = document.getElementById('years');
const years = Array.from(document.querySelectorAll('.monthCalendar')).reduce((year, data) => {
    year[data.id] = data;
    return year;
}, {});
const monthsElements = Array.from(document.querySelectorAll('.daysCalendar'));

renderer(getYear);

document.addEventListener('click', (event) => {
    if (validateYear(event)) {
        const year = event.target.textContent.trim();
        renderer(years[`year-${year}`]);

    } else if (validateMonth(event)) {
        const year = document.querySelector('caption').textContent;
        const month = event.target.innerText.trim();
        const monthIndex = months.findIndex(x => x == month);

        if (monthIndex !== -1) {
            const monthElement = monthsElements.find(x => x.id === `month-${year}-${monthIndex + 1}`);
            renderer(monthElement);
        }
    }

    if (event.target.tagName == 'CAPTION') {
        const dataText = event.target.innerText;

        if (dataText.match(/^([1-2]{1}[0-9]{3}) \- ([1-2]{1}[0-9]{3})$/g)) {
            return;
        }

        if (isNaN(dataText)) {
            const year = dataText.match(/[1-2]{1}[0-9]{3}/g);
            renderer(years[`year-${year}`]);
        } else {
            renderer(getYear);
        }
    }
});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];