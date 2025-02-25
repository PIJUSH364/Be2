import { Op } from "sequelize";
import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import StudentRepository from "../../../repositories/StudentRepository";
import BaseUseCase from "../../BaseUseCase";
import StudentPaginationJoi from "./StudentPaginationJoi";
import MarksRepository from "../../../repositories/MarksRepository";
export default class StudentPaginationUseCase extends BaseUseCase {
  private StudentRepository: StudentRepository;
  private marksRepository: MarksRepository;

  constructor(request, response, StudentRepository: StudentRepository, marksRepository: MarksRepository) {
    super(request, response);
    this.StudentRepository = StudentRepository;
    this.marksRepository = marksRepository;
  }

  public static create(request, response) {
    return new StudentPaginationUseCase(request, response, new StudentRepository(), new MarksRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_QUERY, StudentPaginationJoi);

      // Ensure valid page and limit values
      const page = Math.max(Number(this.queryParams?.page) || 1, 1);
      const limit = Math.max(Number(this.queryParams?.pageSize) || 5, 1);
      const offset = (page - 1) * limit;

      const searchTerm = this.queryParams?.search?.trim();

      let condition = {};
      if (searchTerm) {
        condition = {
          ...condition,
          [Op.or]: [{ name: { [Op.iLike]: `%${searchTerm}%` } }, { email: { [Op.iLike]: `%${searchTerm}%` } }],
        };
      }

      // Execute query with pagination
      const { count, rows } = await this.StudentRepository.findAndCount({
        where: condition,
        include: [
          {
            model: this.marksRepository.model(),
            as: "marks",
            attributes: ["subject", "score"],
            required: false,
          },
        ],
        offset,
        limit,
        order: [["createdAt", "DESC"]], // Optional: Sorting by newest
      });

      return {
        code: 200,
        message: "Get Student data successfully",
        data: rows,
        pagination: {
          page,
          totalPages: Math.ceil(count / limit),
          totalRecords: count,
        },
      };
    } catch (error) {
      console.error("StudentPaginationUseCase Error:", error);
      throw error;
    }
  }
}
