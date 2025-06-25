// Dev variable
const log = console.log
// 

const workouts = [
  {
    date: new Date(2025, 6 - 1, 27).toDateString(), // Juni 27, 2025
    workout: "Strength Lower body: Squats, Lunges, Calf Raises"
  },
  {
    date: new Date(2025, 6 - 1, 29).toDateString(), // Juni 29, 2025
    workout: "Endurance: 5km run + 15min jump rope"
  },
  {
    date: new Date(2025, 7 - 1, 1).toDateString(), // Juli 1, 2025
    workout: "Strength Upper body: Pushups, Pullups, Plank"
  }
];

// DOM elements
const display = document.querySelector(".display");
const previous = document.querySelector(".left");
const next = document.querySelector(".right");
const days = document.querySelector(".days");
const selected = document.querySelector(".selected");


// Date variables
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

// Norwegian date formatting
function formattedDate() {
    return date.toLocaleString("nb-NO", {
        month: "long",
        year: "numeric"
    })
}

function displayCalendar() {

    // Updates the header
    display.innerHTML = `${formattedDate()}`

    const today = new Date().toDateString();

    const firstDayOfCurrentMonth = new Date(year, month, 1) // Retrieve the first day of the current month

    let firstDayIndex = firstDayOfCurrentMonth.getDay() // Gets the index of the day of the current day, sun is 0, 1 is monday etc...
    firstDayIndex = firstDayIndex === 0 ? firstDayIndex = 6 : firstDayIndex - 1 // Converting the default sun (0), mon(1) index to mon(0), tues(1), etc...

    const lastDayOfCurrentMonth = new Date(year, month + 1, 0);
    const numberOfDays = lastDayOfCurrentMonth.getDate();

    // Empty divs loop, to compensate fill the empty slots, say 1st starts on a wednesday
    // These divs will act as empty divs for monday and tuesday so the 1st day of the month is placed on the correct spot
    for (let i = 1; i <= firstDayIndex; i++) {
        const div = document.createElement('div');
        div.innerHTML += '';

        days.appendChild(div);
    }

    // Day divs
    for (let i = 1; i <= numberOfDays; i++) {
        const div = document.createElement('div');
        const currentDate = new Date(year, month, i);
        const currentDateString = currentDate.toDateString();

        div.dataset.date = currentDateString

        // Add workout indicator if exists
        const workoutExists = workouts.some(w => w.date === currentDateString);

        div.innerHTML = workoutExists ? `${i} •` : `${i}`;

        if (currentDateString === today) {
            div.classList.add("current-date")
        }

        days.appendChild(div);
    }
};

// Updated the display div with a selected date
function displaySelected() {
    const dayEles = document.querySelectorAll('.days div');
    dayEles.forEach(day => {
        day.addEventListener('click', e => {
            const selectedDate = e.target.dataset.date;
            
            // Find the workout for this date
            const workoutEntry = workouts.find(w => w.date === selectedDate);

            // Build display string
            let displayText = `<strong>Selected Date:</strong> ${selectedDate}`;
            
            if (workoutEntry) {
                displayText += `<br><br><strong>Workout:</strong> ${workoutEntry.workout}`;
            } else {
                displayText += `<br><br><em>No workout for this day</em>`;
            }

            selected.innerHTML = displayText;
            // selected.innerHTML = `Selected Date: ${selectedDate}`
        })
    })
};

// Add functionality to previus button
previous.addEventListener('click', () => {
    days.innerHTML = '';
    selected.innerHTML = '';

    if (month < 0) {
        month = 11;
        year = year - 1;
    }

    month = month - 1;
    date.setMonth(month);

    displayCalendar();
    displaySelected();
});

// Add functionality to next button
next.addEventListener("click", () => {
    days.innerHTML = "";
    selected.innerHTML = "";

    if (month > 11) {
        month = 0;
        year = year + 1;
    }

    month = month + 1;
    date.setMonth(month);

    displayCalendar();
    displaySelected();
});

displayCalendar();
displaySelected();
