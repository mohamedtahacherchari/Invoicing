declare global {
  namespace Express {
    interface AuthenticatedUser {
      id: string;
      _id?: string;
      role?: number;
      [key: string]: unknown;
    }

    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
