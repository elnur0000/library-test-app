import Mongoose from 'mongoose'
import * as Config from '../../config'

export const testConn = () => {
  return Mongoose.connect(Config.mongoTestUrl, {
    useNewUrlParser:  true,
    keepAlive:        true,
    useCreateIndex:   true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000
  })
}
