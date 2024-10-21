const { STRING, INTEGER, BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "DepartmentEducation",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            photo: {
                type: STRING,
                allowNull: false,
            },
            url: {
                type: STRING,
                allowNull: false,
            },
            commission: {
                type: STRING,
                allowNull: false,
            },
            contact: {
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
};