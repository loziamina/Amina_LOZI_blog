import BaseModel from "@/db/models/BaseModel"
import CommentsModel from "@/db/models/CommentsModel"

class PostsModel extends BaseModel {
  static tableName = "posts"

  static get relationMappings() {
    return {
      posts: {
        relation: BaseModel.HasManyRelation,
        modelClass: CommentsModel,
        join: {
          from: "posts.id",
          to: "posts.postsId",
        },
      },
    }
  }
}

export default PostsModel