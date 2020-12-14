//Ruta api/alumnos
const { Router } = require('express');
const { check } = require('express-validator')
const {
    getDocentes,
    getDocentesId,
    addDocentes,
    updateDocentes,
    deleteDocente,
} = require('../bml/controllers/docentes');

const router = Router();

// GetAll
router.get('/', getDocentes);

// GetById
router.get('/id/:id', getDocentesId);

// Add User
router.post('/', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'edad no válido').isEmail(),
        check('titulo', 'sexo no válido').not().isEmpty(),
        check('tipo', 'semestre no válido').not().isEmpty(),
    ],
    addDocentes
);

// Edit Docente
router.put('/:id', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'edad no válido').isEmail(),
        check('titulo', 'sexo no válido').not().isEmpty(),
        check('tipo', 'semestre no válido').not().isEmpty(),
    ],
    updateDocentes
);

// Delete Alumno
router.delete('/:id', deleteDocente);


module.exports = router;