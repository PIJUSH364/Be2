import MarksModel from "../domain/schemas/Student.ts/Marks";
import BaseRepositories from "./BaseRepository";

export default class MarksRepository extends BaseRepositories {
  constructor() {
    super();
  }

  public model() {
    return MarksModel;
  }
}
