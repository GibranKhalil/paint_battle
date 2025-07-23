import SCREEN_ID from "./src/constants/screens.constant.js";
import MainMenuScreen from "./src/views/screens/MainMenu.screen.js";
import ScreenManager from "./src/views/screens/managers/Screen.manager.js";
import PlayerSelectScreen from "./src/views/screens/PlayerSelect.screen.js";
import StoreScreen from "./src/views/screens/Store.screen.js";

Screen.setFrameCounter(true);
Screen.setVSync(false);

const screenManager = new ScreenManager();

const mainMenuScreen = new MainMenuScreen();
const playerSelectScreen = new PlayerSelectScreen();
const storeScreen = new StoreScreen();

mainMenuScreen.setScreenManager(screenManager);
playerSelectScreen.setScreenManager(screenManager);
storeScreen.setScreenManager(screenManager);

screenManager.registerScreen(SCREEN_ID.MAIN_MENU, mainMenuScreen);
screenManager.registerScreen(SCREEN_ID.PLAYER_SELECT, playerSelectScreen);
screenManager.registerScreen(SCREEN_ID.STORE, storeScreen)

screenManager.setTransitionSpeed(0.0083);

screenManager.changeScreen(SCREEN_ID.MAIN_MENU, false);

Screen.display(() => {
    screenManager.update();
    screenManager.render();
});