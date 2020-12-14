const jwt = require('jsonwebtoken');

const valitationJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.json({
            status: false,
            message: 'sin token',
            data: null,
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        req.id = id;
        next();
    } catch (e) {
        return res.json({
            status: false,
            message: 'Token no valido',
            data: null,
        })
    }
}

module.exports = {
    valitationJWT
}