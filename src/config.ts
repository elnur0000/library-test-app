import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname,'..', '.env') })

export const port: string | undefined = process.env.PORT
export const mongoUrl: string = process.env.MONGO_URL as string
export const mongoTestUrl: string = process.env.MONGO_TEST_URL as string
