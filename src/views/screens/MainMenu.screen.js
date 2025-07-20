import COMPONENTS_ID from "../../constants/componentsId.constant.js";
import CursorController from "../../controllers/Cursor.controller.js";
import ButtonFactory from "../ui/button.js";
import BaseScreen from "./Base.screen.js";

export default class MainMenuScreen extends BaseScreen {
    constructor() {
        super();

        this.buttons = [
            ButtonFactory.createMainMenuButton(28, 319, 140, 100, 'play', () => console.log("play")),
            ButtonFactory.createMainMenuButton(176, 319, 140, 100, 'store', () => console.log("store")),
            ButtonFactory.createMainMenuButton(324, 319, 140, 100, 'credits', () => console.log("credits")),
            ButtonFactory.createMainMenuButton(472, 319, 140, 100, 'config', () => console.log("config"))
        ]

        this.cursor = new CursorController(142, 395, 3,
            [
                { x: 142, y: 395 },
                { x: 290, y: 395 },
                { x: 438, y: 395 },
                { x: 586, y: 395 }
            ],
            this.buttons
        )
    }

    render() {
        this.renderBackground();

        this.buttons
            .forEach(({ view }) => view
                .getComponent(COMPONENTS_ID.Renderer)
                .render(
                    view.getComponent(COMPONENTS_ID.Transform)
                ))

        this.cursor.update();
    }
}