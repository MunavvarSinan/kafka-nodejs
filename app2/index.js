import express from 'express'
import { Kafka } from 'kafkajs'
import { connectDb } from './db.js'
import userModel from './model/user.js'

const app = express()
app.use(express.json())

connectDb().then(() => {
    console.log("Database Connected Successfully");
})


const run = async () => {
    const kafka = new Kafka({
        clientId: 'admin-client',
        brokers: ['kafka:9092']
    })

    const consumer = kafka.consumer({ groupId: 'test-group' })
    console.log("Connecting Consumer");
    await consumer.connect().then(() => console.log("Consumer Connected Successfully"));
    console.log("Subscribing Consumer");
    consumer.subscribe({ topic: 'Users', fromBeginning: true }).then(() => console.log("Consumer Subscribed Successfully"));

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const user = JSON.parse(message.value.toString())
            userModel.create(user).then(() => console.log("User Added Successfully"));
        },
    })
}
run().catch(console.error)

app.get('/users', async (req, res) => {
    const users = await userModel.find({})
    res.status(200).json(users)
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('server running on port ' + port)
})