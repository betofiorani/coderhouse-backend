import knex from 'knex'

const config = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "coderhouse_backend",
    },
    pool: {min: 0, max: 7}
}

const productosConnection = knex(config)

export  {productosConnection, config }