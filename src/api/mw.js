import { HTTP_ERRORS } from "@/api/constants"
import { NotFoundError, PublicError } from "@/api/errors"
import log from "@/api/middlewares/log"
import methodNotAllowed from "@/api/middlewares/methodNotAllowed"
import config from '@/web/config'
import BaseModel from "@/db/models/BaseModel"
import PostsModel from "@/db/models/PostsModel"
import CommentsModel from "@/db/models/CommentsModel"
import UserModel from "@/db/models/UserModel"
import knex from "knex"
import { NotFoundError as ObjectionNotFoundError } from "objection"


console.log('config', config)

const mw = (handlers) => async (req, res) => {
  const middlewares = handlers[req.method]
  const sanitizedMiddlewares = [log, ...(middlewares || [methodNotAllowed])]
  let currentMiddlewareIndex = 0
  const db = knex(config.db)

  BaseModel.knex(db)

  const ctx = {
    db,
    models: {
      CommentsModel,
      PostsModel,
      UserModel,
    },
    req,
    res,
    next: async () => {
      const middleware = sanitizedMiddlewares[currentMiddlewareIndex]
      currentMiddlewareIndex += 1

      await middleware(ctx)
    },
  }

  try {
    await ctx.next()
  } catch (err) {
    const error =
      err instanceof ObjectionNotFoundError ? new NotFoundError() : err

    if (!(error instanceof PublicError)) {
      // eslint-disable-next-line no-console
      console.error(error)

      res
        .status(HTTP_ERRORS.INTERNAL_SERVER_ERROR)
        .send({ error: "Something went wrong." })

      return
    }

    res.status(error.httpCode).send({ error })
  } finally {
    await db.destroy()
  }
}

export default mw