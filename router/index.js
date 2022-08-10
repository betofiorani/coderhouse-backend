import { Router } from 'express';
import Contenedor from '../class/Contenedor.js'

const router = Router()
const contenedor = new Contenedor("productos.txt")


router.get('/', (req, res) => {
    res.send('Soy un GET a la URL raiz de la API')
})

router.get('/productos', async (req, res) => {

    const products = await contenedor.getAll()
    res.send(products)
})

router.get('/productos/random-product', async (req, res) => {
  const product = await contenedor.getRamdomProduct()
  res.send(product)
})

router.get('/productos/:id', async (req,res) => {
    let products = await contenedor.getById(req)
    res.send(products)
})

router.post('/productos', async (req, res) => {
    let products = await contenedor.save(req)
    res.send(products)
})

router.put('/productos/:id', async (req, res) => {
    let products = await contenedor.modifyById(req)
    res.send(products)
})

router.delete('/productos/:id', async (req, res) => {
    let products = await  contenedor.deleteById(req)
    res.send(products)
})

export default router