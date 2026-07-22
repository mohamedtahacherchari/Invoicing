import type {} from 'colors'

const mongoose: typeof import('mongoose') = require('mongoose')

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL as string,
            { useUnifiedTopology: true,
               useNewUrlParser: true,
               useCreateIndex: true,})

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        //console.log(error)
        console.error(`Error: ${(error as Error).message}`.red.underline.bold)

        process.exit(1)
    }
}

module.exports = connectDB
