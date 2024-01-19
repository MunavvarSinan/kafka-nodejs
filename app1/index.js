import express from 'express'
import { Kafka } from 'kafkajs'
import { PrismaClient } from '@prisma/client'
import { run } from './topic.js';

const app = express()
console.log("Connecting to DB");
const db = new PrismaClient()
console.log("DB Connected Successfully");

app.use(express.json())
// run().catch(console.error).finally(() => process.exit(0))

app.post('/test', async (req, res) => {
    try {
        console.log("Connecting Producer");
        const kafka = new Kafka({
            clientId: 'admin-client',
            brokers: ['kafka:9092']
        })
        const producer = kafka.producer()
        console.log("Connecting Producer");
        await producer.connect();
        console.log("Producer Connected Successfully");
        const result = await producer.send({
            topic: "Users",
            messages: [
                {
                    partition: 1,
                    value: JSON.stringify({ name: 'sinan' }),
                },
                {
                    partition: 0,
                    value: JSON.stringify({ name: 'Munavvar' }),
                }
            ]
        })
        console.log(result)
        await producer.disconnect();
        res.status(200).json({ success: true })
    } catch (e) {
        console.log(e)
    }
})




const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})