export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("description")
    table.boolean("isDone")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}