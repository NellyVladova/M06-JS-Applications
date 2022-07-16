const allSections = document.querySelectorAll('section');
allSections.forEach(el => {
    el.style.display = 'none';
})
allSections[0].style.display = '';

const allYears = document.querySelectorAll('#years tbody td');

allYears.forEach(el => {
    el.addEventListener('click', showYear);
});

function showYear(ev) {
    ev.preventDefault();

    const eventText = ev.target.textContent;

    const yearId = `year-${eventText}`;

    const wantedYear = document.getElementById(yearId);
}


//To continue...