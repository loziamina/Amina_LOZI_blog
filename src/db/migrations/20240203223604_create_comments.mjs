export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id")
    table.integer("postId").unsigned().references("posts.id").onDelete("CASCADE")
    table.integer("authorId").unsigned().references("users.id").onDelete("SET NULL")
    table.text("content").notNullable()
    table.timestamps(true, true)
  })

   await db.schema.alterTable("comments", (table) => {
    table.foreign("authorId").references("id").inTable("users").onDelete("SET NULL")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("comments")
}
