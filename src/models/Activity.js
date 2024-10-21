const { STRING, FLOAT, DATE, BOOLEAN, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
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
      description : {
        type:STRING,
        allowNull: false,
        validate: {
          len: [1, 1500] 
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
      city: {
        type: STRING,
        allowNull: false,
        validate: {
          len: [1, 50] // Validar longitud entre 1 y 50 caracteres
        }
      },
      image: {
        type: STRING,
        allowNull: false,
      },
      value_Inscription: {
        type: FLOAT,
        allowNull: false,
        validate: {
          len: [1, 50]
          // También puedes agregar validación numérica aquí si es necesario
        }
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      //"tipo" determines whether the activity is: 1.Congress, 2.Conference, 3.Talk, 4.Training
      tipo: {
        type: INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 4,
        }
      }
    }
  );
};