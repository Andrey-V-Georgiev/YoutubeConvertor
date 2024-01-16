import amqp, { Channel } from 'amqplib'
import { Replies } from 'amqplib/properties.js'
import {
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    RABBITMQ_URL,
    RABBITMQ_VHOST
} from "../config/rabbitmqConfig.js"

let channel: Channel

export const connectToRabbitMQ = async (): Promise<void> => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL)
        channel = await connection.createChannel()
        console.log(
            `Connected to RabbitMQ at "${RABBITMQ_HOST}:${RABBITMQ_PORT}/${RABBITMQ_VHOST}"`)
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const createQueue = async (queueName, options): Promise<Replies.AssertQueue> => {
    return channel.assertQueue(queueName, options)
}

export const publishToQueue = (queueName, message): boolean => {
    console.log(`send message to ${queueName} in ${RABBITMQ_VHOST}`)
    return channel.sendToQueue(queueName, Buffer.from(message))
}

export const subscribeToQueue = async (queueName, callback): Promise<Replies.Consume> => {
    return channel.consume(queueName, msg => {
        const message = msg.content.toString()
        callback(message)
        channel.ack(msg)
    })
}

export const close = async (): Promise<void> => {
    return channel.close()
}
