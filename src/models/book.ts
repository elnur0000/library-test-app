import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { Length } from 'class-validator'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { Author } from './author'

@ObjectType()
export class Book {
  @Field()
  readonly _id: ObjectId

  @Field()
  @prop({ required: true })
  @Length(1,255)
  public title: string

  @Field({ nullable: true })
  @prop({ required: true })
  public price?: number

  @Field(() => Author, { nullable: true })
  @prop({ ref: Author })
  public author?: Ref<Author>

}
export const BookModel = getModelForClass(Book, { schemaOptions: { timestamps: true } })
