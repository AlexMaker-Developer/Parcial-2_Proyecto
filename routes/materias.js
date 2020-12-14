//Ruta api/alumnos
const { Router } = require('express');
const { check } = require('express-validator')
const {
    getMaterias,
    getMateriasId,
    addMaterias,
    updateMaterias,
    deleteMateria,
} = require('../bml/controllers/materias');

const router = Router();

// GetAll
router.get('/', getMaterias);

// GetById
router.get('/id/:id', getMateriasId);

// Add User
router.post('/', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('horas', 'edad no válido').isEmail(),
        check('horasp', 'sexo no válido').not().isEmpty(),
        check('horast', 'horast no válido').not().isEmpty(),
        check('creditos', 'creditos no válido').not().isEmpty(),
    ],
    addMaterias
);

// Edit Materia
router.put('/:id', [
        check('nombre', 'Nombre no válido').not().isEmpty(),
        check('horas', 'edad no válido').isEmail(),
        check('horasp', 'sexo no válido').not().isEmpty(),
        check('horast', 'horast no válido').not().isEmpty(),
        check('creditos', 'creditos no válido').not().isEmpty(),
    ],
    updateMaterias
);

// Delete Materia
router.delete('/:id', deleteMateria);


module.exports = router;