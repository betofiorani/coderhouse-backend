//use ecommerce

// 1) Primer Insert y creacion de mensajes en collection de "mensajes"
    db.mensajes.insertMany([ 
      { "userEmail": "betofiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "Hola Guadi, que tal la escuela?!" },
      { "userEmail": "guadifiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "Bien papi" }, 
      { "userEmail": "guadifiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "jugué mucho" },
      { "userEmail": "betofiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "qué aprendiste hoy?" },
      { "userEmail": "guadifiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "matemáticas" },
      { "userEmail": "betofiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "cuánto es '2' + '2'?" },
      { "userEmail": "guadifiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "22" },
      { "userEmail": "betofiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "excelente!!" },
      { "userEmail": "betofiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": "ya sos programadora" },
      { "userEmail": "guadifiorani@gmail.com", "date":"28/8/2022 23:38:12", "message": ":)" }])

// 2) Primer Insert y creacion de productos en collection de "productos"
    db.productos.insertMany([
      { "title": "producto 1", "price": 950, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 2", "price": 500, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" }, 
      { "title": "producto 3", "price": 620, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 4", "price": 2500, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 5", "price": 320, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 6", "price": 150, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 7", "price": 1950, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 8", "price": 5000, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 9", "price": 1220, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
      { "title": "producto 10", "price": 550, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" },
    ])

//3)Listar los productos y mensajes de cada collection
    db.mensajes.find().pretty()
    db.productos.find().pretty()

//4) Mostramos la cantidad de documentos almacenados en cada collection
    db.mensajes.estimatedDocumentCount()
    db.productos.estimatedDocumentCount()
    
//5)CRUD sobre las collections
//a)
    db.productos.insertOne({ "title": "producto 11", "price": 10, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU" })
//b) filtros con proyecciones
    db.productos.find({"price":{$lt:1000}},{"title":1, "_id":0})
    db.productos.find({$and:[
        {"price":{$gt:1000}},
        {"price":{$lt:3000}}
    ]},{"title":1, "_id":0})
    db.productos.find({"price":{$gt:3000}},{"title":1, "_id":0})
    db.productos.find({},{"title":1, "price":1, "_id":0}).skip(2).limit(1).sort({"price":1})
//e) actualizacion multiple con insercion
    db.productos.updateMany({},{$set:{"stock":100}},{upsert:true})
//d) actualziacion multiple
    db.productos.updateMany({"price":{$gt:4000}},{$set:{"stock":0}})
//e)borrado multiple
    db.productos.deleteMany({"price":{$lt:1000}})

//6) creacion de usuario con permisos de solo lectura y verificacion de lo mismo
    //use admin
    db.createUser(
        {
            user: "pepe5",
            pwd: "asd456",
            roles: [
                {role: "read", db: "ecommerce"}
            ]
        }
    )
// Login con usuario pepe:
// Inicializo la base con el flag de autenticacion;
    //mongod -auth --dbpath ./base
    // mongo -u pepe -p asd456
// Verificacion de permisos de usuario nuevo
    db.productos.find({"price":{$gt:1000}},{"title":1, "_id":0}) // pudo leer.
    db.productos.deleteMany({"price":{$lt:3000}}) // no pudo borrar
    db.productos.insertOne({"title": "producto 12", "price": 10, "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU"}) // no pudo insertar
