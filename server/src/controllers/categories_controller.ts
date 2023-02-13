import { Request, Response, NextFunction } from 'express'
import Category, { CategoryDocument } from '../models/categories_model.js'

// Create category
export const newCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category: CategoryDocument = await Category.create({
    type: 'Investment',
    color: '#36AE7C',
  })
  category.save(function (err) {
    if (!err) return res.json(category)
    return res
      .status(400)
      .json({ message: `Error while creating categories ${err}` })
  })
}

// Get all categories
export const allCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = await Category.find({})
  let filter = data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  )
  return res.json(filter)
}
