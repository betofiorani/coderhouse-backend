import knex from 'knex'
class Contenedor {
  constructor(configDB, tableName){
    this.config = configDB
    this.tableName = tableName
  }

  save = async req => {

    const productData = req.body

    try{

        const { title, price, thumbnail } = productData
        
        const newProduct = {title, price: price*1,thumbnail}

        await knex(this.config)(this.tableName).insert(newProduct)
        
        console.log("producto agregado!")
        knex(this.config).destroy()
        
        return newProduct
        
    } 
    catch(error) {
      console.log(`Ocurrió un error al guardar el producto. El error es: ${error}`)
      knex(this.config).destroy()
    }
  } 

  getById = async req => {

    const {id} = req.params

    try{
      
      const product = await knex(this.config).from(this.tableName).select('*').where({id: id})        
      console.log(product)
      knex(this.config).destroy()
      return product.length > 0 ? product : {error: `Producto con id ${id} no encontrado`}
    }
    catch (error){
      console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
      knex(this.config).destroy()
    }

  }
  
  getAll = async () => {

    try{
      
      const products = await knex(this.config).from(this.tableName).select('*')        
      console.log(products)
      knex(this.config).destroy()
      return products
    }
    catch (error){
      console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
      knex(this.config).destroy()
    }

  }
  deleteById = async req => {

    const {id} = req.params

    try {
      await knex(this.config)(this.tableName).where({id:id}).del()
      knex(this.config).destroy()

      return `El producto con id: ${id} fue eliminado correctamente`
    } 
    catch (error) {
      console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
      knex(this.config).destroy()
    }

  }

  modifyById = async req =>{

    const {id} = req.params
    const newData = req.body
    
    try{

      const { title, price, thumbnail } = newData
      
      const product = {title, price: price*1, thumbnail}

      await knex(this.config)(this.tableName).where({id: id}).update(product)
      
      console.log("producto agregado!")
      knex(this.config).destroy()
      
      return product
        
    } 
    catch(error) {
      console.log(`Ocurrió un error al guardar el producto. El error es: ${error}`)
      knex(this.config).destroy()
    }
  }
}

export default Contenedor