import { Model } from "objection"

class BaseModel extends Model {}

BaseModel.BelongsToOneRelation = undefined

export default BaseModel