import express, { Application } from 'express'
import bodyParser from 'body-parser'
import { TS_CONVERT_PORT } from './config/commonConfig.js'
import { 
  connectToRabbitMQ, 
  createQueue, 
  subscribeToQueue 
} from './services/rabbitmqService.js'
import { CONVERT_QUEUE } from './config/rabbitmqConfig.js'
import { convertQueueCallback } from './services/appService.js'

const app: Application = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(TS_CONVERT_PORT, async () => {
  console.log(`Server is running on port:${TS_CONVERT_PORT}`)
  await connectToRabbitMQ()
  await createQueue(CONVERT_QUEUE, { durable: false })
  await subscribeToQueue(CONVERT_QUEUE, convertQueueCallback)
})

