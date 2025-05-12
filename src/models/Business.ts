import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Business extends Model {
  public id!: number;
  public name!: string;
  public category!: string;
  public email!: string;
  public phone!: string;
  public user!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 20] // mínimo 8 caracteres, incluindo DDD
      }
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
        is: /^(?=.*[A-Za-z])(?=.*\d|[!@#$%^&*]).{8,}$/
      }
    },
  },
  {
    sequelize,
    tableName: 'Businesses',
    timestamps: true,
  }
);
