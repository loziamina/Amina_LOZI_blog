import BaseModel from "@/db/models/BaseModel"
import PostsModel from "@/db/models/PostsModel"

class CommentsModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostsModel,
        join: {
          from: "comments.postsId",
          to: "posts.postsId",
        },
      },
    }
  }
}

export default CommentsModel