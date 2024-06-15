import { Router } from "express";
import UserController from "../controllers/UserController";
const router = Router();

router.get("/users", UserController.getUsers);
router.get("/user/:user_id", UserController.getUserById);
router.post("/create-user", UserController.createUser);
router.put("/update-user/:user_id", UserController.updateUser);
router.delete("/delete-user/:user_id", UserController.deleteUser);

export default router;
