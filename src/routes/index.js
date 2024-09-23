const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const FileController = require('../controllers/FileController')
const { checkAuth } = require('../helpers/auth/checkAuth')
const multer = require('multer')
const multerConfig = require('../config/multer')

//User Routes
routes.get('/', async (req, res) => {
    return res.status(200).json({ msg: 'Public Route' })
})
routes.post('/user/login', UserController.login)
routes.get('/user/list', checkAuth, UserController.list)
routes.post('/user', checkAuth, UserController.add)
routes.get('/user/:id', checkAuth, UserController.readById)
routes.post('/user/loginbytoken', checkAuth, UserController.loginByToken)
routes.delete('/user/:id', checkAuth, UserController.delete)
routes.patch('/user/:id', checkAuth, UserController.update)
routes.patch('/user/password/:id', checkAuth, UserController.updatePassword)

// //File Routes
routes.get('/filesweb', FileController.getAllFilesWeb)
routes.post('/upload/:categoryId/:namePerfil/:level/:section', multer(multerConfig).single('file'), FileController.upload)
routes.delete('/upload/:fileId', FileController.delete)

module.exports = routes 
