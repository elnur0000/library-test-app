// import { BookResolver } from '../domains/books/resolver'
import * as Apollo from 'apollo-server-express'
import buildSchema from '../utils/build-schema'

export async function makeApolloServer () {
  return new Apollo.ApolloServer({
    playground: true,
    introspection: true,
    schema: await buildSchema()
  })
}
