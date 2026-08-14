import type {
    NextFunction,
    Request,
    Response,
} from 'express'
import type { TokenPayload } from 'google-auth-library'

interface DecodedJwt {
    [key: string]: unknown
}

type JwtUser = string | DecodedJwt

type JwtVerifyCallback = (
    err: Error | null,
    user?: JwtUser,
) => Response | void

interface JwtVerifier {
    verify(
        token: string,
        secret: string | undefined,
        callback: JwtVerifyCallback,
    ): void
}

type GooglePayload = TokenPayload & {
    role?: unknown
}

interface GoogleRequestUser {
    id: string
    name?: string
    photoURL?: string
    role?: unknown
}

type LocalRequestUser = GoogleRequestUser | JwtUser

type AuthRequest = Omit<Request, 'user'> & {
    user?: LocalRequestUser
}

const {
    OAuth2Client,
}: typeof import('google-auth-library') = require('google-auth-library');
const jwt: JwtVerifier = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const auth = async(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): Promise<Response | void> => {
    try {

        const token = req.header("Authorization") as string
        const googleToken = token.length > 1000;

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        if(googleToken){

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload() as GooglePayload;

            req.user = {
                id: payload.sub,
                name: payload.name,
                photoURL: payload.picture,
                role : payload.role,
            };
        }else{
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Invalid Authentication."})

                req.user = user

                next()
            })

        }



    } catch (err) {
        return res.status(500).json({msg: (err as Error).message})
    }
}

module.exports = auth
