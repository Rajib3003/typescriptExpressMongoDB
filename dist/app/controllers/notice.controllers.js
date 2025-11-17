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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRouters = void 0;
const express_1 = __importDefault(require("express"));
const notice_models_1 = require("../models/notice.models");
exports.noticeRouters = express_1.default.Router();
exports.noticeRouters.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, date, description, link, photo } = req.body;
        // Validation
        if (!title || !date) {
            return res.status(400).json({ message: "Title and date are required." });
        }
        const newNotice = new notice_models_1.Notice({ title, date, description, link, photo, });
        const savedNotice = yield newNotice.save();
        res.status(201).json({
            message: "Notice created successfully",
            data: savedNotice,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
/**
 * Get all Notices
 */
exports.noticeRouters.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterDate = req.query.date;
        const filterTitle = req.query.title;
        const filter = {};
        if (filterDate) {
            filter.date = new Date(filterDate);
        }
        if (filterTitle) {
            filter.title = { $regex: filterTitle, $options: "i" };
        }
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 100;
        const notices = yield notice_models_1.Notice.find(filter)
            .sort({ date: sortOrder })
            .limit(limit);
        const totalNotices = yield notice_models_1.Notice.countDocuments(filter);
        res.status(200).json({
            success: true,
            message: "Notices fetched successfully",
            total: totalNotices,
            count: notices.length,
            data: notices,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
}));
// GET single notice
exports.noticeRouters.get("/:noticeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticeId = req.params.noticeId;
        const result = yield notice_models_1.Notice.findById(noticeId);
        if (!result) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json({
            success: true,
            message: "Single Notice fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
/**
 * Update Notice by ID
 */
exports.noticeRouters.patch("/:noticeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticeId = req.params.noticeId;
        // const body = req.body;
        const _a = req.body, { title } = _a, restBody = __rest(_a, ["title"]);
        if (title) {
            const existingNotice = yield notice_models_1.Notice.findOne({
                title: title,
                _id: { $ne: noticeId },
            });
            if (existingNotice) {
                return res.status(400).json({
                    success: false,
                    message: "Title already exists. Please use a different title.",
                });
            }
        }
        const updatedNotice = yield notice_models_1.Notice.findByIdAndUpdate(noticeId, Object.assign({ title }, restBody), {
            new: true,
        });
        if (!updatedNotice) {
            return res.status(404).json({
                success: false,
                message: "Notice not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Notice updated successfully",
            data: updatedNotice,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error,
        });
    }
}));
/**
 * Delete Notice by ID
 */
exports.noticeRouters.delete("/:noticeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticeId = req.params.noticeId; // ✅ correct param
        const deletedNotice = yield notice_models_1.Notice.findByIdAndDelete(noticeId);
        if (!deletedNotice) {
            return res.status(404).json({ message: "Notice not found" });
        }
        res.status(200).json({ message: "Notice deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
