"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const basicApp = (origins) => {
    const app = (0, express_1.default)();
    app.use((0, express_2.json)());
    app.use((0, express_2.urlencoded)({ extended: true }));
    app.use((0, cors_1.default)({
        credentials: true,
        origin: [...origins]
    }));
    return app;
};
exports.default = basicApp;
