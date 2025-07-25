import { model, Schema } from 'mongoose';
import { IBorrow } from './../interfaces/borrow.interface';

const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

borrowSchema.post('save', function (doc,next) {
    console.log(`Book borrowed: ${doc.book}, Quantity: ${doc.quantity}`);
    next();
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);