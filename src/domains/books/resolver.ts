import { DeleteResponse } from '../../types/mutation-response-types'
import { ObjectId } from 'mongodb'
import {
  Arg,
  Mutation, Query,
  Resolver
} from 'type-graphql'
import { Book } from '../../models/book'
import BookService from '../../services/book-service'

@Resolver()
export class BookResolver {

  @Query(() => [Book])
  async books () {
    return BookService.getAll()
  }

  @Query(_returns => Book)
  async getBook (@Arg('id') id: ObjectId) {
    return BookService.getById(id)
  }

  @Mutation(_type => Book)
  async createBook (
    @Arg('title') title: string,
    @Arg('author') author: ObjectId,
    @Arg('price') price: number
    ) {
    return BookService.create({
      title,
      author,
      price
    })

  }

  @Mutation(_returns => DeleteResponse)
  async deleteBook (@Arg('id') id: ObjectId) {
    return BookService.deleteById(id)
  }

  @Mutation(_returns => Book)
  async updateBook (
    @Arg('id') id: ObjectId,
    @Arg('title') title: string,
    @Arg('author', { nullable: true }) author?: ObjectId,
    @Arg('price', { nullable: true }) price?: number
    ) {
    return BookService.updateById(id, {
      title,
      author,
      price
    }
    )
  }

  @Mutation(() => DeleteResponse)
  async deleteAllBooks () {
    return BookService.deleteAll()
  }

}
