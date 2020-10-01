declare namespace Express {
  export interface Request {
    body: {
      name?: string;
      about?: string;
      whyU?: string;
      date?: string;
      idea?: string;
      story?: string;
      action?: string;
      old?: number;
      know?: string;
      experience?: string;
      experienceSup?: string;
      hoursPerDay?: number;
      dc?: string;
      hex?: string;
    };
  }
}
