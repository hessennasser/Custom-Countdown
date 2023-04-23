// Define constants
const second = 1000; // Milliseconds in a second
const minute = second * 60; // Milliseconds in a minute
const hour = minute * 60; // Milliseconds in an hour
const day = hour * 24; // Milliseconds in a day

// Get DOM elements
const inputContainer = document.getElementById("input-container"); // The input container element
const countdownForm = document.getElementById("countdownForm"); // The countdown form element
const dateEl = document.getElementById("date-picker"); // The date picker element
const titleEl = document.getElementById("title"); // The title input element
const countdownEl = document.getElementById("countdown"); // The countdown element
const countdownElTitle = document.getElementById("countdown-title"); // The countdown title element
const countdownBtn = document.getElementById("countdown-button"); // The countdown reset button element
const timeElements = document.querySelectorAll("span"); // The time elements within the countdown element
const completeEl = document.getElementById("complete"); // The countdown completion element
const completeElInfo = document.getElementById("complete-info"); // The countdown completion information element
const completeBtn = document.getElementById("complete-button"); // The countdown completion reset button element

// Define variables
let countdownTitle = ""; // The title of the countdown
let countdownDate = ""; // The date of the countdown
let countdownValue; // The time value of the countdown
let countdownActive; // The active interval for updating the countdown
let savedCountdown; // The saved countdown object

// Set minimum date for date picker to today's date
dateEl.min = new Date().toISOString().split("T")[0];

// Set minimum date for date picker to today's date
dateEl.min = new Date().toISOString().split("T")[0];

// Define functions

// updateCountdown() function is called when the form is submitted.
// It retrieves the user input for the countdown title and date, 
// saves it to local storage, and updates the DOM to display the countdown.
const updateCountdown = (e) => {
    e.preventDefault(); // prevents the default form submit behavior
    countdownTitle = titleEl.value; // stores the user input for the countdown title
    countdownDate = dateEl.value; // stores the user input for the countdown date
    savedCountdown = { title: countdownTitle, date: countdownDate }; // creates an object with the title and date values
    localStorage.setItem("countdown", JSON.stringify(savedCountdown)); // saves the countdown to local storage
    if (!countdownDate) { // checks if no date is selected
        alert("Please select a date for the countdown."); // displays an alert to prompt the user to select a date
    } else {
        countdownValue = new Date(countdownDate).getTime(); // gets the time value of the selected date in milliseconds
        updateDOM(); // updates the DOM to display the countdown
    }
};

// updateDOM() function updates the countdown display every second.
const updateDOM = () => {
    inputContainer.hidden = true; // hides the input form
    countdownEl.hidden = false; // shows the countdown display
    completeEl.hidden = true; // hides the completion message
    countdownActive = setInterval(() => { // starts the countdown interval
        const now = new Date().getTime(); // gets the current time in milliseconds
        const distance = countdownValue - now; // calculates the time difference between the selected date and the current time
        const days = Math.floor(distance / day); // calculates the remaining days
        const hours = Math.floor((distance % day) / hour); // calculates the remaining hours
        const minutes = Math.floor((distance % hour) / minute); // calculates the remaining minutes
        const seconds = Math.floor((distance % minute) / second); // calculates the remaining seconds
        countdownElTitle.textContent = countdownTitle; // sets the countdown title in the display
        timeElements[0].textContent = days; // sets the remaining days in the display
        timeElements[1].textContent = hours; // sets the remaining hours in the display
        timeElements[2].textContent = minutes; // sets the remaining minutes in the display
        timeElements[3].textContent = seconds; // sets the remaining seconds in the display
        if (distance <= 0) { // checks if the countdown is completed
            clearInterval(countdownActive); // stops the countdown interval
            countdownEl.hidden = true; // hides the countdown display
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`; // sets the completion message
            completeEl.hidden = false; // shows the completion message
            localStorage.removeItem("countdown"); // removes the saved countdown from local storage
        }
    }, second);
};

const reset = () => {
    inputContainer.hidden = false;
    countdownEl.hidden = true;
    completeEl.hidden = true;
    clearInterval(countdownActive);
    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
};

const restorePreviousCountdown = () => {
    if (localStorage.getItem("countdown")) {
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
};

// Add event listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// Restore previous countdown on page load
restorePreviousCountdown();