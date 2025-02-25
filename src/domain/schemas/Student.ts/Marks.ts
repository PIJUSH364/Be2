import { Model, DataTypes } from "sequelize";
import { postgresConnector } from "../../../core/utils/absoluteFilePath";
import StudentModel from "./Student";

const subjects = ["Math", "Science", "English"] as const;
type SubjectType = (typeof subjects)[number];

class MarksModel extends Model {
  id!: number;
  studentId!: string;
  email!: string;
  subject!: SubjectType;
  score!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

MarksModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: StudentModel, key: "id" },
    },
    subject: {
      type: DataTypes.ENUM(...subjects),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
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

StudentModel.hasMany(MarksModel, { foreignKey: "studentId" });
MarksModel.belongsTo(StudentModel, { foreignKey: "studentId" });

export default MarksModel;
