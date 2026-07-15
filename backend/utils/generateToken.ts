import type { Types } from 'mongoose'

type UserId = string | number | Types.ObjectId

interface JwtSigner {
  sign(
    payload: { id: UserId },
    secret: string | undefined,
    options: { expiresIn: '30d' },
  ): string
}

const jwt: JwtSigner = require('jsonwebtoken')

const generateToken = (id: UserId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = generateToken
