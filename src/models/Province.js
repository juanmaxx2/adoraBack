const { STRING, BOOLEAN } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        "Province",
        {
            name: {
                type: STRING,
                allowNull: false,
                primaryKey: true,
            },
            flag: {
                type: STRING,
                allowNull: true,
            },
            shield: {
                type: STRING,
                allowNull: true,
            },
            whatsapp: {
                type: STRING,
                allowNull: false,
            },
            status: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }
    );
};