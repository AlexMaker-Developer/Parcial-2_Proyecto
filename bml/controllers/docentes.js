const { response } = require('express');
const { query, querySingle, execute } = require('../../dal/data-access');

let docentes = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Docentes  */
const getDocentes = async(req, res) => {
    try {
        docentes = await query('stp_docentes_getall');

        if (!docentes) {
            console.log("BD vacia");
            res.json({
                status: true,
                msg: 'Ingresar docentes',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Docentes',
                data: docentes
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'No se puede obtener los docentes',
            data: err
        });
    }
}

/* Obtener UN Docentes por ID */
const getDocentesId = async(req, res) => {
    const idDocente = req.params.id;

    try {
        sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];

        let docentes = await querySingle('stp_docentes_getbyid', sqlParams);

        if (!docentes) {
            console.log("Docentes no encontrado");
            res.json({
                status: true,
                msg: 'No existe ese docente bro',
                data: docentes
            });
        } else {
            res.json({
                status: true,
                msg: 'Docente encontrado',
                data: docentes
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Docente no encontrado, intentelo de nuevo',
            data: err
        });
    }
}

/*  Agregar un Docentes (Check encryptation) */
const addDocentes = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;


    try {
        sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },
            {
                'name': 'tipo',
                'value': tipo
            },
        ];

        let docentes = await query('stp_docentes_add', sqlParams);
        console.log('Docente Añadido');

        res.json({
            status: true,
            msg: 'Docente agregado correctamente',
            data: docentes
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Algo salio mal',
            data: err
        });
    }
}

/* Editar Docente */
const updateDocentes = async(req, res) => {
    const idDocente = req.params.id;
    const { nombre, edad, titulo, tipo } = req.body;


    try {
        const sqlParams = [{
                'name': 'idDocente',
                'value': idDocente
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'titulo',
                'value': titulo
            },
            {
                'name': 'tipo',
                'value': tipo
            },
        ];

        let docentes = await execute('stp_docentes_update', sqlParams);
        console.log('Docente Editado');

        res.json({
            status: true,
            msg: 'Docente modificado correctamente',
            data: docentes
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'El Docente no se pudo actualizar',
            data: err
        });
    }
}

/* Eliminar Alumno */
const deleteDocente = async(req, res) => {
    const idDocente = req.params.id;

    try {
        const sqlParams = [{
            'name': 'idDocente',
            'value': idDocente
        }];

        let docentes = await execute('stp_docentes_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Docente eliminado',
            data: docentes
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Docente no se pudo eliminar',
            data: err
        });
    }
}

module.exports = {
    getDocentes,
    getDocentesId,
    addDocentes,
    updateDocentes,
    deleteDocente,
}