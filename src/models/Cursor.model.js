import COMPONENTS_ID from "../constants/componentsId.constant.js";
import EVENTS from "../constants/event.constant.js";
import TransformComponent from "../views/components/Transform.component.js";
import BaseModel from "./Base.model.js";
import ObserverModel from "./Observer.model.js";

export default class CursorModel extends BaseModel {
    constructor(x, y, positions = []) {
        super("CursorModel")
        this._setupComponents(x, y)
        this.positions = positions
        this.currentPosition = 0;
    }

    _setupComponents(x, y) {
        this.addComponent(COMPONENTS_ID.Transform, new TransformComponent(x, y))
            .addComponent(COMPONENTS_ID.ObserverModel, new ObserverModel())
    }

    setPosition(x, y) {
        const transform = this.getComponent(COMPONENTS_ID.Transform)
        const observer = this.getComponent(COMPONENTS_ID.ObserverModel)

        transform.setPosition(x, y)

        observer.notifyObservers(EVENTS.POSITION_CHANGED, {
            x: transform.x,
            y: transform.y
        });
    }

    move(deltaX, deltaY) {
        const transform = this.getComponent(COMPONENTS_ID.Transform)
        const observer = this.getComponent(COMPONENTS_ID.ObserverModel)

        transform.x += deltaX
        transform.y += deltaY

        observer.notifyObservers(EVENTS.POSITION_CHANGED, {
            x: transform.x,
            y: transform.y
        });
    }

    moveToNextPosition() {
        if (this.positions.length > 0 && this.currentPosition < this.positions.length - 1) {
            this.currentPosition++;
            const pos = this.positions[this.currentPosition];
            this.setPosition(pos.x, pos.y);
            return true;
        }
        return false;
    }

    moveToPreviousPosition() {
        if (this.positions.length > 0 && this.currentPosition > 0) {
            this.currentPosition--;
            const pos = this.positions[this.currentPosition];
            this.setPosition(pos.x, pos.y);
            return true;
        }
        return false;
    }

    click() {
        const transform = this.getComponent(COMPONENTS_ID.Transform)
        const observer = this.getComponent(COMPONENTS_ID.ObserverModel)

        observer.notifyObservers(EVENTS.ON_CLICK, {
            x: transform.x,
            y: transform.y
        });
    }

    getPosition() {
        const transform = this.getComponent(COMPONENTS_ID.Transform)
        return { x: transform.x, y: transform.y }
    }

    getCurrentPositionIndex() {
        return this.currentPosition
    }

    hasPositions() {
        return this.positions && this.positions.length > 0
    }

    isAtFirstPosition() {
        return this.currentPosition === 0
    }

    isAtLastPosition() {
        return this.currentPosition === this.positions.length - 1
    }
}