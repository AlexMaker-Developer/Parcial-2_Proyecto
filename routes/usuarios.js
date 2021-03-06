// Ruta api/usuarios
const { Router } = require('express');
const { check } = require('express-validator')
const { validatorCampos } = require('../bml/middlewares/validation-values');
const { valitationJWT } = require('../bml/middlewares/validation-jwt');
const {
    getUsuarios,
    getUsuarioId,
    getUsuarioEmail,
    addUsuario,
    updateUsuario,
    deleteUsuario,
} = require('../bml/controllers/usuarios');

const router = Router();

// GetAll
router.get('/', getUsuarios);

// GetById
router.get('/id/:id', getUsuarioId);

// GetByEmail
router.get('/email', [
        check('email', 'Email no válido').isEmail(),
    ],
    getUsuarioEmail);

// Add User
router.post('/', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('email', 'Email no válido').isEmail(),
        check('password', 'Password no válido').not().isEmpty(),
        validatorCampos,
    ],
    addUsuario
);

// Edit User
router.put('/:id', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('email', 'Email no válido').isEmail(),
        check('password', 'Password no válido').not().isEmpty(),
        validatorCampos,
    ],
    updateUsuario
);

// Delete User
router.delete('/:id', deleteUsuario);




module.exports = router;