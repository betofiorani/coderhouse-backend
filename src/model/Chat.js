import knex from 'knex'
class Chat {
  constructor(configDB, tableName){
    this.config = configDB
    this.tableName = tableName
  }
  save = async req => {

    const {userEmail, message} = req.body

    try{

      const date = new Date()
      const date_formated = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
      const newMessage = {userEmail, message, date: date_formated}

      await knex(this.config)(this.tableName).insert(newMessage)
      console.log("chat registrado!")
      knex(this.config).destroy()
                
      return newMessage
        
    } 
    catch(error) {
        console.log(`Ocurrió un error al guardar el producto. El error es: ${error}`)
        knex(this.config).destroy()
    }
  } 
  
  getAll = async () => {

    try {      
      const messages = await knex(this.config).from(this.tableName).select('userEmail', 'message','date')
      knex(this.config).destroy()
      return messages
    } 
    catch (error) {
      console.log(`Ocurrió un error al leer archivo. El error fue: ${error}`)
      knex(this.config).destroy()
    }

  }
}

export default Chat