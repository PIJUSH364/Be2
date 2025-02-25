import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const StudentPaginationJoi = Joi.object({
  page: Joi.number().required().messages(ErrorUtility.joiHelper("page", "number", false)),
  pageSize: Joi.number().optional().messages(ErrorUtility.joiHelper("pageSize", "number", false)),
  search: Joi.string().allow("").optional().messages(ErrorUtility.joiHelper("search", "string", false)),
});

export default StudentPaginationJoi;
