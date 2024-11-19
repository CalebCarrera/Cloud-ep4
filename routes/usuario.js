const express = require('express')
const router = express.Router()
const userController = require('../controller/usercontroller')

router.post('/registro', userController.crearUsuario);

router.post('/login', userController.validarUsuario);


module.exports = router
