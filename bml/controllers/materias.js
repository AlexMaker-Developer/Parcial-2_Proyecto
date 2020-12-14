const { response } = require('express');
const { query, querySingle, execute } = require('../../dal/data-access');

let materias = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Materias  */
const getMaterias = async(req, res) => {
    try {
        materias = await query('stp_materias_getall');

        if (!materias) {
            console.log("BD vacia");
            res.json({
                status: true,
                msg: 'Ingresar materias',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Materias',
                data: materias
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'No se puede obtener las materias',
            data: err
        });
    }
}

/* Obtener UN Docentes por ID */
const getMateriasId = async(req, res) => {
    const idMateria = req.params.id;

    try {
        const sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];

        let materias = await querySingle('stp_materias_getbyid', sqlParams);

        if (!materias) {
            console.log("No la encontre bro");
            res.json({
                status: true,
                msg: 'No la encuentro Bro :(',
                data: materias
            });
        } else {
            res.json({
                status: true,
                msg: 'La traje para ti bro :)',
                data: materias
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Materia no encontrado, intentelo de nuevo',
            data: err
        });
    }
}

/*  Agregar un Materia (Check encryptation) */
const addMaterias = async(req, res) => {
    const { nombre, horas, horasp, horast, creditos } = req.body;


    try {
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasp',
                'value': horasp
            },
            {
                'name': 'horast',
                'value': horast
            },
            {
                'name': 'creditos',
                'value': creditos
            },
        ];

        let materias = await query('stp_materias_add', sqlParams);
        console.log('Materia Añadida');

        res.json({
            status: true,
            msg: 'Materia agregada correctamente',
            data: { materias }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Perdo bro, te faltaron cosas y no la puedo añadir :)',
            data: err
        });
    }
}

/* Editar Materias */
const updateMaterias = async(req, res) => {
    const idMateria = req.params.id;
    const { nombre, horas, horasp, horast, creditos } = req.body;


    try {
        const sqlParams = [{
                'name': 'idMateria',
                'value': idMateria
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'horas',
                'value': horas
            },
            {
                'name': 'horasp',
                'value': horasp
            },
            {
                'name': 'horast',
                'value': horast
            },
            {
                'name': 'creditos',
                'value': creditos
            },
        ];

        let materias = await execute('stp_materias_update', sqlParams);
        console.log('Materia Editado');

        res.json({
            status: true,
            msg: 'Materia modificada correctamente',
            data: materias
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'La materia no se pudo actualizar',
            data: err
        });
    }
}

/* Eliminar Materia */
const deleteMateria = async(req, res) => {
    const idMateria = req.params.id;

    try {
        sqlParams = [{
            'name': 'idMateria',
            'value': idMateria
        }];

        let materias = await execute('stp_materias_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Ya la elimine bro, una dificil desición, pero... al cliente lo que pida',
            data: materias
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Materia no se pudo eliminar',
            data: err
        });
    }
}

module.exports = {
    getMaterias,
    getMateriasId,
    addMaterias,
    updateMaterias,
    deleteMateria,
}