import mongoose, { Document } from 'mongoose'

export type CategoryDocument = Document & {
  type: string
  color: string
}
const categorySchema = new mongoose.Schema({
  type: { type: String, default: 'Investment' },
  color: { type: String, default: '#36AE7C' },
})

export default mongoose.model<CategoryDocument>('Category', categorySchema)
