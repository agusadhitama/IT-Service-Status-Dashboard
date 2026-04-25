# IT Service Status Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A lightweight, real time IT service status dashboard designed for IT Support and System Administrators. This aggregator fetches public JSON endpoints from critical infrastructure providers to monitor their health status in one centralized, visually appealing dashboard.

## Features

- **Real-Time Monitoring:** Fetches live data directly from official public status APIs (GitHub, Cloudflare, Reddit, Discord).
- **Auto-Refresh Mechanism:** Automatically syncs data every 60 seconds so you never miss an outage.
- **Dynamic Status Indicators:** Color-coded badges (Operational, Degraded, Outage) for quick visual assessment.
- **Active Incident Logs:** Displays the latest incident reports directly on the card if a system is experiencing issues.
- **Glassmorphism UI:** Modern, clean, dark-mode design using advanced CSS techniques (backdrop-filter) and CSS Variables.
- **Zero Dependencies:** Built entirely with Vanilla JavaScript. No backend, no heavy frameworks, no NPM packages required.

## Live Demo

[View Live Dashboard Here](https://agusadhitama.github.io/IT-Service-Status-Dashboard)

## Technologies Used

- **HTML5:** Semantic structure.
- **CSS3:** Custom variables, Flexbox, CSS Grid, and Glassmorphism styling.
- **Vanilla JavaScript (ES6+):** Async/Await API fetching, DOM manipulation, and interval management.
- **FontAwesome:** Scalable vector icons.

## Project Structure

```text
├── index.html    # Main HTML document
├── style.css     # Styling and layout
├── script.js     # Logic for API fetching and DOM rendering
└── README.md     # Project documentation
