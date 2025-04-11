# Meditation_Timer_App

## Objective
This JavaScript project creates a meditation timer application that allows users to select a duration and meditation technique, start, pause, and reset the timer. It tracks meditation statistics (total sessions, total time) and maintains a history log of sessions. The application integrates with an external API to display inspirational quotes and supports a dark mode toggle. Technologies used are HTML, CSS, JavaScript, and Bootstrap.

## Output
<iframe src="https://niat-web.github.io/Meditation_Timer_App" height="1000" width="300" title="Meditation_Timer_App"></iframe>

## Project Requirements
**Technologies:** HTML, CSS, JavaScript, Bootstrap

## Features to Implement
- Select a meditation duration from a dropdown.
- Input a specific meditation technique.
- Start, pause, and reset the timer.

## UI Enhancements
- Implement a dark mode toggle.
- Display meditation session history.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement timer functionality | Timer starts, pauses, resets, and displays remaining time. |
| Implement session statistics tracking | Total sessions and total meditation time are accurately updated and displayed. |
| Implement history logging | Each meditation session is recorded with duration, technique, and date. |
| Implement Dark Mode | A toggle to switch between light and dark themes. |
| Display Inspirational Quotes | Display a quote from an external API. |

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to update the timer display, statistics, history list, and toggle dark mode. |
| Event Listeners | Used to handle button clicks (start, pause, reset, dark mode toggle) and form input changes. |
| `setInterval` | Used to update the timer every second. |
| `clearInterval` | Used to stop the timer. |
| Asynchronous Operations (`async/await`) | Used to fetch data from an external API. |
| Error Handling (`try/catch/finally`) | Used to handle potential errors during API calls. |
| Template literals | Used to construct dynamic strings for displaying messages and in the history list. |
| Data Storage (`let`, `const`) | Used to manage variables like `timeLeft`, `sessions`, `totalMeditatedTime`, and `history`. |
| Primitive data types (`number`, `string`, `boolean`, `null`, `undefined`) | Used to define and manipulate various values such as timer durations, meditation techniques, and timer states. |
| Type conversion and coercion | Used to convert string inputs from durationSelect to numbers for calculations. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| dummyJSON | `https://dummyjson.com/quotes` | Fetches inspirational quotes to display in the UI. |
| AllOrigins Proxy | `https://api.allorigins.win/raw?url=https://dummyjson.com/quotes` | Used as a proxy to bypass CORS issues when accessing the dummyJSON API directly. |

## MISC Section:

### 1. Formulas/Calculations:
- **Time Calculation:** The remaining time in seconds is decremented every second using `timeLeft--`. The `timeLeft` variable stores the remaining time in seconds.
- **Time Formatting:** The `formatTime(seconds)` function converts seconds into a `MM:SS` format. It calculates minutes using `Math.floor(seconds / 60)` and remaining seconds using `seconds % 60`. These are then padded with leading zeros using `String(minutes).padStart(2, '0')` and `String(remainingSeconds).padStart(2, '0')`.
- **Total Meditated Time:** The `totalMeditatedTime` variable is incremented by the `selectedDuration` when a meditation session is completed, updating the total time spent meditating.  The formula used is `totalMeditatedTime += selectedDuration`.

### 2. Array Data:
- `history`:  This array is used to store meditation session history. Each element in the array is an object with the following structure:
  ```javascript
  {
      duration: number, // Duration of the session in minutes
      technique: string, // Meditation technique used
      date: string       // Date of the session
  }
  ```
  The `history` array is updated each time a meditation session completes, and its contents are used to populate the history list displayed in the user interface.