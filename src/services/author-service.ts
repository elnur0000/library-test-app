import { AuthorModel, Author } from '../models/author'
import { ObjectId } from 'mongodb'

class AuthorService {

  getAll () {
    return AuthorModel.find()
  }

  getById (id: ObjectId) {
    return AuthorModel.findById(id)
  }

  create (author: Omit<Author, '_id'>) {
    const newAuthor = new AuthorModel(author)
    return AuthorModel.create(newAuthor)
  }
}

export default new AuthorService()
