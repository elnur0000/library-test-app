import { ObjectId } from 'mongodb'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { GqlObjectIdScalar } from '../graphql/scalars/object-id'

export default () => buildSchema({
  resolvers: [
    path.join(__dirname,'..','domains','*','resolver.ts')
  ],
  emitSchemaFile: 'src/common/schema.graphql',
  scalarsMap: [{ scalar: GqlObjectIdScalar, type: ObjectId }]
})
