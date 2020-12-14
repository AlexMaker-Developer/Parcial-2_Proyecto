const { response } = require('express');
const { query, querySingle, execute } = require('../../dal/data-access');

let alumnos = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Alumnos  */
const getAlumnos = async(req, res) => {
    try {
        alumnos = await query('stp_alumnos_getall');

        if (!alumnos) {
            console.log("BD vacia");
            res.json({
                status: true,
                msg: 'Ingresar alumnos',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Alumno',
                data: alumnos
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'No se puede obtener los alumnos',
            data: err
        });
    }
}

/* Obtener UN Usuario por ID */
const getAlumnoId = async(req, res) => {
    const idAlumno = req.params.id;

    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];

        let alumnos = await querySingle('stp_alumnos_getbyid', sqlParams);

        if (!alumnos) {
            console.log("Alumno no encontrado");
            res.json({
                status: true,
                msg: 'Esq no lo encuentro bro',
                data: alumnos
            });
        } else {
            res.json({
                status: true,
                msg: 'Lo encontre bro',
                data: alumnos
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Alumno no encontrado, intentelo de nuevo',
            data: err
        });
    }
}

/*  Agregar un Alumno (Check encryptation) */
const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;


    try {
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'edad',
                'value': edad
            },
            {
                'name': 'sexo',
                'value': sexo
            },
            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            },
        ];

        let alumnos = await query('stp_alumnos_add', sqlParams);
        console.log('Alumno Añadido');

        res.json({
            status: true,
            msg: 'Alumno agregado correctamente',
            data: alumnos
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

/* Editar Alumno */
const updateAlumno = async(req, res) => {
    const idAlumno = req.params.id;
    const { nombre, edad, sexo, semestre, carrera } = req.body;

    try {
        const sqlParams = [{
                'name': 'idAlumno',
                'value': idAlumno
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
                'name': 'sexo',
                'value': sexo
            },
            {
                'name': 'semestre',
                'value': semestre
            },
            {
                'name': 'carrera',
                'value': carrera
            }
        ];

        let alumnos = await execute('stp_alumnos_update', sqlParams);
        console.log('Alumno Editado');

        res.json({
            status: true,
            msg: 'Alumno modificado correctamente',
            data: alumnos
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'El Alumno no se modifico',
            data: err
        });
    }
}

/* Eliminar Alumno */
const deleteAlumno = async(req, res) => {
    const idAlumno = req.params.id;

    try {
        sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno
        }];

        let alumnos = await execute('stp_alumnos_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Hasta luego vaquero',
            data: alumnos
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Usuario no eliminado',
            data: err
        });
    }
}

module.exports = {
    getAlumnos,
    getAlumnoId,
    addAlumno,
    updateAlumno,
    deleteAlumno,
}