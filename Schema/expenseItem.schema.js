import mongoose from 'mongoose';

const expenseItemSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    recurring: { type: Boolean, default: false },
    location: { type: String, required: true },
    subLocation: { type: String, required: true },
    tags: { type: [String], default: [] },
    notes: { type: String, default: null },
    currency: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const ExpenseItem = mongoose.model('ExpenseItem', expenseItemSchema);
export default ExpenseItem 