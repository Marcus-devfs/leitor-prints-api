const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
  name: String,
  size: Number,
  key: String,
  alt: String,
  url: String,
  transcription: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
}
});

const File = mongoose.model("File", fileSchema);

module.exports = File;