import faker from 'faker'

export const seed = async (db) => {
  await db('comments').del()
  await db('posts').del()
  await db('users').del()

 
  const userData = [...Array(5)].map(() => ({
    email: faker.internet.email(),
    passwordHash: 'alskdjalsdkjasdlkj',
    passwordSalt: 'alskdjalsdkjasdlkj'
  }))
  await db('users').insert(userData)

  const posts = await db('posts')
    .insert(
      [...Array(30)].map(() => ({
        name: faker.random.word()
      }))
    )
    .returning('*')

  const commentsData = [...Array(3000)].map(() => ({
    description: faker.random.words(faker.random.number({ min: 2, max: 10 })),
    isDone: faker.random.boolean(),
    postsId: posts[faker.random.number({ min: 0, max: posts.length - 1 })].id
  }))
  await db('comments').insert(commentsData)
}
