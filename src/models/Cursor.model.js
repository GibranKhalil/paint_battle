import COMPONENTS_ID from "../constants/componentsId.constant.js";
import EVENTS from "../constants/event.constant.js";
import MovementComponent from "../views/components/Movement.component.js";
import TransformComponent from "../views/components/Transform.component.js";
import BaseModel from "./Base.model.js";
import ObserverModel from "./Observer.model.js";

export default class CursorModel extends BaseModel {
    constructor(transform, movementConfig, positions) {
        super("CursorModel")
        this._setupComponents(transform.x, transform.y, movementConfig.speed)
        this.pad = Pads.get(0)

        this.lastMoveTime = 0;
        this.moveInterval = 10 / movementConfig.speed
        this.positions = positions
        this.currentPosition = 0;
    }

    _setupComponents(x, y, speed) {
        this.addComponent(COMPONENTS_ID.Transform, new TransformComponent(x, y))
            .addComponent(COMPONENTS_ID.Movement, new MovementComponent(speed))
            .addComponent(COMPONENTS_ID.ObserverModel, new ObserverModel())
    }

    click() {
        this.getComponent(COMPONENTS_ID.ObserverModel)
            .notifyObservers(EVENTS.ON_CLICK, {
                x: this.getComponent(COMPONENTS_ID.Transform).x,
                y: this.getComponent(COMPONENTS_ID.Transform).y
            });
    }

    updateFreeMove() {
        const currentTime = Date.now();
        const movement = this.getComponent(COMPONENTS_ID.Movement)
        const transform = this.getComponent(COMPONENTS_ID.Transform)
        const observer = this.getComponent(COMPONENTS_ID.ObserverModel)

        if (currentTime - this.lastMoveTime >= this.moveInterval) {
            let moved = false;

            if (this.pad.pressed(Pads.UP)) {
                movement.moveUp(transform);

                moved = true;
            }

            if (this.pad.pressed(Pads.DOWN)) {
                movement.moveDown(transform);

                moved = true;
            }

            if (this.pad.pressed(Pads.LEFT)) {
                movement.moveLeft(transform);

                moved = true;
            }

            if (this.pad.pressed(Pads.RIGHT)) {
                movement.moveRight(transform);

                moved = true;
            }

            if (moved) {
                this.lastMoveTime = currentTime;

                observer.notifyObservers(EVENTS.POSITION_CHANGED, {
                    x: transform.x,
                    y: transform.y
                });
            }
        }
    }

    updateControlledMove() {
        const transform = this.getComponent(COMPONENTS_ID.Transform);
        const observer = this.getComponent(COMPONENTS_ID.ObserverModel);

        let moved = false;

        if (this.pad.justPressed(Pads.RIGHT) && this.currentPosition < this.positions.length - 1) {
            this.currentPosition++;
            const pos = this.positions[this.currentPosition];
            transform.setPosition(pos.x, pos.y);
            moved = true;
        }

        if (this.pad.justPressed(Pads.LEFT) && this.currentPosition > 0) {
            this.currentPosition--;
            const pos = this.positions[this.currentPosition];
            transform.setPosition(pos.x, pos.y);
            moved = true;
        }

        if (moved) {
            observer.notifyObservers(EVENTS.POSITION_CHANGED, {
                x: transform.x,
                y: transform.y
            });
        }
    }

    update() {
        this.pad.update();

        if (!this.positions || this.positions.length === 0) {
            this.updateFreeMove();
        }
        else {
            this.updateControlledMove();
        }

        if (this.pad.justPressed(Pads.CROSS)) {
            this.click();
        }
    }
}