const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

populateUI();

let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .selected");

    const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const selectedSeatsIndexes = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeatsIndexes !== null && selectedSeatsIndexes.length > 0) {
        selectedSeatsIndexes.forEach((index) => {
            seats[index].classList.add('selected');
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

updateSelectedCount();