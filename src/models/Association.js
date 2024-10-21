const { STRING } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define(
        "Association",
        {
            name: {
                type: STRING,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            logo: {
                type: STRING,
            },
            picture: {
                type: STRING,
            },
            history: {
                type: STRING(1500),
                allowNull: false,
            },
            introduction: {
                type: STRING(1500),
                allowNull: false,
            },
            mail: {
                type: STRING,
                allowNull: false,
            },
            direction: {
                type: STRING,
                allowNull: false,
            },
            phone: {
                type: STRING,
                allowNull: false,
            },
            objetive: {
                type: STRING(1500),
                allowNull: false,
            },
            action: {
                type: STRING(1500),
                allowNull: false,
            },
        }
    )
}