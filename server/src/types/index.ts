export interface ModifiedRequest extends Express.Request {
  user: { id: number };
}
