const express= require('express')

const router= express.Router();
const { leerPublicaciones, eliminarPost, editarPostForm, editarPosting,  leermispublicaciones, PintoresPost, Perfil, cargarPerfil} = require('../Controllers/homeControllers');
const urlValidator = require('../middleware/UrlValida');
const {VerificarUser} = require('../middleware/VerificarUser');
const { obtenerSugerencias, cargarperfilajeno, cargaBusqueda, addComment, addVenta, getReporteVentas } = require('../Controllers/ProfileControllers');


router.get('/', VerificarUser, leerPublicaciones);
router.post('/', VerificarUser, PintoresPost);
router.get('/eliminar/:id', VerificarUser, eliminarPost);
router.get('/editar/:id', VerificarUser, editarPostForm);
router.post('/editar/:id', VerificarUser, urlValidator, editarPosting);
router.get('/profile', VerificarUser, cargarPerfil);
router.post('/updateProfile', VerificarUser, Perfil);
router.get('/buscarUsuarios', VerificarUser, cargaBusqueda);
router.get('/sugerencias', VerificarUser, obtenerSugerencias); // Nueva ruta para sugerencias
router.get('/:id', VerificarUser, cargarperfilajeno);
router.post('/addComment',VerificarUser,addComment);
router.post('/ventas',VerificarUser,addVenta)
router.post('/reporte-ventas',VerificarUser,getReporteVentas)
module.exports=  router
