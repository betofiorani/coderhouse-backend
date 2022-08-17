import { Router } from 'express';
import Contenedor from '../class/Contenedor.js'

const router = Router()
const contenedor = new Contenedor("productos.txt")

router.get('/', async (req, res) => {
    const products = await contenedor.getAll()
    res.send(products)
})

router.get('/random-product', async (req, res) => {
  const product = await contenedor.getRamdomProduct()
  res.send(product)
})

router.get('/:id', async (req,res) => {
    let products = await contenedor.getById(req)
    res.send(products)
})

router.post('/', async (req, res) => {
    let products = await contenedor.save(req)
    res.send(products)
})

router.put('/:id', async (req, res) => {
    let products = await contenedor.modifyById(req)
    res.send(products)
})

router.delete('/:id', async (req, res) => {
    let products = await  contenedor.deleteById(req)
    res.send(products)
})

export default router