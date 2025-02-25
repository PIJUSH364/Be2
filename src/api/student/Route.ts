import express, { Request, Response } from "express";
import urlConstant from "../../domain/constants/urlConstant/urlConstant";
import CreateUserUseCase from "../user/CreateUser/CreateUserUseCase";

const router = express.Router();

router.post(urlConstant.user.create_user, async (request: Request, response: Response) => {
  const useCase = CreateUserUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
export default router;
