
import express, { Request, Response } from "express";
import { Notice } from "../models/notice.models";


export const noticeRouters = express.Router();



noticeRouters.post("/", async (req: Request, res: Response) => {
  try {
    const { title, date, description, link, photo } = req.body;

    // Validation
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required." });
    }

    const newNotice = new Notice({title, date, description, link, photo,});

    const savedNotice = await newNotice.save();
    res.status(201).json({
      message: "Notice created successfully",
      data: savedNotice,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * Get all Notices
 */
noticeRouters.get("/", async (req: Request, res: Response) => {
  try {
    const filterDate = req.query.date as string; 
    const filterTitle = req.query.title as string; 
    const filter: any = {};

    if (filterDate) {
      filter.date = new Date(filterDate);
    }

    if (filterTitle) {      
      filter.title = { $regex: filterTitle, $options: "i" };
    }

    
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    
    const limit = parseInt(req.query.limit as string) || 100;

    const notices = await Notice.find(filter)
      .sort({ date: sortOrder }) 
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Notices fetched successfully",
      data: notices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
});



/**
 * Get single Notice by ID
 */
noticeRouters.get("/:id", async (req: Request, res: Response) => {
  
  try {
    const noticeId = await Notice.findById(req.params.id);    
    if (!noticeId) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({
        success: true,
        message: "Single Notice fetched successfully",
        data: noticeId, 
    });;
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * Update Notice by ID
 */
noticeRouters.patch("/:noticeId", async (req: Request, res: Response) => {
  try {
    const noticeId = req.params.noticeId;
    // const body = req.body;


    const { title, ...restBody } = req.body;

    
    if (title) {
      const existingNotice = await Notice.findOne({
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

    const updatedNotice = await Notice.findByIdAndUpdate(noticeId,{ title, ...restBody }, {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
});


/**
 * Delete Notice by ID
 */
noticeRouters.delete("/:noticeId", async (req: Request, res: Response) => {
  try {
    const noticeId = req.params.noticeId; // ✅ correct param

    const deletedNotice = await Notice.findByIdAndDelete(noticeId);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

