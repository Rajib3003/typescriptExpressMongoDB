import express, { Request, Response }  from "express";
import { Book } from "../models/books.models";

export const booksRouters = express.Router();

// Create books

booksRouters.post("/create", async (req:Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
    })
    } catch (error) {
          return  res.status(400).json({    
            message: 'Validation failed',
            success: false,
            error
        })
    }  
})

// Get all books
booksRouters.get("/", async (req: Request, res: Response) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: books,
    });
});
// Get a book by ID
booksRouters.get("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Single Book fetched successfully",
        data: book, 
    });
});
// Update a book by ID
booksRouters.patch("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(bookId, body, {new: true}); 
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
});
// Delete a book by ID
booksRouters.delete("/:bookId", async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete({_id : bookId});
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    }); 
});