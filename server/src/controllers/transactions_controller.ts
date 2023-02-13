import Transaction from '../models/transactions_model.js'
import { Request, Response, NextFunction } from 'express'

// transaction category
export const newTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) return res.status(400).json('Please enter data')
  let { name, type, amount } = req.body
  const transaction = await Transaction.create({
    name,
    type,
    amount,
    date: new Date(),
  })
  transaction.save(function (err) {
    if (!err) return res.json(transaction)
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` })
  })
}

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) return res.status(400).json('Please enter data')
  let data = await Transaction.find({})
  return res.json(data)
}

export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) res.status(400).json({ message: 'Please enter data' })
  await Transaction.deleteOne(req.body, function (err: any) {
    if (!err) res.json('Transaction Deleted successfully!')
  })
    .clone()
    .catch(function (err) {
      res.json('Error while deleting Transaction Record')
    })
}

export const getLabels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Transaction.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'type',
        foreignField: 'type',
        as: 'categories_info',
      },
    },
    {
      // $unwind: { path: '$categories_info', preserveNullAndEmptyArrays: true },
      $unwind: '$categories_info',
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info && v.categories_info['color'],
          }
        )
      )
      res.json(data)
    })
    .catch((error) => {
      res.status(400).json(`Lookup Collection Error ${error}`)
    })
}
