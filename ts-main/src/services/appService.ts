import fetch from 'node-fetch'
import { ConvertOptions } from '../interfaces/convertOptions.js';

const tsConverterPort: number = 3001

const sendLinkToQueue = async (options: ConvertOptions): Promise<string> => {

    const response = await fetch(`http://localhost:${tsConverterPort}`, {
        method: 'post',
        body: JSON.stringify(options),
        headers: { 'Content-Type': 'application/json' }
    });

    const resJson: string = await response.json() as string

    return resJson
}

export {
    sendLinkToQueue
}