const { S3Client } = require('@aws-sdk/client-s3');
const { TextractClient, AnalyzeDocumentCommand, DetectDocumentTextCommand } = require('@aws-sdk/client-textract');
const Analytics = require('../models/Analytics')
const File = require('../models/File')
const { formattedTextFromImage } = require('../ultilis/formattedPrintText');
const FileTextData = require('../models/FileTextData');

const textract = new TextractClient({ region: 'us-east-1' });


exports.upload = async (req, res) => {
   try {
      const { originalname: name, size, key, location: url = '', } = req.file
      const {
         userId = null,
         influencer = null,
         campaign = null,
         followersNumber = null,
         plataform = null,
         format = null,
         type = null
      } = req.query


      // Função para processar o arquivo no Textract
      const analyzeWithTextract = async (bucket, fileName) => {
         const params = {
            Document: {
               S3Object: {
                  Bucket: bucket,
                  Name: fileName,
               },
            },
         };

         // Usar Textract para detectar o texto
         const command = new DetectDocumentTextCommand(params);
         const result = await textract.send(command);
         return result;
      };

      const bucketName = process.env.BUCKET_NAME;
      const fileName = key;

      // Chamar o AWS Textract para analisar o documento
      const textractResult = await analyzeWithTextract(bucketName, fileName);

      // Extrair o texto detectado

      const textractResultBlocks = textractResult.Blocks;
      let extractedText = '';
      textractResultBlocks.forEach(block => {
         if (block.BlockType === 'LINE') {
            extractedText += block.Text + '\n';
         }
      });

      // Usar a função de formatação no texto extraído
      const analyticsDataTranscription = await formattedTextFromImage(extractedText);

      const file = await File.create({
         name,
         size,
         url,
         key,
         userId,
      })

      const updateFiles = []

      if (file?._id) {
         updateFiles.push(file._id)
         await FileTextData.create({
            ...analyticsDataTranscription,
            userId,
            influencer,
            campaign,
            followersNumber,
            plataform,
            format,
            type,
            files: updateFiles
         })
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