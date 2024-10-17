const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({ region: 'us-east-1' });


const deleteObjectFromS3 = async (key) => {
  const deleteParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams));
 } catch (error) {
    console.log('Erro ao excluir objeto:', error);
    throw error;
  }
};

module.exports = { deleteObjectFromS3 };
