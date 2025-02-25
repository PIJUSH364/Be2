import { Model, DataTypes } from "sequelize";
import { postgresConnector } from "../../../core/utils/absoluteFilePath";

class StudentModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

StudentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: postgresConnector,
    modelName: "student",
    tableName: "student",
    timestamps: true,
    paranoid: true, // Enables soft delete
  },
);

export default StudentModel;
