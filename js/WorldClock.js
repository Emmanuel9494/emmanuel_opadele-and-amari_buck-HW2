export class WorldClock {
    constructor(timezone, container, options = {}) {
        this.timezone = timezone;
        this.container = container;
        this.options = {
            format24: options.format24 || false,
            updateInterval: options.updateInterval || 1000,
            theme: options.theme || 'light'
        };
        this.element = null;
        this.timeElement = null;
        this.intervalId = null;
        // this.init(); triggers setup for the clock before it is created
        this.init();
    }

     init() {
        this.element = this.createClockElement();
        this.container.appendChild(this.element);
        this.updateTime();
        this.startUpdating();
    }
    // creates the clock element method, this is called in the init method, this is where the clock is created - shows in the HTML
    createClockElement() {
        const clockDiv = document.createElement('div');
        clockDiv.className = `clock ${this.options.theme}`;
        
        const timezoneDiv = document.createElement('div');
        timezoneDiv.className = 'clock-timezone';
        timezoneDiv.textContent = this.formatTimezone(this.timezone);

        const timeDiv = document.createElement('div');
        timeDiv.className = 'clock-time';
        this.timeElement = timeDiv;

        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'clock-controls';

        const formatToggle = document.createElement('div');
        formatToggle.className = 'format-toggle';
        formatToggle.innerHTML = `
            <input type="checkbox" id="format_${this.timezone}" 
                   ${this.options.format24 ? 'checked' : ''}>
            <label for="format_${this.timezone}">24h format</label>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        controlsDiv.appendChild(deleteBtn);

        clockDiv.appendChild(timezoneDiv);
        clockDiv.appendChild(timeDiv);
        clockDiv.appendChild(formatToggle);
        clockDiv.appendChild(controlsDiv);

        // Event Listeners
        formatToggle.querySelector('input').addEventListener('change', (e) => {
            this.options.format24 = e.target.checked;
            this.updateTime();
        });

        deleteBtn.addEventListener('click', () => this.delete());

        return clockDiv;
    }
    // at first i used a free time zone api at https://worldtimeapi.org/ but it would stop working, since i was calling it so many times  had console errors about making too many requests, upon researching i found out that the native JS date object was the best option so i used that - details at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#description
    updateTime() {
        try {
            const date = new Date();
            const timeString = date.toLocaleString('en-US', {
                timeZone: this.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: !this.options.format24
            });
            
            this.timeElement.textContent = timeString;
        } catch (error) {
            console.error('Error updating time:', error);
            this.timeElement.textContent = 'Error loading time';
        }
    }
    // this is the format of the timezone, it replaces the underscores with spaces and the slashes with / i.e America/Toronto timezone list from the main.js file info at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    formatTimezone(timezone) {
        return timezone.replace('_', ' ').replace('/', ' / ');
    }
    // this is the startUpdating method, it starts the updating of the time, it is called in the init method
    startUpdating() {
        this.intervalId = setInterval(() => this.updateTime(), this.options.updateInterval);
    }

    stopUpdating() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    delete() {
        this.stopUpdating();
        this.element.remove();
        // Dispatches a custom event (delete-clock) for additional logic in the main app — useful for notifying the app that a clock instance was deleted.
        const event = new CustomEvent('delete-clock', { 
            detail: { timezone: this.timezone } 
        });
        this.container.dispatchEvent(event);
    }
} 