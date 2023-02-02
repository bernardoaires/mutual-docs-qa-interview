import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

export const validateJWT: RequestHandler = (req, res, next) => {  
  const token = req.headers.authorization
  if (!token) {
    next()
    return
  }

  try {
    jwt.verify(token, 'grilofeliz')
    next()
  } catch (err) {
    console.log('Error verifying token.')
    next()
  }
}