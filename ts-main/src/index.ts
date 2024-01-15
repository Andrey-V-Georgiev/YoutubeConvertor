
import express, { Request, Response, Application } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { ConvertOptions } from './interfaces/convertOptions.js';
import { sendLinkToQueue } from './services/appService.js' 

const app: Application = express();
const port = 3000;

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(port, () => {
  console.log(`TS-MAIN at http://localhost:${port}`);
})

app.post('/', async (req: Request, res: Response) => {
  console.log('TS-MAIN POST ')
  const options: ConvertOptions = req.body
  const result: string = await sendLinkToQueue(options)

  res.status(200).json('Response from ts-main: ' + result)
})
 
