import { getModelForClass, prop } from '@typegoose/typegoose'
import { Length } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import { ObjectId } from 'mongodb'

@ObjectType()
export class Author {
  @Field({ nullable: true })
  readonly _id: ObjectId

  @Field({ nullable: true })
  @prop()
  @Length(1,255)
  public name: string

}
export const AuthorModel = getModelForClass(Author, { schemaOptions: { timestamps: true } })
