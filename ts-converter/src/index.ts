
import express, { Request, Response , Application } from 'express';
import bodyParser from 'body-parser';
import { ConvertOptions } from './interfaces/convertOptions';

const app: Application = express();
const port = 3001;

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(port, () => {
  console.log(`TS-CONVERTER at http://localhost:${port}`);
})

app.post('/', async (req: Request, res: Response) => {
  const options: ConvertOptions = req.body  
  res.status(200).json('Response from ts-converter: ' + options.youtubeLink)
})