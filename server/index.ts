import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3001;

app.get('/', (req: Request, res: Response) => {
    res.send('hi!')
})

app.listen(port, () => console.log('[server]: Server is running. Good!'))