const {usuario} = require('../models');
const headers = require("../helpers/headers");

exports.login = function (req, res) {
    headers.setHeaders(res);

    const authIn = req.body;

    if (authIn.rol !== "estudiante" && authIn.rol !== "administrador") {
        return res.end(JSON.stringify({message: 'El rol debe ser "estudiante" o "administrador"'}));
    }

    usuario.findOne({
        where: {
            email: authIn.email
        },
        include: ['eventos']
    }).then(result => {
        if (!result) {
            return res.status(404).send({message: 'Usuario no encontrado'})
        }

        if (result.password === authIn.password) {
            return res.status(200).send(result)
        }
        else {
            return res.status(404).send({message: "Password incorrecto"})
        }
    }).catch(error => res.status(400).send({message: "Error: " + error}));
};
