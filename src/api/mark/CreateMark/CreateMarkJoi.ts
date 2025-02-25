import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const CreateMarkJoi = Joi.object({
  studentId: Joi.number().required().messages(ErrorUtility.joiHelper("studentId", "number", false)),
  subject: Joi.string()
    .allow("math", "science", "english")
    .required()
    .messages(ErrorUtility.joiHelper("subject", "string", false)),
  score: Joi.number().required().messages(ErrorUtility.joiHelper("score", "number", false)),
});

export default CreateMarkJoi;
