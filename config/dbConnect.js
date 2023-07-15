const mongoose = require("mongoose")

const dbConnect = () => {
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDB")
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error)
        })
}

// Call the dbConnect function to initiate the connection

module.exports = { dbConnect }

// Call the dbConnect function to initiate the connection
