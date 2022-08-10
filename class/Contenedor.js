const fs = require("fs")

const path = "./archivos/"

class Contenedor {
  constructor(fileName){
    this.fileName = fileName
  }
  save = async object => {

    try{

        const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
        let maxId = 0

        products.forEach(product => {
          maxId = product.id
          maxId > product.id ? maxId = product.id : "" 
        })

        const id = maxId + 1
        const { title, price, thumbnail } = object
        
        const newProduct = {title,price,thumbnail,id}

        products.push(newProduct)
        
        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(products, null, "\t"))
        
        console.log("Nuevo Producto: ",newProduct)
        
    } 
    catch(error) {
        console.log(`Ocurrió un error al guardar el producto. El error es: ${error}`)
    }
  } 
  getById = async id => {

    try{
      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
      const productFiltered = products.filter(product => product.id == id)
      
      productFiltered.length > 0 ? console.log("Producto encontrado:",productFiltered) : console.log({error: `Producto con id ${id} no encontrado`})
    }
    catch (error){
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  getAll = async () => {

    try {
      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
      console.log("productos Disponibles: ",products)
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  deleteById = async id => {

    try {
      
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
      const filterProducts = products.filter(product => product.id != id)
      
      await fs.promises.unlink(`${path}${this.fileName}`)
      await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterProducts, null, "\t"))
      
      console.log(`El producto con id: ${id} fue eliminado correctamente`)
    } 
    catch (error) {
        console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
    }

  }
  deleteAll = async () => {
    try {

      const products = []

      await fs.promises.unlink(`${path}${this.fileName}`)
      await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(products, null, "\t"))
      
      console.log("Todos los productos se eliminaron correctamente")
    } 
    catch (error) {
        console.log(`Ocurrió un error al eliminar el archivo. El error fue: ${error}`)
    }
  }

  modifyById = async (id, newData) =>{
    try {
        
      const products = fs.existsSync(`${path}${this.fileName}`) ? await JSON.parse(await fs.promises.readFile(`${path}${this.fileName}`, 'utf-8')) : []
        
        const filterProducts = products.map(product => product.id == id ? {...newData, id: product.id} : product)
        const productUpdated = filterProducts.filter(product => product.id == id)

        await fs.promises.writeFile(`${path}${this.fileName}`, JSON.stringify(filterProducts, null, "\t"))

        console.log("Productos Modificado: ",productUpdated)
        console.log("Productos Disponibles luego de la modificación: ",filterProducts)

      } catch (error) {
          console.log(`Ocurrio un error al leer archivo. El error fue: ${error}`)
      }
  }
}

module.exports = {Contenedor}