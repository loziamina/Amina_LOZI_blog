import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
  pageValidator,
  statusValidator,
  commentsDescriptionValidator,
} from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        description: commentsDescriptionValidator,
        postId: idValidator,
        isDone: statusValidator.optional(),
      },
    }),
    async ({
      models: { CommentsModel },
      input: {
        body: { description, postId, isDone },
      },
      res,
    }) => {
      const comment = await CommentsModel.query()
        .insertAndFetch({
          description,
          postId,
          isDone,
        })
        .withGraphFetched("post")

      res.send(comment)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({
      res,
      models: { CommentsModel },
      input: {
        query: { page },
      },
    }) => {
      const query = CommentsModel.query()
      const comments = await query
        .clone()
        .withGraphFetched("posts")
        .orderBy("createdAt", "DESC")
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

      res.send({
        result: comments,
        meta: {
          count,
        },
      })
    },
  ],
})

export default handle