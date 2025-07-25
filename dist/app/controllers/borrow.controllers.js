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
exports.borrowRouters = void 0;
const express_1 = __importDefault(require("express"));
const borrow_models_1 = require("../models/borrow.models");
const books_models_1 = require("../models/books.models");
exports.borrowRouters = express_1.default.Router();
exports.borrowRouters.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const updateBook = yield books_models_1.Book.borrowCopies(bookId, quantity);
        const borrowRecord = yield borrow_models_1.Borrow.create({
            book: bookId,
            quantity,
            dueDate
        });
        res.status(201).json({
            success: true,
            message: "Borrow created successfully",
            data: {
                borrow: borrowRecord,
                book: updateBook
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            success: false,
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            }
        });
    }
}));
exports.borrowRouters.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowSummary = yield borrow_models_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowSummary,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error
        });
    }
}));
