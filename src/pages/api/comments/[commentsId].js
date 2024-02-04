import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
  statusValidator,
  commentsDescriptionValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        commentsId: idValidator,
      },
    }),
    async ({
      models: { CommentsModel },
      input: {
        query: { commentsId },
      },
      res,
    }) => {
      const comments = await CommentsModel.query().findById(commentsId).throwIfNotFound()

      res.send(comments)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        commentsId: idValidator,
      },
      body: {
        description: commentsDescriptionValidator.optional(),
        postId: idValidator.optional(),
        isDone: statusValidator.optional(),
      },
    }),
    async ({
      models: { CommentsModel },
      input: {
        body,
        query: { commentsId },
      },
      res,
    }) => {
      const updatedcomments = await CommentsModel.query()
        .updateAndFetchById(commentsId, {
          ...body,
          updatedAt: CommentsModel.fn.now(),
        })
        .withGraphFetched("posts")
        .throwIfNotFound()

      res.send(updatedcomments)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        commentsId: idValidator,
      },
    }),
    async ({
      models: { CommentsModel },
      input: {
        query: { commentsId },
      },
      res,
    }) => {
      const comments = await CommentsModel.query().findById(commentsId).throwIfNotFound()

      await comments.$query().delete()

      res.send(comments)
    },
  ],
})

export default handle