export const RABBITMQ_HOST = 'localhost'
export const RABBITMQ_PORT = '5672'
export const RABBITMQ_USERNAME = 'admin'
export const RABBITMQ_PASSWORD = 'asd'
export const RABBITMQ_VHOST = 'ytc'

export const RABBITMQ_URL= `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}/${RABBITMQ_VHOST}`

export const CONVERT_QUEUE = 'convert-queue'
