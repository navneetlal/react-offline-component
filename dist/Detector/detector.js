"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
class Detector extends main_1.Base {
    constructor(props) { super(props); }
    render() {
        return this.props.render({ online: this.state.online });
    }
}
exports.Detector = Detector;
