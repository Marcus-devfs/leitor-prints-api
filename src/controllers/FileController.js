const { TextractClient, DetectDocumentTextCommand } = require('@aws-sdk/client-textract');
const Analytics = require('../models/Analytics')
const File = require('../models/File')
const { formattedTextFromImage } = require('../ultilis/formattedPrintText');
const FileTextData = require('../models/FileTextData');
const { deleteObjectFromS3 } = require('../config/s3');

const textract = new TextractClient({ region: 'us-east-1' });

exports.upload = async (req, res) => {
   try {
      const { originalname: name, size, key, location: url = '' } = req.file
      const {
         userId = null,
         influencer = null,
         campaign = null,
         followersNumber = null,
         marca_cliente = null,
         plataform = null,
         format = null,
         type = null,
         groupKey = null
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
         if (block.BlockType === 'LINE' && block.Text) {
            extractedText += block.Text + '\n';
         }
      });


      // Usar a função de formatação no texto extraído
      const analyticsDataTranscription = await formattedTextFromImage(extractedText, plataform);

      const file = await File.create({
         name,
         size,
         url,
         key,
         userId,
      })

      const updateFiles = []

      if (!file?._id) return res.status(200).json({ msg: 'Não foi possível fazer upload do arquivo.', success: false })

      if (groupKey) {

         const fileTextData = await FileTextData.findOne({ groupKey })

         if (fileTextData) {
            let updatedFields = {};

            // Percorre os dados da transcrição e soma os valores
            for (const fileKey in analyticsDataTranscription) {
               if (analyticsDataTranscription[fileKey]) {
                  const dbValue = fileTextData[fileKey];
                  const newValue = analyticsDataTranscription[fileKey];
      
                  // Se o valor da transcrição for numérico, soma ao valor existente (ou usa 0 se não houver valor)
                  if (typeof newValue === 'number') {
                     updatedFields[fileKey] = (typeof dbValue === 'number' ? dbValue : 0) + newValue;
      
                  // Se o valor for uma string e não houver valor existente no banco ou o valor existente for null, atualiza
                  } else if (typeof newValue === 'string' && (!dbValue || dbValue === null)) {
                     updatedFields[fileKey] = newValue;
      
                  // Se for string e já houver valor, mantém o valor existente no banco
                  } else if (typeof newValue === 'string' && typeof dbValue === 'string') {
                     updatedFields[fileKey] = dbValue; // Mantém o valor existente no banco
                  }
               }
            }

            // Atualiza o objeto usando $set e $push separadamente
            await FileTextData.findByIdAndUpdate(fileTextData._id, { $set: updatedFields }, { new: true });
            await FileTextData.findByIdAndUpdate(fileTextData._id, { $push: { files: file?._id } });

            return res.status(201).json({ textDataId: fileTextData._id, success: true });
         } else {
            updateFiles.push(file._id)
            const fileTextData = await FileTextData.create({
               ...analyticsDataTranscription,
               userId,
               influencer,
               campaign,
               followersNumber,
               plataform,
               format,
               type,
               groupKey,
               marca_cliente,
               files: updateFiles
            })

            return res.status(201).json({ textDataId: fileTextData._id, success: true });
         }

      } else {
         updateFiles.push(file._id)
         const fileTextData = await FileTextData.create({
            ...analyticsDataTranscription,
            userId,
            influencer,
            campaign,
            followersNumber,
            plataform,
            format,
            type,
            groupKey,
            marca_cliente,
            files: updateFiles
         })
         return res.status(201).json({ textDataId: fileTextData._id, success: true });
      }

   } catch (error) {
      console.log(error)
      res.status(500).json({ error, success: false })
   }
}


exports.uploadAndProcessText = async (req, res) => {
   try {
      const { key } = req.file


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
      let extractedFormattedText = '';
      textractResultBlocks.forEach(block => {
         if (block.BlockType === 'LINE') {
            extractedFormattedText += block.Text + '\n';
         }
      });

      await deleteObjectFromS3(key)

      return res.status(201).json({ extractedFormattedText, success: true })
   } catch (error) {
      console.log(error)
      res.status(500).json({ error, success: false })
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