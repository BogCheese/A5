# Personalized Digital Assistant

## Overview
This is a web-based personal digital assistant application with multiple features to help users manage their daily tasks and information.

## Features

### 1. Weather
- Displays current weather information for Irvine, CA
- Uses Open-Meteo API for weather data
- Located at `weather.html`
- Features include:
  - Real-time temperature
  - Weather condition description
  - Wind speed

## API Integration

### Open-Meteo Weather API
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Location:** Irvine, CA (Latitude: 33.6846, Longitude: -117.8265)
- **Data Fetched:**
  - Current temperature
  - Weather condition code
  - Wind speed
- **Weather Code Mapping:** Comprehensive description of 30+ weather conditions

#### Weather Code Description Function
The `getWeatherDescription()` function provides human-readable descriptions for various weather codes, including:
- Clear sky
- Partly cloudy
- Rain variations
- Snow conditions
- Thunderstorms
- Fog types

### 2. Timer
- Allows users to set a countdown timer
- Located at `timer.html`
- Features include:
  - Setting timer duration in seconds
  - Real-time countdown display
  - Alert when the timer completes

### 3. Alarm
- Enables users to set timed alarms
- Located at `alarm.html`
- Features include:
  - Setting specific alarm time
  - Optional alarm message
  - Alert notification at specified time

### 4. Event Reminders
- Helps users track and get reminders for upcoming events
- Located at `event.html`
- Features include:
  - Adding events with names and dates
  - Optional reminder times
  - Storing events in local storage
  - Displaying event list
  - Reminder alerts

### 5. To-Do List
- Assists in task management
- Located at `todo.html`
- Features include:
  - Adding tasks with names
  - Optional due dates and priorities
  - Marking tasks as complete
  - Storing tasks in local storage
  - Displaying task list

## Project Structure
```
project-root/
│
├── index.html         # Home/landing page
├── weather.html       # Weather feature page
├── timer.html         # Timer feature page
├── alarm.html         # Alarm feature page
├── event.html         # Event Reminders page
├── todo.html          # To-Do List page
│
├── js/
│   ├── main.js        # Main JavaScript with shared functionality
│   ├── weather.js     # Weather feature logic
│   ├── timer.js       # Timer feature logic
│   ├── alarm.js       # Alarm feature logic
│   ├── event.js       # Event Reminders logic
│   └── todo.js        # To-Do List logic
│
└── css/
    └── style.css      # Styling for all pages
```

## Setup and Installation
1. Clone the repository
2. Open `index.html` in a modern web browser
3. No additional dependencies or build steps required
