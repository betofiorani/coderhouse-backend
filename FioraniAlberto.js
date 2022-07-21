// Desafío con entrega 1 - CLASES

class Usuario {
  
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }
  getFullName = () => `${this.nombre} ${this.apellido}`
  addMascota = mascota => this.mascotas.push(mascota)
  countMascotas = () => this.mascotas.length
  getBookNames = () => this.libros.map(libro => libro.name)
}

// Instanciamos un objeto usuario de la clase Usuario
const usuario = new Usuario("Beto", "Fiorani", [{name: "Muerte en las Nubes", author: "Agatha Christie"}, {name:"El Túnel", author: "Ernesto Sábato"}], ["perro"])

// Imprimimos en Consola el objeto usuario recién instanciado
console.log("usuario instanciado:", usuario)

// Utilizamos el método getFullName imprimiéndolo en consola.
console.log(`Nombre del Usuario instanciado: ${usuario.getFullName()}`)

// Utilizamos el método addMascota e imprimimos en consola las mascotas que tiene el usuario
usuario.addMascota("gato")
console.log(`${usuario.getFullName()} adoptó un gato. ahora tiene las siguientes mascotas: ${usuario.mascotas.join(", ")}`)

// Utilizamos el método para contar la cantidad actual de mascotas
console.log(`${usuario.nombre} tiene la siguiente cantidad mascotas: ${usuario.countMascotas()}`)

// Utilizamos el método para obtener los nombres de los libros
console.log(`${usuario.nombre} tiene los siguientes libros: ${usuario.getBookNames().join(", ")}`)