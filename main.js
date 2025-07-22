import MainMenuScreen from "./src/views/screens/MainMenu.screen.js";
import ScreenManager from "./src/views/screens/managers/Screen.manager.js";
import PlayerSelectScreen from "./src/views/screens/PlayerSelect.screen.js";

Screen.setFrameCounter(true);
Screen.setVSync(false);

const screenManager = new ScreenManager();

const mainMenuScreen = new MainMenuScreen();
const playerSelectScreen = new PlayerSelectScreen();


mainMenuScreen.setScreenManager(screenManager);
playerSelectScreen.setScreenManager(screenManager);

screenManager.registerScreen('mainMenu', mainMenuScreen);
screenManager.registerScreen('playerSelect', playerSelectScreen);

screenManager.setTransitionSpeed(12);
screenManager.setTransitionQuality(8);

screenManager.changeScreen('mainMenu', false);

Screen.display(() => {
    screenManager.update();

    screenManager.render();
});