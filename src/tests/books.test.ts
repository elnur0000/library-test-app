import { BookModel } from '../models/book'
import faker from 'faker'

import { testConn } from './test-utils/testConn'
import { Mongoose } from 'mongoose'
import { gCall } from './test-utils/gCall'

let conn: Mongoose
beforeAll(async () => {
  conn = await testConn()
})
afterAll(async () => {
  await conn.disconnect()
})

beforeEach(async () => {
  await BookModel.deleteMany()
})

const bookQuery = `
 {
  books {
    title,
    price
  }
}
`

describe('Book', () => {
  it('get book', async () => {
    const book = await BookModel.create({
      title: faker.commerce.productName(),
      price: faker.commerce.price()
    })

    const response = await gCall({
      source: bookQuery
    })

    expect(response).toMatchObject({
      data: {
        books: [
          { price: book.price, title: book.title }
        ]
      }
    })
  })

  it('return nothing', async () => {
    const response = await gCall({
      source: bookQuery
    })

    expect(response).toMatchObject({
      data: {
        books: []
      }
    })
  })
})
