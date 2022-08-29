import { Router } from 'express';
import { 
  getAllProducts, 
  getRandomProduct, 
  getProductById, 
  newProduct,
  updateProduct,
  deleteProductById,
  getProductForm } from '../controller/productController.js';

const router = Router()

router.get('/', getAllProducts)
router.get('/random-product', getRandomProduct)
router.get('/product-form', getProductForm)
router.get('/:id', getProductById)
router.post('/', newProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProductById)

export default router