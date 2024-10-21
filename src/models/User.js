const { STRING, BOOLEAN, ENUM } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            name: {
                type: STRING,
                allowNull: false,
            },
            lastname: {
                type: STRING,
                allowNull: false,
            },
            email: {
                type: STRING,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            password: {
                type: STRING,
                allowNull: false,
            },
            rol: {
                type: ENUM('admin', 'superadmin', 'user'),
                allowNull: false,
                defaultValue: 'user'
            },
            status: {
                type: BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }
    );
};
