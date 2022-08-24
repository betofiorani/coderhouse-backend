import Contenedor from '../model/Contenedor.js'
const contenedor = new Contenedor("productos.txt")

const getAllProducts = async (req, res) => {
  try {
      const products = await contenedor.getAll()   
      res.render('main.hbs', {productos: products})
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

const getRandomProduct = async (req, res) => {
  try {
    const product = await contenedor.getRamdomProduct()
    res.send(product)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
}

const getProductById = async (req,res) => {
  try {
    let products = await contenedor.getById(req)
    res.send(products)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500) 
  }
}

const newProduct = async (req, res) => {
  try {
      let products = await contenedor.save(req)
      //res.send(products)
      res.redirect('/api/productos')
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }

}

const updateProduct = async (req, res) => {
  try {
    let products = await contenedor.modifyById(req)
    res.send(products)  
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteProductById = async (req, res) => {
  try {
    let products = await  contenedor.deleteById(req)
    res.send(products)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const getProductForm = (req,res) => {
  try {
    res.render('form.hbs',{})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export {
  getAllProducts, getRandomProduct, getProductById, 
  newProduct, updateProduct, deleteProductById, getProductForm}