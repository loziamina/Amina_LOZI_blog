export const up = async(db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("idComments")
    table.text("description").notNullable()
  })
  await db.schema.alterTable("comments", (table) => {
    table.integer("posts_Comments_Id").notNullable()
    table.foreign("posts_Comments_Id").references("idPosts").inTable("posts")
  })
    await db.schema.alterTable("comments", (table) => {
    table.integer("users_Comments_Id").notNullable()
    table.foreign("users_Comments_Id").references("idUser").inTable("users")
  })
}

export const down = async(db) => {
  await db.schema.alterTable("comments", (table) => {
    table.dropColumun("posts_Comments_Id")
  })
    await db.schema.alterTable("comments", (table) => {
    table.dropColumun("users_Comments_Id")
  })
  await db.schema.dropTable("comments")
}

