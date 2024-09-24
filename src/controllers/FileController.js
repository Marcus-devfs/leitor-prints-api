const Analytics = require('../models/Analytics')
const File = require('../models/Files')

exports.upload = async (req, res) => {
   const { originalName: name, size, key, location: url = '', } = req.file

   const { analyticsId = null } = req.params

   const file = await File.create({
      name,
      size,
      url,
      key,
      analyticsId,
   })

   const updatedData = { $push: { files: file._id } };

   if (file?._id) {
      if (analyticsId) {
         const updateFile = await Analytics.findByIdAndUpdate(analyticsId, updatedData, { new: true })
         return res.status(201).json({ file, updateFile: updateFile?._id })
      }
      return res.status(201).json({ file, success: true })
   }
   res.status(500).json({ success: false })
}

exports.delete = async (req, res) => {

   const { fileId: _id } = req.params;
   const { analyticsId = null } = req.query;

   try {
      const response = await File.findByIdAndDelete(_id)
      if (analyticsId) {
         const updateAnalyticsFiles = await Analytics.findByIdAndUpdate(analyticsId, { $pull: { files: _id } }, { new: true })
      }
      res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}

exports.getAllFilesWeb = async (req, res) => {
   try {
      const response = await File.find()
      return res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}