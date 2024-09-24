const mongoose = require("mongoose");
const { Schema } = mongoose;

const analyticsSchema = new Schema({
    name: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        select: false
    },
    files:
        [{
            type: mongoose.Schema.ObjectId,
            ref: "File",
            default: null,
        }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;

