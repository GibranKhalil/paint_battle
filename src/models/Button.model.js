import COMPONENTS_ID from "../constants/componentsId.constant.js";
import BaseModel from "./Base.model.js";
import ObserverModel from "./Observer.model.js";

export default class ButtonModel extends BaseModel {
    constructor() {
        super("ButtonModel")
        this._setupComponents();
    }

    _setupComponents() {
        this.addComponent(COMPONENTS_ID.Observer, new ObserverModel())
    }
}