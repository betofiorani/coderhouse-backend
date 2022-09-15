// para en futuras entregas separar chat de productos
// este va a ser el futuro controller de chat cuando esté asignado a su propia ruta.
import { configSQLite3 as chatConfig } from '../database/chatDatabaseSqlite3.js'

import Chat from '../model/Chat.js'

const chat = new Chat(chatConfig, 'chat')

const newMessage = async (req, res) => {
  
  try {
      let messages = await chat.save(req)
      //res.send(messages)
      res.redirect('/api/productos')
  } catch (error) {
      console.log(error)
  }
}


const getAllMessages = async (req, res) => {
  const {io} = req
  try {
      const messages = await chat.getAll()
      
      io.sockets.emit("server:messages",messages)   
      res.render('home.ejs', {mensajes: messages})
      
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  }
}

export {getAllMessages, newMessage}