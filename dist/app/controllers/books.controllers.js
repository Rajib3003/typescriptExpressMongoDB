"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouters = void 0;
const express_1 = __importDefault(require("express"));
const books_models_1 = require("../models/books.models");
exports.booksRouters = express_1.default.Router();
// Create books
exports.booksRouters.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_models_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Validation failed',
            success: false,
            error
        });
    }
}));
// Get all books
exports.booksRouters.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterGenre = req.query.filter;
    const filter = {};
    if (filterGenre) {
        filter.genre = filterGenre;
    }
    const sortOrder = req.query.sort === 'desc' ? -1 : 1;
    const limit = parseInt(req.query.limit) || 100;
    const books = yield books_models_1.Book.find(filter).sort({ title: sortOrder }).limit(limit);
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books,
    });
}));
// Get a book by ID
exports.booksRouters.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_models_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Single Book fetched successfully",
        data: book,
    });
}));
// Update a book by ID
exports.booksRouters.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const body = req.body;
    const book = yield books_models_1.Book.findByIdAndUpdate(bookId, body, { new: true });
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
}));
// Delete a book by ID
exports.booksRouters.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_models_1.Book.findByIdAndDelete({ _id: bookId });
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
