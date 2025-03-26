"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res) => {
    res.status(404).send({ message: "Route not found" });
};
exports.default = notFoundHandler;
