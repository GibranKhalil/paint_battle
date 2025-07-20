import PlayerSelectScreen from "./src/views/screens/PlayerSelect.screen.js";

Screen.setFrameCounter(true);
Screen.setVSync(false);

const playerSelectScreen = new PlayerSelectScreen();

Screen.display(() => {
    playerSelectScreen.render();
});