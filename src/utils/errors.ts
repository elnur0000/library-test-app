import { ApolloError } from 'apollo-server-express'

export class AuthenticationError extends ApolloError {
  constructor (message?: string) {
    super(message || 'Nothing was found', 'UNAUTHENTICATED')

    Object.defineProperty(this, 'name', {})
  }
}

export class ForbiddenError extends ApolloError {
  constructor (message?: string) {
    super(message || 'Insufficient access level', 'FORBIDDEN')

    Object.defineProperty(this, 'name', {})
  }
}

export class BadRequestError extends ApolloError {
  constructor (message?: string) {
    super(message || 'Bad request', 'BAD_REQUEST')

    Object.defineProperty(this, 'name', {})
  }
}

export class NotFoundError extends ApolloError {
  constructor (message?: string) {
    super(message || 'Not found', 'NOT_FOUND')

    Object.defineProperty(this, 'name', {})
  }
}
