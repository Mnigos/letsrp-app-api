declare namespace Express {
  export interface Request {
    body: {
      name?: string;
      about?: string;
      owner?: string;
      members?: string;
      type?: string;
      headquarters?: string;
      expects?: string;
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
