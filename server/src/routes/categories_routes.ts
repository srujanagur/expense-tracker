import express from 'express'
import {
  newCategory,
  allCategories,
} from '../controllers/categories_controller.js'

const router = express.Router()

router.post('/categories', newCategory).get('/categories', allCategories)

export default router
