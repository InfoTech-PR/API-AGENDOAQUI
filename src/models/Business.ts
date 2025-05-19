import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Business extends Model {
  public id!: number;
  public name!: string;
  public category!: string;
  public email!: string;
  public role!: string;
  public active!: boolean;
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
    role: {
      type: DataTypes.ENUM('client', 'admin'),
      allowNull: false,
      defaultValue: 'client'
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 20]
      }
    },
    user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
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
