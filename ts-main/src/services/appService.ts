import { ConvertOptions } from '../interfaces/convertOptions.js'
import { createQueue, publishToQueue } from '../services/rabbitmqService.js'
import { CONVERT_QUEUE } from '../config/rabbitmqConfig.js'


export const sendLinkToQueue = async (options: ConvertOptions): Promise<boolean> => {
    try {
        return publishToQueue(CONVERT_QUEUE, options.youtubeLink)
    } catch (error) {
        console.log(error.message)
        throw error
    }
}
