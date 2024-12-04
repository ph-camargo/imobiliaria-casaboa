// models/imovelModels.js
const { Sequelize, DataTypes } = require('sequelize');

// Defina a conexão com o banco de dados
const sequelize = new Sequelize('mysql://root:1407vitoria@localhost:3306/imobiliaria');

// Defina o modelo 'Imovel'
const Imovel = sequelize.define('Imovel', {
    id_imovel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    num_de_comodos: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'imovel', // Nome da tabela no banco de dados
    timestamps: false,   // Se você não precisar de campos 'createdAt' e 'updatedAt'
});

// Exporte tanto o modelo quanto a instância sequelize
module.exports = { Imovel, sequelize };
