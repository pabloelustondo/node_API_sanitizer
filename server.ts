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
  const fieldName = 'name';

  if (req.query[fieldName]) {
    const name = req.query[fieldName] as string;
    const trimmedName = name.trim();
    const cleanName = (req as any).sanitize(trimmedName).trim();

    if (name !== cleanName) {
      console.log(`User entered malicious code ${name} and it was sanitized to ${cleanName}`);
      return res.status(422).send(`${ERROR_MESSAGES.INVALID_INPUT} ${fieldName} ${cleanName}`);
    }

    req.query[fieldName] = cleanName;
  }

  next();
};

app.use(sanitizeMiddleware);

app.get('/', (req: Request, res: Response) => {
  const name = req.query.name as string;
  res.send(`Hi, you entered ${name}`);
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});

export default app;
