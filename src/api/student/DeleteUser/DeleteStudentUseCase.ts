import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import DeleteStudentJoi from "./DeleteStudentJoi";

export default class DeleteStudentUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;
  constructor(request, response, StudentRepository: StudentRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
  }
  public static create(request, response) {
    return new DeleteStudentUseCase(request, response, new StudentRepository());
  }
  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, DeleteStudentJoi);

      // bulk delete and single delete as well
      const data = await this.StudentRepository.softDelete({ where: { id: this.requestBody.ids } });

      return {
        code: 200,
        message: "Delete Student data successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}
