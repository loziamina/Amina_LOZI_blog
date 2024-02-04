export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("idUser")
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}