const {usuario} = require("../models");
const {evento} = require("../models");
const {usuario_evento} = require("../models");

const headers = require("../helpers/headers");

const MODULE_NAME = '[Estadisticas Controller]';

function calcularRegistros(req, res) {
    headers.setHeaders(res);

    const contextoIn = req.swagger.params.contexto.value;

    let response;

    if (contextoIn === "usuarios") {
        usuario.count()
            .then(registros => {
                response = {
                    contexto: "USUARIOS",
                    resultado: registros
                };
                res.status(200).send(response);
            })
            .catch(error => res.status(500).send(error));
    } else if (contextoIn === "eventos") {
        evento.count()
            .then(registros => {
                response = {
                    contexto: "EVENTOS",
                    resultado: registros
                };
                res.status(200).send(response);
            })
            .catch(error => res.status(500).send(error));
    }
}

function eventoPopular(req, res) {
    headers.setHeaders(res);

    const sql = "select eventos.id, eventos.nombre as nombre, eventos.foto as imagen, count(*) as participantes from usuario_eventos join eventos on usuario_eventos.\"eventoId\" = eventos.id group by eventos.id order by participantes desc limit 1;";

    usuario_evento.sequelize.query(sql)
        .then(([results, metadata]) => {
            res.status(200).send(results[0]);
        })
        .catch(error => res.status(500).send(error));
}

function eventoParticipantes(req, res) {
    headers.setHeaders(res);

    const sql = "select eventos.id, eventos.nombre as nombre, eventos.foto as imagen, count(*) as participantes from usuario_eventos join eventos on usuario_eventos.\"eventoId\" = eventos.id group by eventos.id order by participantes desc;";

    usuario_evento.sequelize.query(sql)
        .then(([results, metadata]) => {
            res.status(200).send(results);
        })
        .catch(error => res.status(500).send(error));
}

module.exports = {
    calcularRegistros,
    eventoPopular,
    eventoParticipantes,
    MODULE_NAME
};
