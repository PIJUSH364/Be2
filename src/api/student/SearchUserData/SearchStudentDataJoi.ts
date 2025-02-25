import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const SearchStudentDataJoi = Joi.object({
  search: Joi.string().required().messages(ErrorUtility.joiHelper("search", "string", false)),
});

export default SearchStudentDataJoi;
