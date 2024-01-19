import { Kafka } from 'kafkajs'

export const run = async () => {
    try {
        const kafka = new Kafka({
            clientId: 'admin-client',
            brokers: ['kafka:9092']
        })
        const admin = kafka.admin()
        console.log('Connecting...')
        await admin.connect().then(() => console.log('Admin connected'))
        console.log('Creating topic...')
        // A-M in one partition, N-Z in another
        await admin.createTopics({
            topics: [{
                topic: 'Users',
                numPartitions: 2
            }]
        }).then(() => console.log('Topic created'))
        await admin.disconnect()
    } catch (e) {
        console.log(e)
    } finally {
        process.exit(0)
    }
}

