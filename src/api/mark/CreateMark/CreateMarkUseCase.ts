import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import MarksRepository from "../../../repositories/MarksRepository";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import CreateMarkJoi from "./CreateMarkJoi";

export default class CreateMarkUseCase extends BaseUseCase {
  private marksRepository: MarksRepository;
  private studentRepository: StudentRepository;
  constructor(request, response, marksRepository: MarksRepository, studentRepository: StudentRepository) {
    super(request, response);
    this.marksRepository = marksRepository;
    this.studentRepository = studentRepository;
  }

  public static create(request, response) {
    return new CreateMarkUseCase(request, response, new MarksRepository(), new StudentRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, CreateMarkJoi);

      const student = await this.studentRepository.findOne({ where: { id: this.requestBody.studentId } });
      console.log(student);
      if (!student) {
        throw new Error("Student record not found");
      }

      const mark = await this.marksRepository.findOne({
        where: { studentId: this.requestBody.studentId, subject: this.requestBody.subject },
      });

      if (mark) {
        throw new Error("Mark already exist");
      }

      const data = await this.marksRepository.create(this.requestBody);

      return {
        code: 200,
        message: "Add Marks data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
