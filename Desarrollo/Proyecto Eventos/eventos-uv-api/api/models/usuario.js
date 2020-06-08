'use strict';
module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define('usuario', {
        password: DataTypes.STRING,
        nombre: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        intereses: DataTypes.ARRAY(DataTypes.STRING),
        email: DataTypes.STRING,
        rol: DataTypes.STRING
    }, {});
    usuario.associate = function (models) {
        usuario.belongsToMany(models.evento, {
            through: 'usuario_evento',
            foreignKey: 'usuarioId',
            as: 'eventos'
        });
    };
    return usuario;
};
