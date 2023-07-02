//Write simple node.js express server using type script
//Run the server using ts-node server.ts
//Open browser and hit http://localhost:3000/?name=yourname

import express from "express";
import { Request, Response } from "express";
import { createServer } from "http";
import expressSanitizer from "express-sanitizer";
// Notice: The primary dependency for this library hasn't been updated in 5 years. Security vulnerabilities may exist in this library.

const ERROR_MESSAGES = {
  INVALID_INPUT: "Invalid input"
};

const app = express();
const httpServer = createServer(app);
app.use(expressSanitizer());

app.get("/", (req: Request, res: Response) => {

  const fieldName = "name"
  const name = req.query[fieldName] as string;
  const trimmedName = name.trim();
  const cleanName = (req as any).sanitize(trimmedName).trim(); // type definition for sanitize is missing

  if (name !== cleanName) {
    //  Input "sanitization" (invalid input, code injection attack):422 Unprocessable Entity

    console.log(
      `User entered malicious code ${name} and it was sanitized to ${cleanName}`
    );
    res.status(422).send(`${ERROR_MESSAGES.INVALID_INPUT} ${fieldName} ${cleanName}`);

  } else { 
    res.send(`Hi, you entered ${cleanName}`);
  }


});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});

//export the app as default export
export default app;
