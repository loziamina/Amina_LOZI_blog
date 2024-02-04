
export const up = async(db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("idPosts")
    table.text("description").notNullable()
    table.integer("users_Id").unsigned().notNullable()
    table.timestamps(true, true)

  })
  await db.schema.alterTable("posts", (table) => {
    table.foreign("users_Id").references("idUser").inTable("users")
  })
}

export const down = async(db) => {
  await db.schema.alterTable("posts", (table) => {
    table.dropColumun("users_Id")
  })
  await db.schema.dropTable("posts")
}

