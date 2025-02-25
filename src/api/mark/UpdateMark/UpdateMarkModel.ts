import { joiObjectEnum } from "../../../domain/enumerations/Enumerations";
import MarksRepository from "../../../repositories/MarksRepository";
import BaseUseCase from "../../BaseUseCase";
import UpdateMarkModelJoi from "./UpdateMarkModelJoi";

export default class UpdateMarkModel extends BaseUseCase {
  private marksRepository: MarksRepository;
  constructor(request, response, marksRepository: MarksRepository) {
    super(request, response);
    this.marksRepository = marksRepository;
  }

  public static create(request, response) {
    return new UpdateMarkModel(request, response, new MarksRepository());
  }

  public async execute() {
    try {
      this.validate(joiObjectEnum.REQUEST_BODY, UpdateMarkModelJoi);

      const data = await this.marksRepository.update({ ...this.requestBody }, { where: { id: this.requestBody.id } });

      return {
        code: 200,
        message: "update Marks data successfully",
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
