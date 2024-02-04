import { config as dotenvConfig } from "dotenv"

dotenvConfig({ path: ".env.local" })

const knexfile = {
  client: "pg",
  connection: process.env.DB_CONNECTION,
  migrations: {
    directory: "./src/db/migrations",
    stub: "./src/db/migration.stub",
    loadExtensions: [".mjs"],
  },
  seeds: {
    directory: "./src/db/seeds",
    stub: "./src/db/seed.stub",
    loadExtensions: [".mjs"],
  },
};

console.log('Knexfile Configuration:', knexfile)

export default knexfile