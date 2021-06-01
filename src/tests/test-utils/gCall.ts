import { graphql, GraphQLSchema } from 'graphql'
import { Maybe } from 'type-graphql'

import buildSchema from '../../utils/build-schema'

interface Options {
  source: string
  variableValues?: Maybe<{
    [key: string]: any;
  }>
  userId?: number
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, userId }: Options) => {
  if (!schema) {
    schema = await buildSchema()
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: jest.fn()
      }
    }
  })
}
