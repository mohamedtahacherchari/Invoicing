declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "development" | "test" | "production";
      PORT?: string;
      MONGODB_URL?: string;
      SESSION_SECRET?: string;
      ACCESS_TOKEN_SECRET?: string;
      REFRESH_TOKEN_SECRET?: string;
      ACTIVATION_TOKEN_SECRET?: string;
      JWT_SECRET?: string;
      GOOGLE_CLIENT_ID?: string;
      CLIENT_URL?: string;
    }
  }
}

export {};
