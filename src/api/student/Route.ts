import express, { Request, Response } from "express";
import urlConstant from "../../domain/constants/urlConstant/urlConstant";
import CreateStudentUseCase from "./CreateUser/CreateStudentUseCase";
import StudentPaginationUseCase from "./UserPagination/StudentPaginationUseCase";
import GetAllStudentUseCase from "./GetAllUser/GetAllStudentUseCase";
import UpdateStudentUseCase from "./UpdateUser/UpdateStudentUseCase";
import DeleteStudentUseCase from "./DeleteUser/DeleteStudentUseCase";
import SearchStudentDataUseCase from "./SearchUserData/SearchStudentDataUseCase";

const router = express.Router();

router.post(urlConstant.student.create_student, async (request: Request, response: Response) => {
  const useCase = CreateStudentUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});

router.get(urlConstant.student.get_all_student, async (request: Request, response: Response) => {
  const useCase = StudentPaginationUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.get(urlConstant.student.get_student, async (request: Request, response: Response) => {
  const useCase = GetAllStudentUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.get(urlConstant.student.get_all_student, async (request: Request, response: Response) => {
  const useCase = GetAllStudentUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.put(urlConstant.student.update_student, async (request: Request, response: Response) => {
  const useCase = UpdateStudentUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.delete(urlConstant.student.delete_student, async (request: Request, response: Response) => {
  const useCase = DeleteStudentUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
router.get(urlConstant.student.search_student_details, async (request: Request, response: Response) => {
  const useCase = SearchStudentDataUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});

router.get(urlConstant.student.get_student_data, async (request: Request, response: Response) => {
  const useCase = StudentPaginationUseCase.create(request, response);
  await useCase.executeAndHandleErrors();
});
export default router;
