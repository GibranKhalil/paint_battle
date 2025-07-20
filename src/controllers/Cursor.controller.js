import COMPONENTS_ID from "../constants/componentsId.constant.js";
import EVENTS from "../constants/event.constant.js";
import CursorModel from "../models/Cursor.model.js";
import CursorComponent from "../views/Cursor.view.js";
import BaseController from "./Base.controller.js";

export default class CursorController extends BaseController {
    constructor(initialX = 0, initialY = 0, speed = 3, positions, clickables) {
        super(new CursorModel(initialX, initialY, positions), new CursorComponent(initialX, initialY))

        this.speed = speed;
        this.lastMoveTime = 0;
        this.moveInterval = 10 / speed;

        this.pad = Pads.get(0);

        this.model.getComponent(COMPONENTS_ID.ObserverModel).addObserver(this);

        this._setupObserver(clickables);
    }

    _setupObserver(clickables) {
        const observerModel = this.model.getComponent(COMPONENTS_ID.ObserverModel)

        if (clickables && clickables.length > 0) {
            clickables.forEach(button => {
                observerModel.addObserver(button)
            });
        }
    }

    _handleFreeMovement() {
        const currentTime = Date.now();

        if (currentTime - this.lastMoveTime >= this.moveInterval) {
            let moved = false;

            if (this.pad.pressed(Pads.UP)) {
                this.model.move(0, -this.speed);
                moved = true;
            }

            if (this.pad.pressed(Pads.DOWN)) {
                this.model.move(0, this.speed);
                moved = true;
            }

            if (this.pad.pressed(Pads.LEFT)) {
                this.model.move(-this.speed, 0);
                moved = true;
            }

            if (this.pad.pressed(Pads.RIGHT)) {
                this.model.move(this.speed, 0);
                moved = true;
            }

            if (moved) {
                this.lastMoveTime = currentTime;
            }
        }
    }

    _handleControlledMovement() {
        if (this.pad.justPressed(Pads.RIGHT)) {
            this.model.moveToNextPosition();
        }

        if (this.pad.justPressed(Pads.LEFT)) {
            this.model.moveToPreviousPosition();
        }
    }

    _handleInput() {
        this.pad.update();

        if (this.model.hasPositions()) {
            this._handleControlledMovement();
        } else {
            this._handleFreeMovement();
        }

        if (this.pad.justPressed(Pads.CROSS)) {
            this.model.click();
        }
    }

    onEntityEvent(eventType, data) {
        if (eventType === EVENTS.POSITION_CHANGED) {
            this.view.updatePosition(data.x, data.y);
        }
    }

    update() {
        this._handleInput();

        this.view.render();
    }

    click() {
        this.model.click();
    }

    moveTo(x, y) {
        this.model.setPosition(x, y);
    }

    moveBy(deltaX, deltaY) {
        this.model.move(deltaX, deltaY);
    }

    getCurrentPosition() {
        return this.model.getPosition();
    }

    destroy() {
        if (this.model) {
            this.model.destroy();
        }
        if (this.view) {
            this.view.destroy();
        }
    }
}