import db from '../../../../db'

export default async function handler(req, res) {

  const userId = req.query.id

  try {
    const userStats = await db({
      postsCount: db('posts').count().where({ userId }).first(),
      commentsCount: db('comments').count().where({ userId }).first(),
    })
    const recentPosts = await db('posts').where({ userId }).orderBy('desc').limit(5)
    res.status(200).json({
      stats: userStats,
      recentPosts
    })

  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching dashboard data" })
  }
}
