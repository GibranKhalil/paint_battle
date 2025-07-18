import COMPONENTS_ID from "../constants/componentsId.constant.js";
import EVENTS from "../constants/event.constant.js";
import BaseModel from "./Base.model.js";
import MovementModel from "./Movement.model.js";
import ObserverModel from "./Observer.model.js";
import TransformModel from "./Transform.model.js";

export default class CursorModel extends BaseModel {
    constructor(transform, movementConfig) {
        super("Cursor")
        this._setupComponents(transform.x, transform.y, movementConfig.speed)
        this.pad = Pads.get(0)

        this.lastMoveTime = 0;
        this.moveInterval = 10 / movementConfig.speed
    }

    _setupComponents(x, y, speed) {
        this.addComponent(COMPONENTS_ID.TransformModel, new TransformModel(x, y))
            .addComponent(COMPONENTS_ID.MovementModel, new MovementModel(speed))
            .addComponent(COMPONENTS_ID.ObserverModel, new ObserverModel())
    }

    click() {
        this.getComponent(COMPONENTS_ID.ObserverModel)
            .notifyObservers(EVENTS.ON_CLICK, {
                x: this.getComponent(COMPONENTS_ID.TransformModel).x,
                y: this.getComponent(COMPONENTS_ID.TransformModel).y
            });
    }

    update() {
        this.pad.update();

        const currentTime = Date.now();

        if (currentTime - this.lastMoveTime >= this.moveInterval) {
            let moved = false;

            if (this.pad.pressed(Pads.UP)) {
                this.getComponent(COMPONENTS_ID.MovementModel)
                    .moveUp(this.getComponent(COMPONENTS_ID.TransformModel));

                moved = true;
            }

            if (this.pad.pressed(Pads.DOWN)) {
                this.getComponent(COMPONENTS_ID.MovementModel)
                    .moveDown(this.getComponent(COMPONENTS_ID.TransformModel));

                moved = true;
            }

            if (this.pad.pressed(Pads.LEFT)) {
                this.getComponent(COMPONENTS_ID.MovementModel)
                    .moveLeft(this.getComponent(COMPONENTS_ID.TransformModel));

                moved = true;
            }

            if (this.pad.pressed(Pads.RIGHT)) {
                this.getComponent(COMPONENTS_ID.MovementModel)
                    .moveRight(this.getComponent(COMPONENTS_ID.TransformModel));

                moved = true;
            }

            if (moved) {
                this.lastMoveTime = currentTime;

                this.getComponent(COMPONENTS_ID.ObserverModel)
                    .notifyObservers(EVENTS.POSITION_CHANGED, {
                        x: this.getComponent(COMPONENTS_ID.TransformModel).x,
                        y: this.getComponent(COMPONENTS_ID.TransformModel).y
                    });
            }
        }

        if (this.pad.justPressed(Pads.CROSS)) {
            this.click();
        }
    }
}