import express from 'express'
import {
  newTransaction,
  getAllTransactions,
  deleteTransaction,
  getLabels,
} from '../controllers/transactions_controller.js'

const router = express.Router()

router
  .post('/transactions', newTransaction)
  .get('/transactions', getAllTransactions)
  .delete('/transactions', deleteTransaction)

router.get('/labels', getLabels)

export default router
