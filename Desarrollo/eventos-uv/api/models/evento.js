'use strict';
module.exports = (sequelize, DataTypes) => {
    const evento = sequelize.define('evento', {
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING,
        invitados: DataTypes.STRING,
        fecha: DataTypes.STRING,
        hora: DataTypes.STRING,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        foto: DataTypes.STRING,
        realizado: DataTypes.BOOLEAN
    }, {});
    evento.associate = function (models) {
        evento.belongsToMany(models.usuario, {
            through: 'usuario_evento',
            foreignKey: 'eventoId',
            as: 'participantes'
        });
    };
    return evento;
};
