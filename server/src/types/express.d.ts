// src/types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      session?: {
        userId?: number;
      };
      userId?: number;
    }
  }
}
