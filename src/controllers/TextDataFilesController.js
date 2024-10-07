const FileTextData = require('../models/FileTextData')

class TextDataFilesController {

    list = async (req, res) => {
        try {
            const filesData = await FileTextData.find()
            res.status(200).json({ success: true, filesData })
        } catch (error) {
            res.status(500).json({ success: false })
        }
    }

    readById = async (req, res) => {
        try {
            const { id } = req.params

            const filesData = await FileTextData.findById(id).populate({
                path: 'files',
                model: 'File'
            })
            res.status(200).json({ filesData, success: true })
        } catch (error) {
            console.log(error)
            res.status(200).json({ error, success: false })
        }
    }


    delete = async (req, res) => {
        try {
            const { id } = req.params
            const deleteFilesData = await FileTextData.findByIdAndDelete(id).exec()
            res.status(200).json({ deleteFilesData, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const { filesData } = req.body
            const response = await FileTextData.findByIdAndUpdate(id, filesData, { new: true, runValidators: true }).exec()
            res.status(200).json({ filesData: response, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }
}

module.exports = new TextDataFilesController()