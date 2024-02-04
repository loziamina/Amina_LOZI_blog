import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { postNameValidator, pageValidator } from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  POST: [
    validate({
      body: {
        name: postNameValidator,
      },
    }),
    async ({
      models: { PostsModel },
      input: {
        body: { name },
      },
      res,
    }) => {
      const post  = await PostsModel.query().insertAndFetch({ name })

      res.send(post)
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
      models: { PostsModel },
      input: {
        query: { page },
      },
    }) => {
      const query = PostsModel.query()
      const posts = await query
        .clone()
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

      res.send({
        result: posts,
        meta: {
          count,
        },
      })
    },
  ],
})

export default handle