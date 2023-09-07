import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  title: String,
  balance: Number,
  dueDate: String,
  isPaid: Boolean,
  note: String,
});

const ExpenseGroupSchema = new mongoose.Schema({
  startDate: String,
  endDate: String,
  totalBudget: Number,
  expenses: [ExpenseSchema],
});

export default mongoose.model('ExpenseGroups', ExpenseGroupSchema);
