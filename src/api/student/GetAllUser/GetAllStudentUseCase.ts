import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";

export default class GetAllStudentUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;
  constructor(request, response, StudentRepository: StudentRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
  }

  public static create(request, response) {
    return new GetAllStudentUseCase(request, response, new StudentRepository());
  }

  public async execute() {
    try {
      const data = await this.StudentRepository.find();

      return {
        code: 200,
        message: "Get all Student data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
