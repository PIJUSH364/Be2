import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import FilterStudentJoi from "./FilterStudentJoi";

export default class FilterStudentUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;
  constructor(request, response, StudentRepository: StudentRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
  }

  public static create(request, response) {
    return new FilterStudentUseCase(request, response, new StudentRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_QUERY, FilterStudentJoi);

      const data = await this.StudentRepository.find({
        where: {
          role: this.queryParams?.role,
        },
      });

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
