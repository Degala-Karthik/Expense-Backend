import express from 'express';
import { getAllExpenseItems, deleteExpenseItem, createExpenseItem, getExpenseItemById, add } from '../controllers/expenseItem.controller.js';

const ExpenseItemRouter = express.Router();

// // Get all expense items
ExpenseItemRouter.get('/:userId', getAllExpenseItems);

ExpenseItemRouter.get('/addmanual/:userId', add);

// // Get a single expense item by ID
ExpenseItemRouter.post('/:id', getExpenseItemById);

// // Create a new expense item
ExpenseItemRouter.post('/', createExpenseItem);

// // Update an expense item by ID
// ExpenseItemRouter.put('/:id', expenseItemController.updateExpenseItem);

// Delete an expense item by ID
ExpenseItemRouter.delete('/:id', deleteExpenseItem);

export default ExpenseItemRouter;