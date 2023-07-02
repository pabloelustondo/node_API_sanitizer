import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import expressSanitizer from 'express-sanitizer';
import sanitizeMiddleware from './sanitizeMiddleware';

const app = express();
const httpServer = createServer(app);

app.use(expressSanitizer());
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
