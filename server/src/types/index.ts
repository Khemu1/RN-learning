export interface ModifiedRequest extends Express.Request {
  session?: {
    userId?: number;
  };
  userId: number;
}
