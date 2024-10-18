const xidJs = require('xid-js');
const User = require('../models/users');
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

// Mostrar el formulario de login
const loginForm = (req, res) => {
    const successMessage = req.flash('success')[0] || '';
    const errorMessage = req.flash('error')[0] || '';
    res.render('login', { successMessage, errorMessage });
};

// Registro de usuario
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array().map(err => err.msg).join(', ')); // Agrupar errores
        return res.redirect("/auth/register");
    }

    const { userName, email, Telefono, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) throw new Error("Usuario ya existente 😒🤷‍♀️");

        user = new User({ 
            userName, 
            email, 
            password, 
            telefono: Telefono, 
            tokenConfirm: xidJs.next() 
        });
        await user.save();

        // Configuración del correo
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Enviar correo de confirmación
        await transport.sendMail({
            from: `"Maddison Foo Koch 👻" <${process.env.EMAIL_USER||""}>`,
            to: user.email,
            subject: "Verifica tu cuenta ✔",
            html: `<a href="${process.env.PATHHEROKU ||"http://localhost:5001"}/auth/Confirmar/${user.tokenConfirm}">Verifica tu correo aquí</a>`,
        });

        req.flash('success', "Revisa tu correo electrónico para confirmar tu cuenta.");
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect("/auth/register");
    }
};

// Confirmación de la cuenta
const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ tokenConfirm: token });
        if (!user) throw new Error("Usuario no encontrado 😒🤷‍♀️");

        user.cuentaConfirmada = true;
        user.tokenConfirm = null;
        await user.save();

        req.flash('success', "Cuenta verificada con éxito. ¡Adelante!");
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect("/auth/login");
    }
};

// Mostrar el formulario de registro
const registerForm = (req, res) => {
    const successMessage = req.flash('success')[0] || '';
    const errorMessage = req.flash('error')[0] || '';
    res.render('register', { successMessage, errorMessage });
};

// Manejar el login del usuario
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('error', errors.array().map(err => err.msg).join(', ')); // Agrupar errores
        return res.redirect("/auth/login");
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('No existe este email');
        if (!user.cuentaConfirmada) throw new Error("Falta confirmar la cuenta");
        if (!(await user.comparePassword(password))) throw new Error('Contraseña incorrecta');

        req.login(user, function (err) {
            if (err) throw new Error("Error al crear la sesión");
            req.flash('success', 'Inicio de sesión exitoso');
            return res.redirect('/'); // Redirige a la ruta de alertas
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect("/auth/login");
    }
};

// Cerrar sesión del usuario
const cerrarsesion = (req, res) => {
    req.logout(function (err) {
        if (err) {
            req.flash('error', "Error al cerrar sesión");
            return res.redirect('/auth/login');
        }
        req.flash('success', 'Sesión cerrada exitosamente');
        return res.redirect('/auth/login');
    });
};

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
    cerrarsesion,
};
