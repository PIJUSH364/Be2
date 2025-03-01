import Joi from "joi";
import ErrorUtility from "../../../domain/constants/message/ErrorUtility";

const CreateStudentJoi = Joi.object({
  name: Joi.string().required().messages(ErrorUtility.joiHelper("name", "string", false)),
  email: Joi.string().email().messages(ErrorUtility.joiHelper("email", "email", false)),
});

export default CreateStudentJoi;
