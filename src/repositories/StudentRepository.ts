import StudentModel from "../domain/schemas/Student.ts/Student";
import BaseRepositories from "./BaseRepository";

export default class StudentRepository extends BaseRepositories {
  constructor() {
    super();
  }

  public model() {
    return StudentModel;
  }
}
