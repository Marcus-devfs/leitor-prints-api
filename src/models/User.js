const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
   name: {
      type: String,
      required: "O campo 'nome' é obrigatório"
   },
   email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true
   },
   phone: {
      type: String,
      trim: true,
      lowercase: true,
      unique: false
   },
   permissions: {
      type: [String],
      enum: ['client', 'admin'],
      default: 'client',
      required: false
   },
   password: {
      type: String,
      select: false,
      required: false,
      default: null
   },
   createdAt: {
      type: Date,
      default: new Date(),
      select: false
   },
   token: {
      type: 'String',
   },
});

const User = mongoose.model("User", userSchema);

module.exports = User;