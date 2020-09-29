declare namespace Express {
  export interface Request {
    body: {
      name?: string;
      date?: string;
      idea?: string;
      story?: string;
      action?: string;
      old?: number;
      know?: string;
      experience?: string;
      dc?: string;
      hex?: string;
    };
  }
}
