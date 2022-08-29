import express from "express";
import router from "./src/router/index.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars'

const app = express()
const PORT = 8080

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Statics
app.use('/form', express.static(`${__dirname}/public`))

// ejs
app.set('views', path.join(__dirname,'./src/views'))
app.set('view engine', 'ejs')

app.use('/api/productos', router)

app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`)
})