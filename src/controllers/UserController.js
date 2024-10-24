const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const { trusted } = require('mongoose')
const sgMail = require('@sendgrid/mail')

class UserController {

   list = async (req, res) => {
      try {
         const users = await UserModel.find().exec()
         res.status(200).json({ success: true, users })
      } catch (error) {
         res.status(500).json({ success: false })
      }
   }

   add = async (req, res) => {

      try {
         const { userData } = req.body
         const { email, password = null } = userData

         let senha = password

         if (!senha) {
            const newPassword = this.generateRadomPassword(6)
            senha = newPassword
         }

         const userExists = await UserModel.findOne({ email })

         if (userExists) {
            return res.status(500).json({ msg: 'User exists', success: false })
         }

         const salt = await bcrypt.genSalt(10)
         const passwordHash = await bcrypt.hash(senha, salt)

         const newUser = await UserModel.create({
            ...userData,
            password: passwordHash,
         })

         // let html = `
         // <div style="background-color: #f1f1f1; padding: 30px; position: relative;">
         //    <div style="max-width: 400px; background-color: #fff; padding: 30px; border-radius: 12px; position: absolute; margin: auto; left: 0; right: 0; top: 0; bottom: 0;">
         //       <p style="font-size: 18px; text-align: center;">${newUser?.name},</p>
         //       <p style="font-size: 18px; text-align: center;">Você já pode acessar o painel M&F Admin:</p>
         //       <p style="font-size: 18px;">https://admin-mfplanejados.vercel.app</p>
         //       <p style="font-size: 18px;">Usuário: ${email}</p>
         //       <p style="font-size: 18px;">Senha: ${senha}</p>
         //    </div>
         // </div>`

         // sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

         // const msg = {
         //    to: email,
         //    from: 'edermarce1@yahoo.com.br',
         //    subject: 'M&F - Credenciais de Acesso',
         //    html
         // };

         // sgMail.send(msg, () => console.log({
         //    message: `Credentials sent to ${email}`,
         // }));

         res.status(201).json({ newUser, success: true })

      } catch (error) {
         console.log(error)
         res.status(500).json({ error: error.response, success: false })
      }
   }

   login = async (req, res) => {

      const { email, password } = req.body

      try {
         const user = await UserModel.findOne({ email })
            .select('+password')
            
         if (!user) return res.status(401).json({ msg: 'Invalid Credentials', success: false })

         const result = await bcrypt.compare(password, user.password)

         if (!result) return res.status(401).json({ msg: 'Invalid Credentials', success: false })

         const jwtToken = jwt.sign(
            {
               userId: user._id,
            },
            process.env.NEXT_PUBLIC_JWT_KEY,
         )
         user.token = jwtToken

         return res.status(200).json({ success: true, user })
      } catch (error) {
         console.log(error)
         return res.status(500).json({ msg: 'API error', success: false })
      }
   }

   readById = async (req, res) => {
      try {
         const { id } = req.params

         const user = await UserModel.findById(id)
         res.status(200).json({ user, success: true })
      } catch (error) {
         res.status(200).json({ error, success: false })
      }
   }

   loginByToken = async (req, res) => {
      try {

         const { userId } = req.currentUser
         const user = await UserModel.findOne({ _id: userId })

         if (user) {
            const jwtToken = jwt.sign({ userId: user._id }, process.env.NEXT_PUBLIC_JWT_KEY);
            user.token = jwtToken
            return res.status(200).json({ user, success: true })
         }

         return res.status(500).json({ success: false })
      } catch (error) {
         res.status(500).json({ error: error, success: false })
      }
   }

   delete = async (req, res) => {
      try {
         const { id } = req.params
         const deletedUser = await UserModel.findByIdAndDelete(id).exec()
         res.status(200).json({ deletedUser, success: true })
      } catch (error) {
         res.status(400).json({ error, success: false })
      }
   }

   update = async (req, res) => {
      try {
         const { id } = req.params
         const { userData } = req.body

         if (userData.password && userData.confirmPassword) {
            const newPass = userData.password
            const password = await bcrypt.hash(newPass, 10)
            await UserModel.findByIdAndUpdate(id, { password: password }, { new: true })
         }

         delete userData.password
         delete userData.confirmPassword
         const response = await UserModel.findByIdAndUpdate(id, userData, { new: true, runValidators: true }).exec()
         res.status(200).json({ user: response, success: true })
      } catch (error) {
         res.status(400).json({ error, success: false })
      }
   }

   updatePassword = async (req, res) => {

      const { id } = req.params
      const { userData } = req.body
      const { newPassword } = userData

      try {

         const user = await UserModel.findById(id)
            .select('+password')

         const result = await bcrypt.compare(userData.password, user.password)

         if (!result) return res.status(401).send({ msg: 'Senha atual inválida' })

         const newPass = newPassword
         const password = await bcrypt.hash(newPass, 10)
         const response = await UserModel.findByIdAndUpdate(id, { password: password }, { new: true })

         res.status(201).json({ response, success: true })
      } catch (error) {
         res.status(400).json({ error: error, success: false })
      }
   }

   generateRadomPassword(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
      }
      return result;
   }
}

module.exports = new UserController()