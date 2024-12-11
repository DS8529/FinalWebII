import { DataTypes } from "sequelize";

export function definePrinters(sequelize) {
  sequelize.define('Printer', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      done: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      marca: {
          type: DataTypes.STRING,
          allowNull: true
      },
      precio: {
          type: DataTypes.FLOAT,
          allowNull: true
      },
      description: {
          type: DataTypes.STRING,
          allowNull: true
      },
      modelo: {
          type: DataTypes.STRING,
          allowNull: true
      },
      tipo: {
          type: DataTypes.BOOLEAN,
          allowNull: true, 
          defaultValue: false
      },
      connectividad: {
          type: DataTypes.STRING,
          allowNull: true 
      },
      velocidad: {
          type: DataTypes.INTEGER,
          allowNull: true 
      }
  });
};
