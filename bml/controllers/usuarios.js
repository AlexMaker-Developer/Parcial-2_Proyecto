const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');

const { query, querySingle, execute } = require('../../dal/data-access');

let usuarios = null;
let usuario = null;
let sqlParams = null;

/*<----------  // CRUD \\  ---------->*/
/*  Obtener TODOS los Usuarios  */
const getUsuarios = async(req, res) => {

    let usuarios = await query('stp_usuarios_getall');

    if (!usuarios) {
        console.log("BD vacia");
        res.json({
            status: true,
            msg: 'Ingresar usuarios',
            data: usuarios
        });
    } else {
        res.json({
            status: true,
            msg: 'Usuario',
            data: usuarios
        });
    }

}

/* Obtener UN Usuario por ID */
const getUsuarioId = async(req, res) => {
    const idUsuario = req.params.id;

    try {
        sqlParams = [{
            'name': 'idUsuario',
            'value': idUsuario
        }];

        const usuario = await querySingle('stp_usuarios_getbyid', sqlParams);

        if (!usuario) {
            console.log("Usuario no encontrado");
            res.json({
                status: true,
                msg: 'Usuario inexistente o vacio',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Usuario encontrado',
                data: usuario
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Usuario no encontrado, intentelo de nuevo',
            data: err
        });
    }
}

/* Obtener UN Usuario por EMAIL */
const getUsuarioEmail = async(req, res) => {
    const { email } = req.body;

    try {
        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        console.log(email);

        usuario = await querySingle('stp_usuarios_getbyemail', sqlParams);

        if (!usuario) {
            console.log("Usuario no encontrado");
            res.json({
                status: true,
                msg: 'Usuario inexistente o vacio',
                data: null
            });
        } else {
            res.json({
                status: true,
                msg: 'Usuario encontrado',
                data: usuario
            });
        }
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Usuario no encontrado, intentelo de nuevo',
            data: err
        });
    }
}

/*  Agregar un Usuario (Check encryptation) */
const addUsuario = async(req, res = response) => {
    const { nombre, email, password, imagen } = req.body;

    /* Encryptar password */
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    try {
        sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': passwordEncrypted
            },
            {
                'name': 'imagen',
                'value': imagen
            },
            {
                'name': 'local',
                'value': 1
            },
            {
                'name': 'google',
                'value': 0
            },
        ];

        usuario = await querySingle('stp_usuarios_add', sqlParams);
        console.log('Usuario added');


        const token = await generateJWT(usuario.idUsuario);
        console.log('Token: \n' + token)

        res.json({
            status: true,
            msg: 'Agregado bro ;)',
            data: { usuario, token }
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

/* Editar Usuario */
const updateUsuario = async(req, res = response) => {
    const idUsuario = req.params.id;
    const { nombre, email, password, imagen } = req.body;

    // Encryptar password
    const salt = bcrypt.genSaltSync();
    const passwordEncrypted = bcrypt.hashSync(password, salt);

    try {
        sqlParams = [{
                'name': 'idUsuario',
                'value': idUsuario
            },
            {
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': passwordEncrypted
            },
            {
                'name': 'imagen',
                'value': imagen
            }
        ];

        usuario = await querySingle('stp_usuarios_update', sqlParams);
        console.log(usuario);
        console.log('Usuario Edited');

        const token = await generateJWT(usuario.idUsuario);
        console.log('Token: \n' + token);

        res.json({
            status: true,
            msg: 'Listo bro ;) confia en mi',
            data: { usuario, token }
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Te faltaron campos bro o checa el id xfa :(',
            data: err
        });
    }
}

/* Eliminar Usuario */
const deleteUsuario = async(req, res) => {
    const idUsuario = req.params.id;

    try {
        sqlParams = [{
            'name': 'idUsuario',
            'value': idUsuario
        }];

        usuario = await execute('stp_usuarios_delete', sqlParams);

        res.json({
            status: true,
            msg: 'Hasta luego vaquero :(',
            data: null
        });
    } catch (err) {
        console.error('Error: ' + err);
        return res.json({
            status: false,
            msg: 'Usuario no se pudo eliminar',
            data: err
        });
    }
}


module.exports = {
    getUsuarios,
    getUsuarioId,
    getUsuarioEmail,
    addUsuario,
    updateUsuario,
    deleteUsuario,
}