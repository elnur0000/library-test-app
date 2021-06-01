import {
 Field, ObjectType
} from 'type-graphql'

@ObjectType()
export class DeleteResponse {
  @Field()
  public ok?: number
  @Field()
  public n?: number
  @Field()
  public deletedCount?: number
}
