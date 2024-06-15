import { Router } from "express";
import UserController from "../controllers/UserController";
import MaterialController from "../controllers/MaterialController";
import TransactionController from "../controllers/TransactionController";
const router = Router();

//  endpoint user
router.get("/users", UserController.getUsers);
router.get("/user/:user_id", UserController.getUserById);
router.post("/create-user", UserController.createUser);
router.put("/update-user/:user_id", UserController.updateUser);
router.delete("/delete-user/:user_id", UserController.deleteUser);

// endpoint material
router.get("/materials", MaterialController.getMaterials);
router.get("/material/:material_id", MaterialController.getMaterialById);
router.post("/create-material", MaterialController.createMaterial);
router.put("/update-material/:material_id", MaterialController.updateMaterial);
router.delete(
  "/delete-material/:material_id",
  MaterialController.deleteMaterial
);

// endpoint transaction

router.get("/transactions", TransactionController.getTransactions);
router.get(
  "/transaction/:transaction_id",
  TransactionController.getTransactionById
);
router.post("/create-transaction", TransactionController.createTransaction);
router.put(
  "/update-transaction/:transaction_id",
  TransactionController.updateTransaction
);
router.delete(
  "/delete-transaction/:transaction_id",
  TransactionController.deleteTransaction
);

export default router;
