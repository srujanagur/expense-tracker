import mongoose, { Document } from 'mongoose'
export type TransactionDocument = Document & {
  name: string
  type: string
  amount: number
  date: number
}

const transactionSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  type: { type: String, default: 'Investment' },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
})

export default mongoose.model<TransactionDocument>(
  'Transaction',
  transactionSchema
)
