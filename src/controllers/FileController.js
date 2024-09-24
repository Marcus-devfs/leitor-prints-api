const Analytics = require('../models/Analytics')
const File = require('../models/Files')
const { createWorker } = require('tesseract.js');
const { formattedTextFromImage } = require('../ultilis/formattedPrintText');


exports.upload = async (req, res) => {
   try {
      const { originalName: name, size, key, location: url = '', } = req.file
      const { analyticsId = null } = req.query


      // Criação do worker
      const worker = await createWorker();

      // Aguarde a inicialização do worker
      await worker.load();
      await worker.loadLanguage('pt');
      await worker.initialize('pt');

      // Use o URL do arquivo armazenado no S3
      const { data: { text } } = await worker.recognize(url);
      // const analyticsDataTranscription = await formattedTextFromImage(text)

      const file = await File.create({
         name,
         size,
         url,
         key,
         analyticsId,
         transcription: text
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
   } catch (error) {
      console.log(error)
      res.status(500).json(error)
   }
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