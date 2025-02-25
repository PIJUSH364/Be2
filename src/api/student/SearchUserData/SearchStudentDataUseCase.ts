import { Op } from "sequelize";
import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import SearchStudentDataJoi from "./SearchStudentDataJoi";

export default class SearchStudentDataUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;

  constructor(request, response, StudentRepository: StudentRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
  }

  public static create(request, response) {
    return new SearchStudentDataUseCase(request, response, new StudentRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_QUERY, SearchStudentDataJoi);

      const searchTerm = this.queryParams?.search?.trim();

      const data = await this.StudentRepository.find({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchTerm}%` } },
            { email: { [Op.iLike]: `%${searchTerm}%` } },
            // { role: { [Op.iLike]: `%${searchTerm}%` } },
          ],
        },
      });

      return {
        code: 200,
        message: "Student data fetched successfully",
        data,
      };
    } catch (error) {
      console.error("Error searching Students:", error);
      throw error;
    }
  }
}
