import Contenedor from '../model/Contenedor.js'
import Chat from '../model/Chat.js'
import { config as productConfig } from '../database/productosDatabaseMysql.js'
import { configSQLite3 as chatConfig } from '../database/chatDatabaseSqlite3.js'

const contenedor = new Contenedor(productConfig, 'productos')
const chat = new Chat(chatConfig, 'chat')

const getAllProducts = async (req, res) => {
  const {io} = req
  try {
      const products = await contenedor.getAll()

      console.log("desde controller", products)
      const messages = await chat.getAll()
      
      io.sockets.emit("server:products",products)
      io.sockets.emit("server:messages",messages)

      res.render('home.ejs', {productos: products, messages: messages})
      
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
  
  const {io} = req

  try {
    res.render('form.ejs',{productos: productos})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export {
  getAllProducts, getRandomProduct, getProductById, 
  newProduct, updateProduct, deleteProductById, getProductForm}