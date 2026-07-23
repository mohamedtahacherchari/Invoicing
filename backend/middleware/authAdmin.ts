import type { NextFunction, Request, Response } from 'express'

interface AdminUser {
    role?: number
}

type UserLookup = PromiseLike<AdminUser | null>

interface UserModel {
    findOne(filter: { _id: string }): UserLookup
}

type AuthenticatedRequest = Request & {
    user: {
        id: string
    }
}

const Users: UserModel = require('../models/userModel')

const authAdmin = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user!.role !== 1)
            return res.status(500).json({msg: "Admin resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: (err as Error).message})
    }
}

module.exports = authAdmin
