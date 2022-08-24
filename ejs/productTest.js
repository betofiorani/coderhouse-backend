const { Contenedor } = require ("./class/Contenedor.js");

const pruebaMetodos = async () => {

  const producto = new Contenedor("producto.txt")

  // Creamos 3 productos
  console.log("-----------Creamos 3 productos-----------") 
  await producto.save({title: "Amoladora de mano", price: 10000, thumbnail: "soyElThumbdelaAmoladora.webp"}) 
  await producto.save({title: "Cuchara de Albañil", price: 200, thumbnail: "soyElThumbdelaCuchara.webp"})
  await producto.save({title: "Plomada", price: 100, thumbnail: "soyElThumbdelaPlomada.webp"})

  // Revisamos que estén los 3
  console.log("----Revisamos que estén los 3 productos----")
  await producto.getAll()

  // Los borramos todos
  console.log("----Los borramos a todos----")
  await producto.deleteAll()

  // los volvemos a crear
  console.log("----Los creamos nuevamente----")
  await producto.save({title: "Amoladora de mano", price: 10000, thumbnail: "soyElThumbdelaAmoladora.webp"}) 
  await producto.save({title: "Cuchara de Albañil", price: 200, thumbnail: "soyElThumbdelaCuchara.webp"})
  await producto.save({title: "Plomada", price: 100, thumbnail: "soyElThumbdelaPlomada.webp"})

  // buscamos el producto con id 2
  console.log("----Buscamos el producto con id 2----")
  await producto.getById(2)

  // lo eliminamos
  console.log("----Eliminamos el producto con id 2----")
  await producto.deleteById(2) 

  // agregamos un nuevo producto
  console.log("----Agregamos un nuevo producto----")
  await producto.save({title: "Cucharita de Albañil", price: 200, thumbnail: "soyElThumbdelaCuchara.webp"})
  
  // corregimos el nombre del producto anterior
  console.log("----Modificamos el título----")
  await producto.modifyById(4,{title: "Cuchara de Albañil", price: 400, thumbnail: "soyElMismoThumb"})

  // Listamos finalmente todos los productos
  console.log("----Obtenemos el listado final----")
  await producto.getAll()
}

  pruebaMetodos()

