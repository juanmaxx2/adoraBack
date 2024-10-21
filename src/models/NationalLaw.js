const { STRING, INTEGER, BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "NationalLaw",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            number: {
                type: INTEGER,
                allowNull: false,
                unique: true,
                validate: {
                    isInt: true,
                    min: 1
                }
            },
            title: {
                type: STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            url: {
                type: STRING,
                allowNull: false,
                validate: {
                    isUrl: true
                }
            },
            status: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            timestamps: false,
        }
    );
};
