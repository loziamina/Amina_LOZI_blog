import { faker } from "@faker-js/faker"

export const seed = async (db) => {
  await db("comments").del()
  await db("posts").del()
  await db("users").del()


  await db("users").insert(
    [...Array(5)].map(() => ({
      email: faker.internet.email(),
      passwordHash: "alskdjalsdkjasdlkj",
      passwordSalt: "alskdjalsdkjasdlkj",
    }))
  )

  const users = await db("users").select("idUser");
  await db("posts").insert(
    [...Array(100)].map(() => ({
      description: faker.lorem.sentence(),
      users_Id: faker.random.arrayElement(users).id,
    }))
  )

  const posts = await db("posts").select("idPosts");
  await db("comments").insert(
    [...Array(500)].map(() => ({
      description: faker.lorem.sentence(),
      users_Comments_Id: faker.random.arrayElement(users).id,
      posts_Comments_Id: faker.random.arrayElement(posts).id,
    }))
  )
}
