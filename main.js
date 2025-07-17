const font = new Font("./src/assets/fonts/NormalFont.ttf");

os.setInterval(() => { // Basically creates an infinite loop, similar to while true(you can use it too).
    Screen.clear(); // Clear screen for the next frame.
    font.print(0, 0, "Hello   World!"); // x, y, text
    Screen.flip(); // Updates the screen.
}, 0)