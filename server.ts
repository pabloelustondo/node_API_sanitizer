import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import expressSanitizer from 'express-sanitizer';

const ERROR_MESSAGES = {
  INVALID_INPUT: 'Invalid input'
};

const app = express();
const httpServer = createServer(app);

app.use(expressSanitizer());

// Custom middleware for sanitizing the "name" field
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


app.use(sanitizeMiddleware);

app.get('/', (req: Request, res: Response) => {
  const queryParams = req.query;
  const queryKeys = Object.keys(queryParams);

  if (queryKeys.length === 0) {
    res.send('No query parameters found');
  } else {
    const queryValues = queryKeys.map((key) => `${key}: ${queryParams[key]}`);
    res.send(`Query parameters sent: ${queryValues.join(', ')}`);
  }
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});

export default app;
