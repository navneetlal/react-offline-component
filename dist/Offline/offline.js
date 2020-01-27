"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
class Offline extends main_1.Base {
    constructor(props) { super(props); }
    render() {
        return !this.state.online ? this.renderChildren() : null;
    }
}
exports.Offline = Offline;
