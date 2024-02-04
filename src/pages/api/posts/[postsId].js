import db from '../../../db/models'

export default async function handler(req, res) {
  const { postId } = req.query

  switch (req.method) {
    case 'GET':
      const post = await db.posts.findUnique({ where: { id: parseInt(postId) } })
      res.status(200).json(post)
      break;

    case 'PUT':
      const updatedPost = await db.posts.update({
        where: { id: parseInt(postId) },
        data: { ...req.body },
      })
      res.status(200).json(updatedPost)
      break;

    case 'DELETE':
      await db.posts.delete({ where: { id: parseInt(postId) } })
      res.status(200).json({ message: 'Post deleted successfully' })
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
