import mw from "@/api/mw"

const handle = mw({
  GET: [
    async ({
      models: { PostsModel },
      req: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostsModel.query()
        .findById(postId)
        .throwIfNotFound()

      res.send(post)
    },
  ],
  PATCH: [
    async ({
      models: { PostsModel },
      req: {
        body,
        query: { postId },
      },
      res,
    }) => {
      const updatedPost = await PostsModel.query()
        .updateAndFetchById(postId, {
          ...body,
          updatedAt: PostsModel.fn.now(),
        })
        .throwIfNotFound()

      res.send(updatedPost)
    },
  ],
  DELETE: [
    async ({
      models: { CommentsModel, PostsModel },
      req: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostsModel.query()
        .findById(postId)
        .throwIfNotFound()

      await CommentsModel.query().delete().where({ postId })
      await post.$query().delete()

      res.send(post)
    },
  ],
})

export default handle