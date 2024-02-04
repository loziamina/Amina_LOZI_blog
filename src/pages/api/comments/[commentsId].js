import db from '../../../db/models'

export default async function handler(req, res) {
  const { commentId } = req.query

  switch (req.method) {
    case 'GET':
      const comment = await db.comments.findUnique({ where: { id: parseInt(commentId) } })
      res.status(200).json(comment)
      break;

    case 'PUT':
      const updatedComment = await db.comments.update({
        where: { id: parseInt(commentId) },
        data: { ...req.body },
      });
      res.status(200).json(updatedComment)
      break

    case 'DELETE':
      await db.comments.delete({ where: { id: parseInt(commentId) } })
      res.status(200).json({ message: 'Comment deleted successfully' })
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
