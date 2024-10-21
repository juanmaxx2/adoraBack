const { STRING, INTEGER, BOOLEAN } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        "Writer", 
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            firstname: {
                type: STRING,
                allowNull: false,
            },
            lastname: {
                type: STRING,
                allowNull: false,
            },
            photo: {
                type: STRING,
                allowNull: false,
            },
            mail: {
                type: STRING,
                allowNull: false,
            },
            status: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }
    )
}