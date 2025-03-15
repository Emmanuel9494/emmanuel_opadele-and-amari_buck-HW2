# Object Oriented Programming-JS
# World Clock App

A modern, browser-based world clock application with multiple time zone support and beautiful animations. Built with vanilla JavaScript and GSAP.
![World Clock App Screenshot](./images/Screenshot%202025-03-15%20095153.png)

##  Team Members

### Amari Buck
- LinkedIn: [Amari Buck](https://www.linkedin.com/in/amari-buck-ba1932323/)
- GitHub: [Amari Buck](https://github.com/CrytoGod)

### Emmanuel Opadele
- LinkedIn: [Emmanuel Opadele](www.linkedin.com/in/emmanuelopadele)
- GitHub: [Emmanuel Opadele](https://github.com/Emmanuel9494)

## Features

* **Multiple Time Zones** - Create and manage multiple time zone clocks simultaneously
* **Auto-Save** - All clocks persist in browser's local storage
* **Modern UI** - Clean, responsive design with smooth GSAP animations
* **Real-time Updates** - Accurate time display using JavaScript's native Date object
* **Format Toggle** - Switch between 12/24 hour time formats
* **Interactive Design** - Smooth animations and transitions for better user experience

##  Getting Started

1. Clone this repository
```bash
git clone https://github.com/Emmanuel9494/emmanuel_opadele-and-amari_buck-HW2
```

2. Open `index.html` in your web browser
3. Click "Add New Clock" to create your first clock
4. Select a time zone and start tracking time!

##  Usage

### Creating a New Clock
1. Click the "Add New Clock" button
2. Select your desired time zone from the dropdown
3. Click "Create" to add the clock

### Managing Clocks
* **Time Format**: Toggle between 12/24 hour format
* **Delete**: Remove unwanted clocks with the delete button
* **Persistence**: Clocks automatically save to local storage

##  Technical Details

### Technologies Used
- HTML5
- CSS3 (with modern features)
- Vanilla JavaScript (ES6+)
- SASS
- GSAP (GreenSock Animation Platform)
- Font Awesome Icons
- Google Fonts

### Features Implementation
- **Time Management**: Uses JavaScript's built-in Date object with timezone support
- **Animations**: GSAP for smooth transitions and effects
- **Storage**: LocalStorage for data persistence
- **Dynamic UI**: MutationObserver for real-time DOM updates
- **Time Formatting**: Native toLocaleString() for timezone and format handling

### File Structure
```
world-clock-app/
├── css/
│   ├── main.css
│   └── grid.css
├── sass/
│   └── components/
│       └── _worldClock.scss
├── js/
│   ├── main.js
│   ├── animation.js
│   └── WorldClock.js
├── images/
├── video/
└── index.html
```

##  Design Features

- Responsive grid layout
- Modern color scheme
- Interactive animations
- Clean typography using Roboto font
- Intuitive user interface

##  Credits

- Images and videos from [Pexels](https://www.pexels.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Animations powered by [GSAP](https://greensock.com/gsap/)

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Built By Amari Buck and Emmanuel Opadele
