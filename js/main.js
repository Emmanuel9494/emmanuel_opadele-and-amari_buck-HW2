import { WorldClock } from './WorldClock.js';
import { ClockAnimations } from './animation.js';
ClockAnimations();
// this is a list of all the timezones that are supported by the Intl.supportedValuesOf('timeZone') method - info at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf - I can probably use this to filter the timezones that are displayed in the dropdown menu - but i just decided to use few.
console.log(Intl.supportedValuesOf('timeZone'));

class WorldClockApp {
    constructor() {
        this.clocks = new Map(); // A Map() object that stores clock instances with their respective timezones as keys. Ensures unique timezone entries.
        this.timezones = [];
        this.container = document.querySelector('#clocksContainer');
        this.modal = document.querySelector('#newClockModal');
        this.timezoneSelect = document.querySelector('#timezoneSelect');
        
        // Define major timezones - this is the list of timezones that will be displayed in the dropdown menu - info at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones valid IANA timezones strings have no spaces and underscores instead of spaces i.e America/New_York thats why in the worldClock.js file there is a formatTimezone method that formats the timezone string to a more readable format
        this.majorTimezones = [
            'America/New_York',      // New York
            'Europe/London',         // London
            'Asia/Tokyo',           // Tokyo
            'Australia/Sydney',      // Sydney
            'Europe/Paris',         // Paris
            'Africa/Cairo',         // Cairo, Egypt
            'Asia/Singapore',       // Singapore
            'America/Los_Angeles',  // Los Angeles
            'Africa/Lagos',         // Lagos, Nigeria
            'Africa/Johannesburg',   // Johannesburg, South Africa
            'America/Toronto'        // Toronto, Canada
        ];
        
        this.init();
    }

     init() {
        // Fetch available timezones
        this.fetchTimezones();
        
        // Set up event listeners
        document.querySelector('#addClock').addEventListener('click', () => this.showModal());
        document.querySelector('#createClock').addEventListener('click', () => this.createClock());
        document.querySelector('#cancelClock').addEventListener('click', () => this.hideModal());
        
        // Listen for clock events
        this.container.addEventListener('delete-clock', (e) => this.deleteClock(e.detail));

        // Load saved clocks
        this.loadSavedClocks();
    }

    fetchTimezones() {
        try {
            this.timezones = this.majorTimezones;
            this.populateTimezoneSelect();
        } catch (error) {
            console.error('Error setting timezones:', error);
            this.timezones = ['UTC']; // Fallback if no timezones are available
        }
    }
    // this is the method that populates the dropdown menu with the timezones - also handles the formatting of the timezones
    populateTimezoneSelect() {
        this.timezoneSelect.innerHTML = this.timezones
            .map(tz => `<option value="${tz}">${tz.replace('_', ' ').replace('/', ' / ')}</option>`)
            .join('');
    }

    showModal() {
        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
    }
    // this is the method that creates the clock - Retrieves selected timezone - prevents duplicate clocks by checking this.clocks
    createClock() {
        const timezone = this.timezoneSelect.value;
        if (!this.clocks.has(timezone)) {
            const clock = new WorldClock(timezone, this.container); // creates a new clock instance
            this.clocks.set(timezone, clock); // adds the new clock instance to the map
            this.saveClocks(); // saves the new clock instance to the map
        }
        this.hideModal();
    }
    // deleteClock, saveClocks, loadSavedClocks - works with the local storage - so that the clocks are saved even after the page is refreshed - for a more suitable user experience
    deleteClock({ timezone }) {
        this.clocks.delete(timezone);
        this.saveClocks();
    }
    // saveClocks - saves the clocks to the local storage
    saveClocks() {
        const savedClocks = Array.from(this.clocks.keys());
        localStorage.setItem('worldClocks', JSON.stringify(savedClocks));
    }
    // loadSavedClocks - loads the clocks from the local storage
    loadSavedClocks() {
        const saved = localStorage.getItem('worldClocks');
        if (saved) {
            JSON.parse(saved).forEach(timezone => {
                if (!this.clocks.has(timezone)) {
                    const clock = new WorldClock(timezone, this.container);
                    this.clocks.set(timezone, clock);
                }
            });
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WorldClockApp();
    
});
