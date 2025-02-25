import express, { Request, Response } from "express";
import urlConstant from "../../domain/constants/urlConstant/urlConstant";
import CreateMarkUseCase from "./CreateMark/CreateMarkUseCase";

const router = express.Router();

router.post(urlConstant.mark.create_mark, async (request: Request, response: Response) => {
  const useCase = CreateMarkUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});

export default router;
