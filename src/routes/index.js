const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const FileController = require('../controllers/FileController')
const { checkAuth } = require('../helpers/auth/checkAuth')
const multer = require('multer')
const multerConfig = require('../config/multer')
const CustomerController = require('../controllers/CustomerController')

//User Routes
routes.get('/', async (req, res) => {
    return res.status(200).json({ msg: 'Public Route' })
})
routes.post('/user/login', UserController.login)
routes.get('/user/list', UserController.list)
routes.post('/user/create', UserController.add)
// routes.get('/user/:id', checkAuth, UserController.readById)
routes.get('/user/:id', UserController.readById)
routes.post('/user/loginbytoken', checkAuth, UserController.loginByToken)
routes.delete('/user/delete/:id', UserController.delete)
routes.patch('/user/update/:id', UserController.update)
routes.patch('/user/password/:id', checkAuth, UserController.updatePassword)


//Customer
routes.get('/customer/list', CustomerController.list)
routes.get('/customer/list/filter', CustomerController.listFiltered)
routes.post('/customer/create', CustomerController.add)
routes.get('/customer/:id', CustomerController.readById)
routes.delete('/customer/delete/:id', CustomerController.delete)
routes.patch('/customer/update/:id', CustomerController.update)



// //File Routes
routes.get('/filesweb', FileController.getAllFilesWeb)
routes.post('/file/upload/', multer(multerConfig).single('file'), FileController.upload)
routes.delete('/upload/:fileId', FileController.delete)

module.exports = routes 
