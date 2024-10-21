const { STRING, INTEGER, BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "ProvincialLaw",
        {
            number: {
                type: INTEGER,
                allowNull: false,
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
