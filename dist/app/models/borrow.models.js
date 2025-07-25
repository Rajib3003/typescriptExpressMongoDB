"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
        type: Date,
        // default: Date.now, 
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});
borrowSchema.post('save', function (doc, next) {
    console.log(`Book borrowed: ${doc.book}, Quantity: ${doc.quantity}`);
    next();
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
