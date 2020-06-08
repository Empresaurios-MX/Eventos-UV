'use strict';
module.exports = (sequelize, DataTypes) => {
    const usuario_evento = sequelize.define('usuario_evento', {
        usuarioId: DataTypes.INTEGER,
        eventoId: DataTypes.INTEGER
    }, {});
    usuario_evento.associate = function (models) {
        usuario_evento.belongsTo(models.usuario, {foreignKey: 'usuarioId'});
        usuario_evento.belongsTo(models.evento, {foreignKey: 'eventoId'});
    };
    return usuario_evento;
};
