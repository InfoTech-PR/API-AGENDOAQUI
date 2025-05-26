import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class SchedulingCancel extends Model {
  public id!: number;
  public schedulingId!: number;
  public cancelledById!: number;
  public cancelledByType!: string;
  public cancelDescription?: string;
  public readonly createdAt!: Date;
}

SchedulingCancel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    schedulingId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Schedulings",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    cancelledById: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    cancelledByType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cancelDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "SchedulingCancels",
    timestamps: true,
    updatedAt: false,
  }
);