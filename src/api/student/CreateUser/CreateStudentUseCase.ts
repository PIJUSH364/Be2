import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import CreateStudentJoi from "./CreateStudentJoi";

export default class CreateStudentUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;
  constructor(request, response, StudentRepository: StudentRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
  }

  public static create(request, response) {
    return new CreateStudentUseCase(request, response, new StudentRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, CreateStudentJoi);

      const data = await this.StudentRepository.create(this.requestBody);

      return {
        code: 200,
        message: "create Student data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
