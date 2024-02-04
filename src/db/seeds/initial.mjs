import { faker } from "@faker-js/faker"

export const seed = async db => {
  await db('comments').del()
  await db('posts').del()
  await db('users').del()

  const usersData = [...Array(5)].map(() => ({
      email: faker.internet.email(),
      passwordHash: "alskdjalsdkjasdlkj",
      passwordSalt: "alskdjalsdkjasdlkj",
  }))
  await db('users').insert(usersData)

  const users = await db('users').select('idUser')

  for (const user of users) {
    await db('posts').insert(
      [...Array(10)].map(() => ({
        description: faker.lorem.paragraph(),
        users_Id: user.idUser,
      }))
    )
  }

  const posts = await db('posts').select('idPosts')

  posts.forEach(async post => {
    await db('comments').insert(
      [...Array(5)].map(() => ({
        description:  faker.word.words({ count: { min: 2, max: 10 } }),
        posts_Comments_Id: faker.number.int({ min: 0, max: post.length - 1 }).idPosts,
        users_Comments_Id: faker.number.int({ min: 0, max: post.length - 1 }).idUser,
      }))
    )
  })
}
