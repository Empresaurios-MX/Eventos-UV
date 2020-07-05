const {usuario} = require("../models");
const {toAES256} = require("../helpers/security");
const headers = require("../helpers/headers");

const MODULE_NAME = '[Usuario Controller]';

function getUsuarios(req, res) {
    usuario.findAll()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(500).send(error));
}

function getUsuarioById(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;

    usuario.findByPk(idIn, {include: ['eventos']})
        .then(usuario => {

            res.status(200).send(
                usuario
            );
        })
        .catch(error => res.status(403).send(error));
}

function postUsuario(req, res) {
    headers.setHeaders(res);

    const usuarioIn = req.body;

    if (usuarioIn.rol !== 'administrador' && usuarioIn.rol !== 'estudiante') {
        return res.status(422).send({message: 'El rol debe ser "estudiante" o "administrador"'})
    }

    usuarioIn.password = toAES256(usuarioIn.password);

    usuario.findOne({where: {email: usuarioIn.email}})
        .then(value => {
            if (value) {
                res.status(409).send({message: "El email ya se encuentra registrado"});
            } else {
                return usuario.create(usuarioIn)
                    .then(usuario => res.status(201).send(usuario))
                    .catch(error => res.status(400).send(error));
            }
        })
        .catch(error => res.status(400).send(error));
}

function putUsuario(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;
    const usuarioIn = req.body;

    usuario.findByPk(idIn).then(usuario => {
        if (!usuario) {
            return res.status(404).send({message: "No encontrado!"});
        }

        if (usuarioIn.password === "") {
            usuarioIn.password = usuario.password;
        }

        return usuario.update(usuarioIn)
            .then(newUser => res.status(200).send(newUser))
            .catch(error => res.status(403).send(error));
    }).catch(error => console.log(error));
}

function deleteUsuario(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;

    usuario.findByPk(idIn).then(user => {
        if (!user) {
            return res.status(200).send({success: 0, description: "No encontrado!"});
        } else {
            return user.destroy()
                .then(() => res.status(200).send({success: 1, description: "Eliminado!"}))
                .catch(() => res.status(403).send({success: 0, description: "Error!"}))
        }
    }).catch(error => console.log(error));
}


module.exports = {
    getUsuarios,
    getUsuarioById,
    postUsuario,
    putUsuario,
    deleteUsuario,
    MODULE_NAME
};
