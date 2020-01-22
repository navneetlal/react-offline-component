"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
class Online extends main_1.Base {
    render() {
        return this.state.online ? this.renderChildren() : null;
    }
}
exports.Online = Online;
