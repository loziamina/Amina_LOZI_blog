export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.integer("authorId").unsigned().references("users.id").onDelete("CASCADE")
    table.string("title").notNullable()
    table.text("content").notNullable()
    table.boolean("published").defaultTo(false)
    table.timestamps(true, true)
  })
   await db.schema.alterTable("posts", (table) => {
    table.foreign("authorId").references("id").inTable("users").onDelete("SET NULL")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}
