const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const FileController = require('../controllers/FileController')
const { checkAuth } = require('../helpers/auth/checkAuth')
const multer = require('multer')
const multerConfig = require('../config/multer')
const CustomerController = require('../controllers/CustomerController')
const AnalyticsController = require('../controllers/AnalyticsController')
const TextDataFilesController = require('../controllers/TextDataFilesController')
const ReportsController = require('../controllers/ReportsController')

//User Routes
routes.get('/', async (req, res) => {
    return res.status(200).json({ msg: 'Public Route' })
})
routes.post('/user/login', UserController.login)
routes.get('/user/list', UserController.list)
routes.post('/user/create', UserController.add)
routes.get('/user/:id', checkAuth, UserController.readById)
routes.post('/user/loginbytoken', checkAuth, UserController.loginByToken)
routes.delete('/user/delete/:id', checkAuth, UserController.delete)
routes.patch('/user/update/:id', checkAuth, UserController.update)
routes.patch('/user/password/:id', checkAuth, UserController.updatePassword)


//Customer
routes.get('/customer/list', checkAuth, CustomerController.list)
routes.get('/customer/list/filter', checkAuth, CustomerController.listFiltered)
routes.post('/customer/create', checkAuth, CustomerController.add)
routes.get('/customer/:id', checkAuth, CustomerController.readById)
routes.delete('/customer/delete/:id', checkAuth, CustomerController.delete)
routes.patch('/customer/update/:id', checkAuth, CustomerController.update)


//Analytics
routes.get('/analytics/list', checkAuth, AnalyticsController.list)
routes.post('/analytics/create', checkAuth, AnalyticsController.add)
routes.get('/analytics/:id', checkAuth, AnalyticsController.readById)
routes.delete('/analytics/delete/:id', checkAuth, AnalyticsController.delete)
routes.patch('/analytics/update/:id', checkAuth, AnalyticsController.update)


//TextDataFiles
routes.get('/filesData/list', checkAuth, TextDataFilesController.list)
routes.get('/filesData/:id', checkAuth, TextDataFilesController.readById)
routes.delete('/filesData/delete/:id', checkAuth, TextDataFilesController.delete)
routes.patch('/filesData/update/:id', checkAuth, TextDataFilesController.update)
routes.post('/filesData/send-planilha-email', checkAuth, TextDataFilesController.sendTextDataInPlanilha)



//Reports
routes.get('/report/dashboard', checkAuth, ReportsController.reportDashboard)



// //File Routes
routes.post('/file/upload', multer(multerConfig).single('file'), FileController.upload)
routes.post('/file/upload-and-process-text', multer(multerConfig).single('file'), FileController.uploadAndProcessText)
routes.delete('/upload/:fileId', checkAuth, FileController.delete)



module.exports = routes 
