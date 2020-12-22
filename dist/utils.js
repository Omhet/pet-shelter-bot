"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.getText = void 0;
exports.getText = (element, selector) => {
    return element.querySelector(selector)?.textContent?.trim();
};
exports.getImage = (element, selector) => {
    return element.querySelector(selector)?.getAttribute('src');
};
