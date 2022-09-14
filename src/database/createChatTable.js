import { chatConnection as database } from './chatDatabaseSqlite3.js'
import path from 'path'

console.log(path)

const createTableInsertChat = async () => {
    try {
        await database.schema.dropTableIfExists('chat')

        await database.schema.createTable('chat', table => {
            table.increments('id').primary()
            table.string('userEmail', 100).notNullable()
            table.string('message', 500). notNullable()
            table.string('date', 500). notNullable()
        })

        console.log("Chat table created")

        const chats = [
          {
            "userEmail": "betofiorani@gmail.com",
            "message": "hola",
            "date": "2/8/2022 13:42"
          },
          {
            "userEmail": "charly@crack.com",
            "message": "La clavé al ángulo",
            "date": "30/8/2022 13:49"
          },
          {
            "userEmail": "betofiorani@gmail.com",
            "message": "chau",
            "date": "30/8/2022 14:51"
          },
          {
            "userEmail": "betofiorani@gmail.com",
            "message": "hola de nuevo",
            "date": "30/8/2022 15:0"
          },
          {
            "userEmail": "andy@gmail.com",
            "message": "funciona",
            "date": "30/8/2022 15:24"
          },
          {
            "userEmail": "betofiorani@gmail.com",
            "message": "hola",
            "date": "31/8/2022 14:40"
          },
          {
            "userEmail": "betofiorani@gmail.com",
            "message": "Hola de nueva",
            "date": "31/8/2022 14:43"
          },
          {
            "userEmail": "charly@crack.com",
            "message": "volvi",
            "date": "31/8/2022 15:22"
          }
        ]

        await database('chat').insert(chats)

        console.log("History chat added!")

        database.destroy()

    } catch (error) {
        console.log(error)
    }
}

createTableInsertChat()