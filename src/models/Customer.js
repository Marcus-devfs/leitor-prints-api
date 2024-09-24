const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: "O campo 'nome' é obrigatório"
    },
    company: {
        type: String,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    canal: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    phone: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    revenue: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: new Date(),
        select: false
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;