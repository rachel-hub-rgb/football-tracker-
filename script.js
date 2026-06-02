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

   profile: {

    name: "",
    position: "",
    age: "",
    height: "",
    weight: "",
    strongFoot: ""

},
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
    // PASTE PROFILE CODE HERE

    if(appData.profile){

        document.getElementById("playerName").value =
            appData.profile.name || "";

        document.getElementById("playerPosition").value =
            appData.profile.position || "";

        document.getElementById("playerAge").value =
            appData.profile.age || "";

        document.getElementById("playerHeight").value =
            appData.profile.height || "";

        document.getElementById("playerWeight").value =
            appData.profile.weight || "";

        document.getElementById("strongFoot").value =
            appData.profile.strongFoot || "";

    }

}
// ---------- START ----------

loadApp();// =========================
// FOOTBALL TRACKER PRO
// SCRIPT PART 2
// =========================

// ---------- STREAK ENGINE ----------

function calculateCurrentStreak() {

    if (appData.workouts.length === 0)
        return 0;

    const dates = [
        ...new Set(
            appData.workouts.map(
                w => w.date
            )
        )
    ];

    dates.sort(
        (a, b) =>
        new Date(b) - new Date(a)
    );

    let streak = 1;

    for (let i = 0; i < dates.length - 1; i++) {

        const current =
            new Date(dates[i]);

        const next =
            new Date(dates[i + 1]);

        const diff =
            Math.round(
                (current - next) /
                (1000 * 60 * 60 * 24)
            );

        if (diff === 1) {

            streak++;

        } else {

            break;

        }

    }

    return streak;

}

function calculateLongestStreak() {

    if (appData.workouts.length === 0)
        return 0;

    const dates = [
        ...new Set(
            appData.workouts.map(
                w => w.date
            )
        )
    ];

    dates.sort(
        (a, b) =>
        new Date(a) - new Date(b)
    );

    let longest = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {

        const prev =
            new Date(dates[i - 1]);

        const now =
            new Date(dates[i]);

        const diff =
            Math.round(
                (now - prev) /
                (1000 * 60 * 60 * 24)
            );

        if (diff === 1) {

            current++;

            if (current > longest)
                longest = current;

        } else {

            current = 1;

        }

    }

    return longest;

}

// ---------- WORKOUTS ----------

function saveWorkout() {

    const name =
        document.getElementById(
            "workoutName"
        ).value;

    const duration =
        parseInt(
            document.getElementById(
                "workoutDuration"
            ).value
        ) || 0;

    const energy =
        parseInt(
            document.getElementById(
                "workoutEnergy"
            ).value
        ) || 0;

    const notes =
        document.getElementById(
            "workoutNotes"
        ).value;

    if (!name) {

        alert(
            "Enter workout name"
        );

        return;

    }

    const workout = {

        name,
        duration,
        energy,
        notes,

        date:
            new Date()
            .toISOString()
            .split("T")[0]

    };

    appData.workouts.push(
        workout
    );

    if (
        energy >
        appData.records.highestEnergy
    ) {

        appData.records.highestEnergy =
            energy;

    }

    saveData();

    addHistory(

        `Workout: ${name}
         (${duration} min)
         Energy ${energy}/10`

    );

    updateDashboard();

    updateStreakCards();

    clearWorkoutForm();

}

function clearWorkoutForm() {

    document.getElementById(
        "workoutName"
    ).value = "";

    document.getElementById(
        "workoutDuration"
    ).value = "";

    document.getElementById(
        "workoutEnergy"
    ).value = "";

    document.getElementById(
        "workoutNotes"
    ).value = "";

}

// ---------- WEIGHT HISTORY ----------

if (!appData.weightHistory) {

    appData.weightHistory = [];

}

function saveWeight(weight) {

    appData.weightHistory.push({

        weight: weight,

        date:
            new Date()
            .toLocaleDateString()

    });

    saveData();

    addHistory(
        `Weight Updated: ${weight} kg`
    );

}

// ---------- DASHBOARD STREAKS ----------

function updateStreakCards() {

    const current =
        document.getElementById(
            "currentStreak"
        );

    const longest =
        document.getElementById(
            "longestStreak"
        );

    if (current) {

        current.innerText =
            calculateCurrentStreak()
            + " Days";

    }

    if (longest) {

        longest.innerText =
            calculateLongestStreak()
            + " Days";

    }

}

// ---------- OVERRIDE DASHBOARD ----------

const oldUpdateDashboard =
    updateDashboard;

updateDashboard = function() {

    oldUpdateDashboard();

    updateStreakCards();

};

// ---------- STARTUP ----------

updateStreakCards();
// =========================
// FOOTBALL TRACKER PRO
// SCRIPT PART 3
// =========================

// ---------- SHOOTING ----------

function saveShooting() {

    const shots =
        parseInt(
            document.getElementById(
                "shots"
            ).value
        ) || 0;

    const onTarget =
        parseInt(
            document.getElementById(
                "onTarget"
            ).value
        ) || 0;

    const goals =
        parseInt(
            document.getElementById(
                "goals"
            ).value
        ) || 0;

    const energy =
        parseInt(
            document.getElementById(
                "shootingEnergy"
            ).value
        ) || 0;

    const notes =
        document.getElementById(
            "shootingNotes"
        ).value;

    if (shots <= 0) {

        alert("Enter shots");

        return;

    }

    const accuracy =
        (
            (onTarget / shots) * 100
        ).toFixed(1);

    const conversion =
        (
            (goals / shots) * 100
        ).toFixed(1);

    const session = {

        shots,
        onTarget,
        goals,
        energy,
        notes,
        accuracy,
        conversion,

        date:
            new Date()
            .toISOString()
            .split("T")[0]

    };

    appData.shootingSessions.push(
        session
    );

    // Records

    if (
        parseFloat(accuracy) >
        appData.records.bestAccuracy
    ) {

        appData.records.bestAccuracy =
            parseFloat(accuracy);

    }

    if (
        parseFloat(conversion) >
        appData.records.bestConversion
    ) {

        appData.records.bestConversion =
            parseFloat(conversion);

    }

    if (
        energy >
        appData.records.highestEnergy
    ) {

        appData.records.highestEnergy =
            energy;

    }

    saveData();

    document.getElementById(
        "accuracyResult"
    ).innerText =
        accuracy + "%";

    document.getElementById(
        "conversionResult"
    ).innerText =
        conversion + "%";

    addHistory(
        `Shooting Session | Accuracy ${accuracy}% | Conversion ${conversion}%`
    );

    updateDashboard();

    updateRecords();

    clearShootingForm();

}

function clearShootingForm() {

    document.getElementById(
        "shots"
    ).value = "";

    document.getElementById(
        "onTarget"
    ).value = "";

    document.getElementById(
        "goals"
    ).value = "";

    document.getElementById(
        "shootingEnergy"
    ).value = "";

    document.getElementById(
        "shootingNotes"
    ).value = "";

}

// ---------- MATCH REPORTS ----------

function saveMatch() {

    const opponent =
        document.getElementById(
            "opponent"
        ).value;

    const position =
        document.getElementById(
            "positionPlayed"
        ).value;

    const minutes =
        parseInt(
            document.getElementById(
                "minutesPlayed"
            ).value
        ) || 0;

    const goals =
        parseInt(
            document.getElementById(
                "matchGoals"
            ).value
        ) || 0;

    const assists =
        parseInt(
            document.getElementById(
                "matchAssists"
            ).value
        ) || 0;

    const rating =
        parseFloat(
            document.getElementById(
                "matchRating"
            ).value
        ) || 0;

    const energy =
        parseInt(
            document.getElementById(
                "matchEnergy"
            ).value
        ) || 0;

    const notes =
        document.getElementById(
            "matchNotes"
        ).value;

    if (!opponent) {

        alert(
            "Enter opponent"
        );

        return;

    }

    const match = {

        opponent,
        position,
        minutes,
        goals,
        assists,
        rating,
        energy,
        notes,

        date:
            new Date()
            .toISOString()
            .split("T")[0]

    };

    appData.matches.push(match);

    // Records

    if (
        rating >
        appData.records.highestRating
    ) {

        appData.records.highestRating =
            rating;

    }

    if (
        goals >
        appData.records.mostGoals
    ) {

        appData.records.mostGoals =
            goals;

    }

    if (
        energy >
        appData.records.highestEnergy
    ) {

        appData.records.highestEnergy =
            energy;

    }

    saveData();

    addHistory(
        `Match vs ${opponent} | Goals ${goals} | Assists ${assists} | Rating ${rating}`
    );

    updateDashboard();

    updateRecords();

    clearMatchForm();

}

function clearMatchForm() {

    document.getElementById(
        "opponent"
    ).value = "";

    document.getElementById(
        "positionPlayed"
    ).value = "";

    document.getElementById(
        "minutesPlayed"
    ).value = "";

    document.getElementById(
        "matchGoals"
    ).value = "";

    document.getElementById(
        "matchAssists"
    ).value = "";

    document.getElementById(
        "matchRating"
    ).value = "";

    document.getElementById(
        "matchEnergy"
    ).value = "";

    document.getElementById(
        "matchNotes"
    ).value = "";

}

// ---------- RECORDS ----------

function updateRecords() {

    const setText = (
        id,
        value
    ) => {

        const el =
            document.getElementById(id);

        if (el)
            el.innerText = value;

    };

    setText(
        "bestAccuracy",
        appData.records.bestAccuracy + "%"
    );

    setText(
        "bestConversion",
        appData.records.bestConversion + "%"
    );

    setText(
        "highestRating",
        appData.records.highestRating
    );

    setText(
        "mostGoals",
        appData.records.mostGoals
    );

    setText(
        "highestEnergy",
        appData.records.highestEnergy
    );

}

// ---------- DASHBOARD ENHANCEMENTS ----------

const dashboardOriginal =
    updateDashboard;

updateDashboard = function() {

    dashboardOriginal();

    // Latest Accuracy

    if (
        appData.shootingSessions.length
    ) {

        const latest =
            appData.shootingSessions[
            appData.shootingSessions.length - 1
            ];

        const accuracyEl =
            document.getElementById(
                "latestAccuracy"
            );

        if (accuracyEl) {

            accuracyEl.innerText =
                latest.accuracy + "%";

        }

    }

    // Latest Match Rating

    if (
        appData.matches.length
    ) {

        const latestMatch =
            appData.matches[
            appData.matches.length - 1
            ];

        const ratingEl =
            document.getElementById(
                "latestRating"
            );

        if (ratingEl) {

            ratingEl.innerText =
                latestMatch.rating;

        }

    }

};

// ---------- STARTUP ----------

function saveProfile() {

    appData.profile.name =
        document.getElementById(
            "playerName"
        ).value;

    appData.profile.position =
        document.getElementById(
            "playerPosition"
        ).value;

    appData.profile.age =
        document.getElementById(
            "playerAge"
        ).value;

    appData.profile.height =
        document.getElementById(
            "playerHeight"
        ).value;

    appData.profile.weight =
        document.getElementById(
            "playerWeight"
        ).value;

    appData.profile.strongFoot =
        document.getElementById(
            "strongFoot"
        ).value;

    saveData();

    addHistory("Profile Updated");

}
updateRecords();
updateDashboard();
