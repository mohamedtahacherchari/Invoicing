const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,
            { useUnifiedTopology: true,
               useNewUrlParser: true,
               useCreateIndex: true,})

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        //console.log(error)
        console.error(`Error: ${error.message}`.red.underline.bold)

        process.exit(1)
    }
}

module.exports = connectDB

