const VerificarUser = (req, res, next) => {
    if (req.isAuthenticated()) { // O cualquier lógica que uses para verificar la autenticación
        return next();
    }
    req.flash('mensajes', [{ msg: 'Debes iniciar sesión primero' }]);
    return res.redirect('/auth/login'); // Redirigir a la página de login si no está autenticado
};

module.exports={
    VerificarUser,
}