// Ruta api/login
const { Router } = require('express');
const { login, googleSignIn, loginToken, cambiarPassword } = require("../bml/controllers/auth")
const { check } = require('express-validator')
const { validatorCampos } = require('../bml/middlewares/validation-values');
const { valitationJWT } = require("../bml/middlewares/validation-jwt");



const router = Router();

// Login
router.post('/login', [
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'Password obligatorio').not().isEmpty(),
        validatorCampos
    ],
    login
);

router.post(
    "/google", [
        check('token', 'Token Google obligatorio').not().isEmpty(),
        validatorCampos,
    ],
    googleSignIn
);

router.post(
    "/renew", [
        check("email", "El email es obligatorio").not().isEmpty(),
        check("token", "El token es obligatorio").not().isEmpty(),
        validatorCampos,
    ],
    loginToken
);

//Restablecimiento de contraseña
router.post("/resetPassword", [
        check("email", "Email no válido").isEmail(),
        check('password', 'Password no válido').not().isEmpty(),
        validatorCampos,
    ],
    cambiarPassword
);


module.exports = router;