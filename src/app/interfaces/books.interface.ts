import { Document, Model } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    genre : string;
    isbn : string;
    description : string;
    copies : number;
    available : boolean;
}

export interface IBookModel extends Model<IBook>{
    borrowCopies(
        bookId: string, 
        quantity: number
    ): Promise<IBook>;      
}