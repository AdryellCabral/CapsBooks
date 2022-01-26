declare namespace Express {
    export interface Request {
      user: {
        id: string;
      };
      validation: {
        password:string
      }

    }
  }