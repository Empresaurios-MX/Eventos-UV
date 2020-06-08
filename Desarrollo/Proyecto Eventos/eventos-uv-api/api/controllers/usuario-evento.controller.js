const {usuario_evento} = require("../models");
const headers = require("../helpers/headers");

const MODULE_NAME = '[Usuario-Evento Controller]';

function postUsuarioEvento(req, res) {
    headers.setHeaders(res);

    const input = req.body;

    return usuario_evento.create(input)
        .then(result => res.status(201).send(result))
        .catch(error => res.status(400).send(error));
}

function deleteUsuarioEvento(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;

    usuario_evento.findByPk(idIn).then(result => {
        if (!result) {
            return res.status(200).send({success: 0, description: "No encontrado!"});
        } else {
            return result.destroy()
                .then(() => res.status(200).send({success: 1, description: "Eliminado!"}))
                .catch(() => res.status(403).send({success: 0, description: "Error!"}))
        }
    }).catch(error => console.log(error));
}

module.exports = {
    postUsuarioEvento,
    deleteUsuarioEvento,
    MODULE_NAME
};
