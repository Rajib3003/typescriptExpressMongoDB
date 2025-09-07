import  express, { Request, Response }  from 'express';
import { Borrow } from '../models/borrow.models';
import { Book } from '../models/books.models';
import e from 'express';

export const borrowRouters = express.Router();

borrowRouters.post("/", async (req: Request, res: Response)=> {
    try {  
        const { book:bookId, quantity, dueDate } = req.body;
        const updateBook = await Book.borrowCopies(bookId, quantity);
        const borrowRecord = await Borrow.create({
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
    } catch (error:any) {
        console.log(error );
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
})
borrowRouters.get("/", async (req: Request, res: Response) => {
    try {
        const borrowSummary = await Borrow.aggregate([  
            { $sort: { createdAt: -1 } },
             {
                $group: {
                _id: "$book", 
                totalQuantity: { $sum: "$quantity" },
                lastBorrowedAt: {$first: "$createdAt" }
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
                    lastBorrowedAt: 1
                }
            },
            { $sort: { lastBorrowedAt: -1 } }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowSummary,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error
        });
    }
});