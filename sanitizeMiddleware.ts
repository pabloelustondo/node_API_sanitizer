import { Request, Response, NextFunction } from 'express';

const ERROR_MESSAGES = {
  INVALID_INPUT: 'Invalid input'
};

const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const queryParams = req.query;

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      const value = queryParams[key] as string;
      const trimmedValue = value.trim();
      const cleanValue = (req as any).sanitize(trimmedValue).trim();

      if (value !== cleanValue) {
        console.log(`User entered malicious code ${value} for field ${key} and it was sanitized to ${cleanValue}`);
        return res.status(422).send(`${ERROR_MESSAGES.INVALID_INPUT} ${key} ${cleanValue}`);
      }

      queryParams[key] = cleanValue;
    }
  }

  next();
};

export default sanitizeMiddleware;
