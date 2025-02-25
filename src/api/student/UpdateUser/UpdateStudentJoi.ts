import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UpdateStudentJoi = Joi.object({
  id: Joi.number().required().messages(ErrorUtility.joiHelper("id", "number", false)),
  name: Joi.string().optional().messages(ErrorUtility.joiHelper("name", "string", false)),
  email: Joi.string().optional().email().messages(ErrorUtility.joiHelper("email", "email", false)),
});

export default UpdateStudentJoi;
