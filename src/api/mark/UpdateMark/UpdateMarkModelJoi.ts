import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const UpdateMarkModelJoi = Joi.object({
  id: Joi.number().required().messages(ErrorUtility.joiHelper("id", "number", false)),
  studentId: Joi.number().required().messages(ErrorUtility.joiHelper("studentId", "number", false)),
  subject: Joi.string()
    .optional()
    .allow("math", "science", "english")
    .required()
    .messages(ErrorUtility.joiHelper("subject", "string", false)),
  score: Joi.number().optional().required().messages(ErrorUtility.joiHelper("score", "number", false)),
});

export default UpdateMarkModelJoi;
