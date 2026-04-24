/**
 * IT Service Status Aggregator
 * Developed by Agus Satria Adhitama
 * Fetches public status JSON endpoints to monitor infrastructure health.
 */

const services = [
    { name: 'GitHub', url: 'https://www.githubstatus.com/api/v2/summary.json' },
    { name: 'Cloudflare', url: 'https://www.cloudflarestatus.com/api/v2/summary.json' },
    { name: 'Reddit', url: 'https://www.redditstatus.com/api/v2/summary.json' },
    { name: 'Discord', url: 'https://discordstatus.com/api/v2/summary.json' }
];

const dashboardGrid = document.getElementById('dashboard-grid');
const countdownEl = document.getElementById('countdown');
const REFRESH_INTERVAL = 60; // Refresh data every 60 seconds
let timerInterval;

// Format timestamp into local time string
const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

// Map external API status indicators to our UI classes
const getStatusConfig = (indicator) => {
    const statusMap = {
        'none': { text: 'Operational', class: 'operational' },
        'minor': { text: 'Degraded', class: 'degraded' },
        'major': { text: 'Outage', class: 'outage' },
        'critical': { text: 'Critical', class: 'outage' }
    };
    return statusMap[indicator] || { text: 'Unknown', class: 'loading' };
};

// Asynchronously fetch status for a single service
const fetchServiceData = async (service) => {
    try {
        const response = await fetch(service.url);
        if (!response.ok) throw new Error('Network response failed');
        
        const data = await response.json();
        const config = getStatusConfig(data.status.indicator);
        
        // Check for active incidents, otherwise show 'All systems go'
        const activeIncident = data.incidents && data.incidents.length > 0 
            ? data.incidents[0].name 
            : 'No active incidents reported. All systems operational.';

        return {
            name: service.name,
            statusText: config.text,
            statusClass: config.class,
            incident: activeIncident,
            updatedAt: formatTime(data.page.updated_at)
        };
    } catch (error) {
        console.error(`Error fetching data for ${service.name}:`, error);
        return {
            name: service.name,
            statusText: 'API Error',
            statusClass: 'outage',
            incident: 'Failed to connect to status API. Please check network.',
            updatedAt: formatTime(new Date())
        };
    }
};

// Render the entire dashboard UI
const renderDashboard = async () => {
    // Inject loading state first
    dashboardGrid.innerHTML = services.map(s => `
        <div class="card" id="card-${s.name.toLowerCase()}">
            <div class="card-header">
                <div class="service-name">${s.name}</div>
                <div class="status-badge loading">Fetching...</div>
            </div>
            <div class="incident-log">Synchronizing data...</div>
        </div>
    `).join('');

    // Fetch and update data for each service
    for (const service of services) {
        const data = await fetchServiceData(service);
        const cardEl = document.getElementById(`card-${data.name.toLowerCase()}`);
        
        if (cardEl) {
            cardEl.innerHTML = `
                <div class="card-header">
                    <div class="service-name">${data.name}</div>
                    <div class="status-badge ${data.statusClass}">${data.statusText}</div>
                </div>
                <div class="incident-log">
                    <i class="fas fa-info-circle"></i> ${data.incident}
                </div>
                <div class="updated-at">Last checked: ${data.updatedAt}</div>
            `;
        }
    }
};

// Handle auto-refresh countdown
const startAutoRefresh = () => {
    clearInterval(timerInterval);
    let timeLeft = REFRESH_INTERVAL;
    countdownEl.innerText = timeLeft;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        countdownEl.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            renderDashboard();
            timeLeft = REFRESH_INTERVAL;
        }
    }, 1000);
};

// Initialize Application
const initApp = () => {
    renderDashboard();
    startAutoRefresh();
};

document.addEventListener('DOMContentLoaded', initApp);