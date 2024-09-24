const Analytics = require('../models/Analytics')

class AnalyticsController {

    list = async (req, res) => {
        try {
            const analytics = await Analytics.find().exec()
            res.status(200).json({ success: true, analytics })
        } catch (error) {
            res.status(500).json({ success: false })
        }
    }

    add = async (req, res) => {

        try {
            const { analyticsData, userId } = req.body
            analyticsData.userId = userId
            if (analyticsData._id != undefined) {
                delete analyticsData._id;
            }
            const newAnalytics = await Analytics.create(analyticsData)
            res.status(201).json({ newAnalytics, success: true })

        } catch (error) {
            console.log(error)

            res.status(500).json({ error: error.response, success: false })
        }
    }

    readById = async (req, res) => {
        try {
            const { id } = req.params

            const analytics = await Analytics.findById(id)
            res.status(200).json({ analytics, success: true })
        } catch (error) {
            res.status(200).json({ error, success: false })
        }
    }


    delete = async (req, res) => {
        try {
            const { id } = req.params
            const deleteAnalytics = await Analytics.findByIdAndDelete(id).exec()
            res.status(200).json({ deleteAnalytics, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const { analyticsData } = req.body
            const response = await Analytics.findByIdAndUpdate(id, analyticsData, { new: true, runValidators: true }).exec()
            res.status(200).json({ analytics: response, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }
}

module.exports = new AnalyticsController()