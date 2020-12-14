//Ruta api/alumnos
const { Router } = require('express');
const { check } = require('express-validator')
const {
    getAlumnos,
    getAlumnoId,
    addAlumno,
    updateAlumno,
    deleteAlumno,
} = require('../bml/controllers/alumnos');

const router = Router();

// GetAll
router.get('/', getAlumnos);

// GetById
router.get('/id/:id', getAlumnoId);

// Add User
router.post('/', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'edad no válido').isEmail(),
        check('sexo', 'sexo no válido').not().isEmpty(),
        check('semestre', 'semestre no válido').not().isEmpty(),
        check('carrera', 'carrera no válido').not().isEmpty(),
    ],
    addAlumno
);

// Edit Alumno
router.put('/:id', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('edad', 'edad no válido').isEmail(),
        check('sexo', 'sexo no válido').not().isEmpty(),
        check('semestre', 'semestre no válido').not().isEmpty(),
        check('carrera', 'carrera no válido').not().isEmpty(),
    ],
    updateAlumno
);

// Delete Alumno
router.delete('/:id', deleteAlumno);


module.exports = router;