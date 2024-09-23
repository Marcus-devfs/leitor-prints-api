const File = require('../models/Files')

exports.upload = async (req, res) => {
   const { originalName: name, size, key, location: url = '', } = req.file

   const { categoryId = null, section = null, namePerfil = null, level = null } = req.params

   const file = await File.create({
      name,
      size,
      url,
      key,
      section,
      namePerfil,
      level
   })

   if (file?._id) {
      return res.status(201).json({ file })
   }
   res.status(500).json({})
}

exports.delete = async (req, res) => {

   const { fileId: _id } = req.params;
   const { categoryId = null } = req.query;

   try {
      const response = await File.findByIdAndDelete(_id)
      res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}

exports.getAllFilesWeb = async (req, res) => {
   try {
      const response = await File.find()
      console.log(response)
      return res.status(200).json(response)
   } catch (error) {
      res.status(500).json(error)
   }
}