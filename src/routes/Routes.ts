import { Router } from "express";
import UserController from "../controllers/UserController";
import MaterialController from "../controllers/MaterialController";
import TransactionController from "../controllers/TransactionController";
import { userValidation } from "../middleware/validation/UserValidation";
import { materialValidation } from "../middleware/validation/MaterialValidation";
import { transactionValidation } from "../middleware/validation/TransactionValidation";

const router = Router();

//  endpoint user
router.get("/users", UserController.getUsers);
router.get("/user/:user_id", UserController.getUserById);
router.post("/create-user", userValidation, UserController.createUser);
router.put("/update-user/:user_id", userValidation, UserController.updateUser);
router.delete("/delete-user/:user_id", UserController.deleteUser);

// endpoint material
router.get("/materials", MaterialController.getMaterials);
router.get("/material/:material_id", MaterialController.getMaterialById);
router.post(
  "/create-material",
  materialValidation,
  MaterialController.createMaterial
);
router.put(
  "/update-material/:material_id",
  materialValidation,
  MaterialController.updateMaterial
);
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
router.post(
  "/create-transaction",
  transactionValidation,
  TransactionController.createTransaction
);
router.put(
  "/update-transaction/:transaction_id",
  transactionValidation,
  TransactionController.updateTransaction
);
router.delete(
  "/delete-transaction/:transaction_id",
  TransactionController.deleteTransaction
);

export default router;
