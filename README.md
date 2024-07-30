### Project Documentation Template

---

#### **Project Overview**

**Project Name:** Connect Four

**Technologies Used:**
- **HTML:** Used for structuring the web pages and content.
- **CSS:** Used for styling the web pages and enhancing the visual presentation.
- **JavaScript:** Provides interactivity and dynamic functionality for the game.
- **Modules:** Organizes the JavaScript code into reusable modules.
- **Event Listeners:** Handles user interactions within the game.
- **DOM Manipulation:** Updates the content and structure of the web page dynamically.

**Description:** This project implements a Connect Four game where players can compete against each other or against the CPU. It uses HTML, CSS, and JavaScript to provide a rich, interactive gaming experience. The project includes various game modes, including a timed mode where players must make their moves within a specified time limit.

---

### **Technologies Usage**

1. **HTML:**
   - **Usage:** Provides the structure for the web pages, including the main menu, game board, and various buttons.
   - **Files:** 
     - `index.html`

2. **CSS:**
   - **Usage:** Styles the game components, including the game board, buttons, and overall layout to enhance user experience.
   - **Files:** 
     - `assets/css/main.css`

3. **JavaScript:**
   - **Usage:** Implements the game logic, handles user interactions, and updates the game state dynamically.
   - **Files:** 
     - `assets/js/Game.js`
     - `assets/js/Control.js`
     - `assets/js/View.js`
     - `assets/js/Navigation.js`
     - `assets/js/timedmode.js`
     - `assets/js/Timer.js`

4. **Modules:**
   - **Usage:** Organizes the JavaScript code into separate modules for better maintainability and reusability.
   - **Files:**
     - `assets/js/Game.js`
     - `assets/js/Control.js`
     - `assets/js/View.js`
     - `assets/js/Navigation.js`
     - `assets/js/timedmode.js`
     - `assets/js/Timer.js`

5. **Event Listeners:**
   - **Usage:** Listens for user interactions such as button clicks to trigger game actions.
   - **Files:** 
     - `index.html` (inline script)
     - `assets/js/Navigation.js`

6. **DOM Manipulation:**
   - **Usage:** Updates the web page content dynamically based on game events (e.g., adding discs, showing game results).
   - **Files:**
     - `assets/js/View.js`

---

### **Setup and Usage Instructions**

To set up and use the project after downloading the code, follow these steps:

1. **Clone the Repository:**
   - Use `git clone` to clone the repository to your local machine.
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the Project Directory:**
   - Change your working directory to the project folder.
   ```bash
   cd <project_directory>
   ```

3. **Install Dependencies:**
   - Install the required packages using the appropriate package manager (if applicable).
   ```bash
   [package_manager] install
   ```

4. **Setup Specific Instructions:**
   - No additional setup is required for this project.

5. **Run the Application:**
   - Open `index.html` in a web browser to start the game.
   ```bash
   open index.html
   ```

6. **Access the Application:**
   - Open a web browser and navigate to the location where `index.html` is hosted (e.g., `file:///path_to_project/index.html`).

---

### **File Descriptions**

1. **`index.html`:**
   - Provides the main structure of the web application, including the main menu and game interface.

2. **`assets/css/main.css`:**
   - Contains the styles for the web application, defining the appearance of the game components and layout.

3. **`assets/js/Game.js`:**
   - Implements the main game logic, including initializing the game, handling turns, and checking for win conditions.

4. **`assets/js/Control.js`:**
   - Manages user inputs and controls the game flow based on user interactions.

5. **`assets/js/View.js`:**
   - Handles updating the DOM to reflect the current game state, such as adding discs to the board and updating scores.

6. **`assets/js/Navigation.js`:**
   - Manages navigation within the game, such as transitioning between the main menu and game screen, and handling game state changes.

7. **`assets/js/timedmode.js`:**
   - Contains the specific logic for the timed mode, ensuring each player makes a move within the allotted time.

8. **`assets/js/Timer.js`:**
   - Implements the timer functionality, counting down the time for each player's turn and triggering actions when time runs out.

---

### **Project Functionality**

1. **Feature 1: Classic Game Mode**
   - **Description:** Allows two players to take turns dropping discs into the grid, aiming to connect four discs in a row.
   - **Usage:** Select "Play vs Player" from the main menu to start a classic game.

2. **Feature 2: Play vs CPU**
   - **Description:** Allows a single player to compete against the computer.
   - **Usage:** Select "Play vs CPU" from the main menu to start a game against the CPU.

3. **Feature 3: Timed Mode**
   - **Description:** Each player has a limited amount of time to make a move, adding an element of pressure to the game.
   - **Usage:** Select "Play Timed Mode" from the main menu to start a timed game.

---

This documentation should provide a comprehensive overview of the Connect Four project, covering its setup, usage, and the functionalities it offers.
