import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Services',
    timestamps: true,
  }
);
