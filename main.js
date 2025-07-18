import MainMenuScreen from "./src/views/screens/MainMenu.screen.js";

Screen.setFrameCounter(true);
Screen.setVSync(false);

const mainMenuScreen = new MainMenuScreen();

Screen.display(() => {
    mainMenuScreen.render();
});