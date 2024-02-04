import db from '../../../../db/models'

export default async function handler(req, res) {
  const { postId, commentId } = req.query

  switch (req.method) {
    case 'GET':
      const comment = await db.Comment.findOne({
        where: { id: commentId, postId: postId }
      });
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      return res.status(200).json(comment)

    case 'PUT':
      const updatedComment = await db.comments.update({
        where: { id: parseInt(commentId) },
        data: { ...req.body },
      })
     return res.status(200).json(updatedComment)
  

    case 'DELETE':
      await db.comments.delete({ where: { id: parseInt(commentId) } })
      return res.status(200).json({ message: 'Comment deleted successfully' })


    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

