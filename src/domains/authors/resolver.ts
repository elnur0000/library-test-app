import AuthorService from '../../services/author-service'
import { ObjectId } from 'mongodb'
import {
  Arg,
  Query,
  Resolver,
  Mutation
} from 'type-graphql'
import { Author } from '../../models/author'

@Resolver()
export class AuthorResolver {

  @Query(() => [Author])
  async authors () {
    return AuthorService.getAll()
  }

  @Query(_returns => Author)
  async getAuthor (@Arg('id') id: ObjectId) {
    return AuthorService.getById(id)
  }

  @Mutation(_type => Author)
  async createAuthor (
    @Arg('name') name: string
    ) {
    return AuthorService.create({
      name
    })

  }

}
