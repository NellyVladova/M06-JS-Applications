function solve() {
    const infoBox = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let busStop = {
        next: "depot"
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStop.next}`;

        try {
            const response = await fetch(url);
            busStop = await response.json();

            departBtn.disabled = true;
            arriveBtn.disabled = false;

            infoBox.textContent = `Next stop ${busStop.name}`;
        } catch (error) {
            infoBox.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${busStop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
