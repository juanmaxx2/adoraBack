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
                allowNull: false,
            },
            shield: {
                type: STRING,
                allowNull: false,
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