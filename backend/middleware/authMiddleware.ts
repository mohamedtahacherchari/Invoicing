import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

interface DecodedJwt {
  id?: string;
  [key: string]: unknown;
}

type JwtCallbackUser = string | DecodedJwt;

type JwtVerifyCallback = (
  err: Error | null,
  user?: JwtCallbackUser,
) => Response | void;

interface JwtVerifier {
  verify(token: string, secret: string | undefined): JwtCallbackUser;
  verify(
    token: string,
    secret: string | undefined,
    callback: JwtVerifyCallback,
  ): void;
}

interface SelectedUserDocument {
  readonly [key: string]: unknown;
}

interface UserSelectionQuery
  extends PromiseLike<SelectedUserDocument | null> {
  select(fields: "-password"): UserSelectionQuery;
}

interface UserModel {
  findById(id: string | undefined): UserSelectionQuery;
}

type LocalRequestUser =
  | JwtCallbackUser
  | SelectedUserDocument
  | null;

type AuthRequest = Omit<Request, "user"> & {
  user?: LocalRequestUser;
};

type LocalAsyncHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<Response | void>;

type AsyncHandler = (handler: LocalAsyncHandler) => RequestHandler;

const jwt: JwtVerifier = require("jsonwebtoken");
//const users = require("../models/userModel.js");
const asyncHandler: AsyncHandler = require("express-async-handler");
const Users: UserModel = require("../models/userModel.js");

const protect = asyncHandler(async (
  req,
  res,
  next,
): Promise<Response | void> => {
    try {
      const token = req.header("Authorization") as string
        const googleToken = token.length > 1000

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})
     if(googleToken){const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
     ) as DecodedJwt

      req.user = await Users.findById(decoded.id).select("-password");}

      else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user

        })
    }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }


)

module.exports = { protect };
