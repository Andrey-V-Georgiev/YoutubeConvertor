
import express, { Request, Response, Application } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { ConvertOptions } from './interfaces/convertOptions.js';
import { sendLinkToQueue } from './services/appService.js'
import { connectToRabbitMQ, createQueue } from './services/rabbitmqService.js'
import { TS_MAIN_PORT } from './config/commonConfig.js'
import { CONVERT_QUEUE } from './config/rabbitmqConfig.js';

const app: Application = express();

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(TS_MAIN_PORT, async () => {
  console.log(`Server is running on port:${TS_MAIN_PORT}`)
  await connectToRabbitMQ()
  await createQueue(CONVERT_QUEUE, { durable: false })
})

app.post('/', async (req: Request, res: Response) => {
  const options: ConvertOptions = req.body
  const result: boolean = await sendLinkToQueue(options)

  res.status(200).json('Response from ts-main: ' + result)
})

