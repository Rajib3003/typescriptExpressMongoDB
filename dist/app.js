"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controllers_1 = require("./app/controllers/books.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const cors_1 = __importDefault(require("cors"));
const notice_controllers_1 = require("./app/controllers/notice.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    'http://localhost:5173',
    'https://b5a4-react-redux.vercel.app'
];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use('/api/books', books_controllers_1.booksRouters);
app.use('/api/borrow', borrow_controllers_1.borrowRouters);
app.use('/api/notice', notice_controllers_1.noticeRouters);
app.get("/", (req, res) => {
    res.send("Welcome to the Express server start!!!!");
});
exports.default = app;
