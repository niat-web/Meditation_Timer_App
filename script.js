/* script.js */

// 1. Core Concepts
// Primitive types: number, string, boolean, null, undefined, symbol
const timerDuration = 10; // number
const meditationTechnique = "Mindfulness"; // string
const isRunning = false; // boolean
let timerId = null; // null
let timerValue; // undefined
const uniqueSymbol = Symbol("unique"); // symbol

// Type conversion and coercion
const stringNumber = "42";
const numberValue = Number(stringNumber); // Type conversion
const coercedValue = 1 + "1"; // Type coercion (1 + "1" = "11")

// Template literals
const greeting = `Hello, welcome to the ${meditationTechnique} session!`;

// Variable scoping (let, const, var)
function exampleScope() {
  var functionScoped = "I am function scoped";
  let blockScoped = "I am block scoped";
  const constantValue = 3.14;

  if (true) {
    var functionScoped = "I am changed"; // Modified
    let blockScoped = "I am a new block variable"; // Shadowed
    const constantValue = 2.71; // Shadowed
  }

  console.log(functionScoped); // "I am changed"
  console.log(blockScoped); // "I am block scoped" (original value)
  console.log(constantValue); // 3.14
}

// 2. Control Flow
// Conditionals: if/else, switch, ternary
const isLoggedIn = true;

if (isLoggedIn) {
  console.log("User is logged in.");
} else {
  console.log("User is not logged in.");
}

const userRole = "admin";

switch (userRole) {
  case "admin":
    console.log("Admin access granted.");
    break;
  case "editor":
    console.log("Editor access granted.");
    break;
  default:
    console.log("Guest access granted.");
}

const message = isLoggedIn ? "Welcome back!" : "Please log in.";

// Logical operators: &&, ||, !
if (isLoggedIn && userRole === "admin") {
  console.log("Admin user logged in.");
}

if (!isLoggedIn) {
  console.log("Please log in to continue.");
}

// Error handling
try {
  // Code that might throw an error
  // Example:
  // throw new Error("An error occurred");
} catch (error) {
  console.error("Error:", error.message);
} finally {
  // Code that always runs, regardless of error
  console.log("Finally block executed.");
}

// 3. User Input & Math
// DOM elements
const durationSelect = document.getElementById("duration");
const techniqueInput = document.getElementById("technique");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timerDisplay");
const totalSessionsDisplay = document.getElementById("totalSessions");
const totalTimeDisplay = document.getElementById("totalTime");
const historyList = document.getElementById("historyList");
const darkModeToggle = document.getElementById("darkModeToggle");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const refreshQuoteBtn = document.getElementById("refreshQuoteBtn");
const notificationMessage = document.getElementById("notificationMessage");
const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));


// Variables for timer functionality
let selectedDuration = parseInt(durationSelect.value);
let technique = techniqueInput.value;
let timeLeft;
let sessions = 0;
let totalMeditatedTime = 0;
let history = [];
let isDark = false; // Track dark mode status



// Helper function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to show a notification
function showNotification(message) {
    notificationMessage.textContent = message;
    notificationModal.show();
}

// Function to start the timer
function startTimer() {
    selectedDuration = parseInt(durationSelect.value);
    technique = techniqueInput.value;
    timeLeft = selectedDuration * 60;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    timerValue = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerValue);
            timerDisplay.textContent = "00:00";
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            resetBtn.disabled = true;
            sessions++;
            totalMeditatedTime += selectedDuration;
            updateStats();
            addToHistory(selectedDuration, technique);
            showNotification("Meditation session complete! Namaste 🙏"); // Show notification
        }
    }, 1000);
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerValue);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerValue);
    timeLeft = selectedDuration * 60;
    timerDisplay.textContent = formatTime(timeLeft);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
}

// Function to update meditation statistics
function updateStats() {
    totalSessionsDisplay.textContent = sessions;
    totalTimeDisplay.textContent = totalMeditatedTime;
}

// Function to add a session to the history log
function addToHistory(duration, technique) {
    const historyItem = {
        duration: duration,
        technique: technique,
        date: new Date().toLocaleDateString()
    };
    history.push(historyItem);
    updateHistoryList();
}

// Function to update the history list in the UI
function updateHistoryList() {
    historyList.innerHTML = "";
    history.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = `${item.date} - ${item.duration} mins - ${item.technique}`;
        historyList.appendChild(listItem);
    });
}

// Form Input event listeners

durationSelect.addEventListener("change", () => {
    selectedDuration = parseInt(durationSelect.value);
});

techniqueInput.addEventListener("input", () => {
    technique = techniqueInput.value;
});

// Clear Input Fields after session
function clearInputFields() {
    durationSelect.value = '5'; // Reset to default value
    techniqueInput.value = ''; // Clear the input field
}

// Event listeners for the timer buttons
startBtn.addEventListener("click", () => {
    startTimer();
});

pauseBtn.addEventListener("click", () => {
    pauseTimer();
});

resetBtn.addEventListener("click", () => {
    resetTimer();
});

// Dark mode toggle functionality
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    isDark = !isDark;
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i> Light Mode' : '<i class="fas fa-moon"></i> Dark Mode';
});

// 6. Async Operations and API Integration
// API Integration
// Check API Availability: Before fetching, check if the API is accessible directly.
// Direct Fetch: If the API is accessible (no CORS issues), fetch directly.
// AllOrigins Proxy: If CORS issues are detected, use the AllOrigins proxy.
async function fetchData() {
    const apiUrl = 'https://dummyjson.com/quotes';
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            return await response.json();
        } else {
            const proxyUrl = `https://api.allorigins.win/raw?url=${apiUrl}`;
            const proxyResponse = await fetch(proxyUrl);
            if (proxyResponse.ok) {
                return await proxyResponse.json();
            } else {
                throw new Error('Failed to fetch data from both direct URL and proxy.');
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        showNotification('Failed to load quote. Please check your internet connection.');
        return null;
    }
}

async function displayQuote() {
    const data = await fetchData();
    if (data && data.quotes && data.quotes.length > 0) {
        // Shuffle the quotes array
        const shuffledQuotes = data.quotes.sort(() => Math.random() - 0.5);
        const quote = shuffledQuotes[0]; // Get the first quote after shuffling
        quoteText.textContent = quote.quote;
        quoteAuthor.textContent = `- ${quote.author}`;
    } else {
        quoteText.textContent = 'Failed to load quote.';
        quoteAuthor.textContent = '';
    }
}

// Refresh quote functionality
refreshQuoteBtn.addEventListener('click', displayQuote);

// 8. DOM Manipulation
// Initial setup
updateStats();
updateHistoryList();
displayQuote(); // Load initial quote