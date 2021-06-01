import 'reflect-metadata' // Polyfill required by Typegoose and TypeGraphQL
import Express from 'express'
import Mongoose from 'mongoose'
import Morgan from 'morgan'
import { default as HttpCodes } from 'http-status-codes'
import * as Config from './config'
import { apiRouter } from './routes/api'
import { shutdown, Log } from './utils/debug'
import { makeApolloServer } from './graphql/apollo-server'

async function bootstrap () {
  const apolloServer = await makeApolloServer()
  const app = Express()
        .use(Morgan('dev'))
  apolloServer.applyMiddleware({ app, path: '/graphql' })

  app.use('/api/v1', apiRouter)
     .use(((err, _req, res, _next) => {
       Log.error(err)
       return res
                .status(err.status || HttpCodes.INTERNAL_SERVER_ERROR)
                .json({ err: 'Something went wrong!' })
     }) as Express.ErrorRequestHandler)

  await Mongoose.connect(Config.mongoUrl, {
    useNewUrlParser:  true,
    keepAlive:        true,
    useCreateIndex:   true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000
  })
  app.listen(
        Config.port,
        () => Log.info(`🚀  Server is listening on port ${Config.port}`)
    )

  process.on('SIGINT', () => Mongoose.disconnect().finally(() => process.exit(0)))
}

void bootstrap().catch(err => shutdown(err, 'bootstraping error'))
