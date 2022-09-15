import knex from 'knex'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const configSQLite3 = {
    client: "sqlite3",
    connection: { filename: __dirname + `/chatdb.sqlite` },
    useNullAsDefault: true,
    dirname: __dirname,
    filename: __filename
}

const chatConnection = knex(configSQLite3)

export {chatConnection, configSQLite3}