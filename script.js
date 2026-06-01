// =========================
// FOOTBALL TRACKER PRO
// SCRIPT PART 1
// =========================

// ---------- DATABASE ----------

let appData = JSON.parse(localStorage.getItem("footballTracker")) || {

    tournamentDate: "",

    dailyGoals: [],

    workouts: [],

    shootingSessions: [],

    matches: [],

    history: [],

    records: {

        bestAccuracy: 0,
        bestConversion: 0,
        highestRating: 0,
        mostGoals: 0,
        highestEnergy: 0

    }

};

// ---------- SAVE ----------

function saveData() {

    localStorage.setItem(
        "footballTracker",
        JSON.stringify(appData)
    );

}

// ---------- TAB SYSTEM ----------

function showTab(tabId) {

    const tabs =
        document.querySelectorAll(".tab");

    tabs.forEach(tab => {

        tab.classList.remove("active");

    });

    document
        .getElementById(tabId)
        .classList.add("active");

}

// ---------- HISTORY ----------

function addHistory(text) {

    appData.history.unshift({

        text: text,

        date: new Date().toLocaleString()

    });

    saveData();

    renderHistory();

}

// ---------- HISTORY UI ----------

function renderHistory() {

    const container =
        document.getElementById(
            "historyContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    appData.history.forEach(item => {

        container.innerHTML += `

        <div class="history-item">

            <strong>${item.text}</strong>

            <div class="history-date">
                ${item.date}
            </div>

        </div>

        `;

    });

}

// ---------- TOURNAMENT ----------

function saveTournamentDate() {

    const date =
        document.getElementById(
            "tournamentDate"
        ).value;

    appData.tournamentDate = date;

    saveData();

    updateCountdown();

    addHistory(
        "Tournament date updated"
    );

}

// ---------- COUNTDOWN ----------

function updateCountdown() {

    const display =
        document.getElementById(
            "countdownDisplay"
        );

    if (!display) return;

    if (!appData.tournamentDate) {

        display.innerText =
            "No Tournament Set";

        return;

    }

    const today =
        new Date();

    const tournament =
        new Date(
            appData.tournamentDate
        );

    const difference =
        tournament - today;

    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );

    if (days < 0) {

        display.innerText =
            "Tournament Passed";

    } else {

        display.innerText =
            days + " Days Remaining";

    }

}

// ---------- DAILY GOALS ----------

function saveGoal() {

    const goalText =
        document.getElementById(
            "goalText"
        ).value;

    const completed =
        document.getElementById(
            "goalCompleted"
        ).checked;

    if (!goalText) {

        alert(
            "Enter a goal first"
        );

        return;

    }

    const goal = {

        text: goalText,

        completed: completed,

        date:
            new Date()
            .toLocaleDateString()

    };

    appData.dailyGoals.push(goal);

    saveData();

    addHistory(

        completed
        ? `Completed Goal: ${goalText}`
        : `Added Goal: ${goalText}`

    );

    document.getElementById(
        "goalText"
    ).value = "";

    document.getElementById(
        "goalCompleted"
    ).checked = false;

}

// ---------- DASHBOARD ----------

function updateDashboard() {

    const totalWorkouts =
        document.getElementById(
            "totalWorkouts"
        );

    const totalMatches =
        document.getElementById(
            "totalMatches"
        );

    if (totalWorkouts) {

        totalWorkouts.innerText =
            appData.workouts.length;

    }

    if (totalMatches) {

        totalMatches.innerText =
            appData.matches.length;

    }

    // Latest Accuracy

    const latestAccuracy =
        document.getElementById(
            "latestAccuracy"
        );

    if (
        latestAccuracy &&
        appData.shootingSessions.length
    ) {

        const last =
            appData.shootingSessions[
            appData.shootingSessions.length - 1
            ];

        latestAccuracy.innerText =
            last.accuracy + "%";

    }

    // Latest Rating

    const latestRating =
        document.getElementById(
            "latestRating"
        );

    if (
        latestRating &&
        appData.matches.length
    ) {

        const lastMatch =
            appData.matches[
            appData.matches.length - 1
            ];

        latestRating.innerText =
            lastMatch.rating;

    }

}

// ---------- LOAD ----------

function loadApp() {

    renderHistory();

    updateCountdown();

    updateDashboard();

    if (appData.tournamentDate) {

        const dateInput =
            document.getElementById(
                "tournamentDate"
            );

        if (dateInput) {

            dateInput.value =
                appData.tournamentDate;

        }

    }

}

// ---------- START ----------

loadApp();

console.log("SCRIPT LOADED");
