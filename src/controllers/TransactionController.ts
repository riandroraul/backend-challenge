import { Request, Response } from "express";
import Transaction from "../db/models/Transaction";
import Helper from "../utils/response";
import User from "../db/models/User";
import Material from "../db/models/Material";

const getTransactions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, attributes: ["username"], as: "vendor" },
        { model: User, attributes: ["username"], as: "customer" },
        { model: Material, attributes: ["material_name"], as: "material" },
      ],
    });
    return res
      .status(200)
      .send(Helper.responseSuccess(true, 200, "success", transactions, null));
  } catch (error) {
    return Helper.errorResult(error, res, 400);
  }
};

const getTransactionById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { transaction_id } = req.params;
    const transaction = await Transaction.findOne({
      where: { transaction_id },
      include: [
        { model: User, attributes: ["username"], as: "vendor" },
        { model: User, attributes: ["username"], as: "customer" },
        { model: Material, attributes: ["material_name"], as: "material" },
      ],
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(
          true,
          200,
          "Transaction founded",
          transaction,
          null
        )
      );
  } catch (error) {
    return Helper.errorResult(error, res, 400);
  }
};

const createTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { vendor_id, material_id, transaction_date, customer_id } = req.body;
    const userCreated = await Transaction.create({
      vendor_id,
      material_id,
      transaction_date,
      customer_id,
    });
    return res
      .status(201)
      .send(
        Helper.responseSuccess(
          true,
          201,
          "new transaction created",
          userCreated,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const updateTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { transaction_id } = req.params;
    const transactionUpdated = await Transaction.update(req.body, {
      where: { transaction_id },
    });
    if (transactionUpdated[0] === 0) {
      throw new Error("Transaction not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(
          true,
          200,
          "Transaction updated",
          transactionUpdated,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { transaction_id } = req.params;
    const transactionDeleted = await Transaction.destroy({
      where: { transaction_id },
    });
    if (!transactionDeleted) {
      throw new Error("Transaction not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(
          true,
          200,
          "Transaction deleted",
          transactionDeleted,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

export default {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
