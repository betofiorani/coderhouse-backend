import { productosConnection as database } from "./productosDatabaseMysql.js"

const createTableInsertProducts = async () => {
    try {
        await database.schema.dropTableIfExists('productos')

        await database.schema.createTable('productos', table =>{
            table.increments('id').primary()
            table.string('title', 150).notNullable()
            table.string('price', 50).notNullable()
            table.string('thumbnail', 150).notNullable()
        })
        console.log("Products table Created")

        const productos = [
          {
            "title": "perro peluche",
            "price": 400,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_vlc_media_player-128.png"
          },
          {
            "title": "diskette 3 1/2 - antigüedad",
            "price": 200000,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_total_commander-128.png"
          },
          {
            "title": "google mail",
            "price": 54000,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_gmail-128.png"
          },
          {
            "title": "Manzana",
            "price": 50,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_apple_ios-128.png"
          },
          {
            "title": "Diamante Naranja",
            "price": 450000,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_sketch_app-128.png"
          },
          {
            "title": "Pingüino en extinción",
            "price": 405300,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_linux-128.png"
          }
        ]

        await database('productos').insert(productos)

        console.log('products inserted!')

        database.destroy()

    } catch (error) {
        console.log(error)
    }
}

createTableInsertProducts()