const express= require('express');
const{body}=require('express-validator')
const { loginForm, registerForm, registerUser,confirmarCuenta,loginUser, cerrarsesion } = require('../Controllers/authControllers');
const { leermispublicaciones } = require('../Controllers/homeControllers');
const { cargaBusqueda, cargarperfilajeno, obtenerSugerencias, alertamasaya } = require('../Controllers/ProfileControllers');
const router= express.Router();

router.get('/login',loginForm)
router.post('/login',[ body("email","ingrese un email valido").trim().isEmail().normalizeEmail().escape(), 
    body("password", "Minimo 6 caracteres para la contraseña").trim().isLength({min:6}).escape()],loginUser)


    router.post('/register',[body("userName","ingrese un nombre valido").trim().notEmpty().escape(),
    body("email","ingrese un email valido").trim().isEmail().normalizeEmail().escape(),
        body("password", "Minimo 6 caracteres para la contraseña").trim().isLength({min:6}).notEmpty().escape().custom((value,{req})=>{
        if(value !== req.body.repassword)
        {
            throw new Error("las contraseñas no coinciden");
        }
        else{
            return value;
        }
       
        })],registerUser)
router.get('/register',registerForm)
router.get('/Confirmar/:token',confirmarCuenta)
router.get('/logout',cerrarsesion)
router.get('/profile',leermispublicaciones)




module.exports= router