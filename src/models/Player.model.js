import COMPONENTS_ID from "../constants/components.constant.js";
import BaseModel from "./Base.model.js";
import MovementModel from "./Movement.model.js";
import ObserverModel from "./Observer.model.js";
import TransformModel from "./Transform.model.js";

export default class PlayerModel extends BaseModel {

    static PLAYER_PADS_NUM = 0

    constructor(transform, movementConfig) {
        super('player')
        PlayerModel.PLAYER_PADS_NUM++;
        this.setupComponents(transform.x, transform.y, movementConfig.speed)
    }

    setupComponents(x, y, speed) {
        this.addComponent(COMPONENTS_ID.TransformModel, new TransformModel(x, y))
            .addComponent(COMPONENTS_ID.MovementModel, new MovementModel(speed))
            .addComponent(COMPONENTS_ID.ObserverModel, new ObserverModel())
    }
}