const Customer = require('../models/Customer')

class CustomerController {

    list = async (req, res) => {
        try {
            const customers = await Customer.find().exec()
            res.status(200).json({ success: true, customers })
        } catch (error) {
            res.status(500).json({ success: false })
        }
    }

    add = async (req, res) => {

        try {
            const { customerData } = req.body
            const newCustomer = await Customer.create(customerData)
            res.status(201).json({ newCustomer, success: true })

        } catch (error) {
            res.status(500).json({ error: error.response, success: false })
        }
    }

    readById = async (req, res) => {
        try {
            const { id } = req.params

            const customer = await Customer.findById(id)
            res.status(200).json({ customer, success: true })
        } catch (error) {
            res.status(200).json({ error, success: false })
        }
    }


    delete = async (req, res) => {
        try {
            const { id } = req.params
            const deleteCustomer = await Customer.findByIdAndDelete(id).exec()
            res.status(200).json({ deleteCustomer, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const { customerData } = req.body

            const response = await Customer.findByIdAndUpdate(id, customerData, { new: true, runValidators: true }).exec()

            res.status(200).json({ customer: response, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }
}

module.exports = new CustomerController()