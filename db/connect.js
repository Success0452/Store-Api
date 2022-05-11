const { default: mongoose } = require("mongoose")

const connectDB = async (url) => {
    return new mongoose.connect(url)
}

module.exports = connectDB