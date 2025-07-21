import { Server } from 'http';
import  app  from './app';
import mongoose from 'mongoose';

let server :Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://LibraryManagementSystem:LibraryManagementSystem@cluster0.qgah9aq.mongodb.net/librarymanagementsystem?retryWrites=true&w=majority&appName=Cluster0');
        server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
    } catch (error) {
        console.log(error);
    }
   
}
main();




