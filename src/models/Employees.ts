import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Employees extends Model {
  public id!: number;
  public id_business!: number;
  public image!: string | null;
  public name!: string;
  public summary!: string | null;
  public specialization!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employees.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_business: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specialization: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'Employees',
    timestamps: true,
  }
);
