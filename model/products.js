const { default: mongoose } = require("mongoose");

const productShema = new mongoose.Schema({
    featured : {
        type: Boolean,
        default: false
    },
    rating : {
        type: Number,
        default: 4.5
    },
    createdAt : {
        type: Date,
        default: Date.now(),
    },
    name: {
        type: String,
        required: [true, 'product name is required'],
        maxlength: [20, 'no more than 20 characters'],
        trim: true,
    },
    price : {
        type: Number,
        required: [true, 'product name is required'],
        trim: true,
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        },
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
        trim: true,
    } 
})

module.exports = mongoose.model("Products", productShema);
