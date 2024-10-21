const { STRING, BOOLEAN, INTEGER, DATE } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PrayerDay",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: STRING,
        allowNull: false,
        validate: {
          len: [1, 50] 
        }
      },
      time: {
        type: STRING, 
        allowNull: false,
      },
      date: {
        type: DATE,
        allowNull: false,
      },
      url: {
        type: STRING,
        allowNull: false,
        validate: {
          len: [1, 150], 
          isUrl: true 
        }
      },
      image: {
        type: STRING,
        allowNull: false,
      },
      description : {
        type:STRING,
        allowNull: false,
        validate: {
          len: [1, 1500] 
          // También puedes agregar validación de formato de hora aquí si es necesario
        }
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }
  );
};
