import {
  NotFoundError
} from '../utils/errors'
import { BookModel, Book } from '../models/book'
import { ObjectId } from 'mongodb'

class BookService {

  getAll () {
    return BookModel.find().populate('author').exec()
  }

  getById (id: ObjectId) {
    return BookModel.findById(id).populate('author').exec()
  }

  async deleteById (id: ObjectId) {
    const book = await BookModel.findById(id).exec()
    if (!book) {
      throw new NotFoundError('Book not found')
    }
    return book.remove()
  }
  async updateById (id: ObjectId, book: Omit<Book, '_id'>) {
    const updatedBook = await BookModel
            .findByIdAndUpdate(id, book, { new: true, useFindAndModify: false })
            .lean()
            .populate('author')
            .exec()
    if (!updatedBook) {
      throw new NotFoundError('Book not found')
    }
    return updatedBook
  }

  async create (book: Omit<Book, '_id'>) {
    const newBook = new BookModel(book)
    return (await BookModel.create(newBook)).populate('author').execPopulate()
  }

  deleteAll () {
    return BookModel.deleteMany().exec()
  }

}

export default new BookService()
