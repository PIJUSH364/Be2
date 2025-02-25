import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import UpdateStudentJoi from "./UpdateStudentJoi";

export default class UpdateStudentUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;
  constructor(request, response, StudentRepository: StudentRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
  }

  public static create(request, response) {
    return new UpdateStudentUseCase(request, response, new StudentRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, UpdateStudentJoi);

      const data = await this.StudentRepository.update(this.requestBody, {
        where: { id: this.requestBody.id },
      });

      return {
        code: 200,
        message: "update Student data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
