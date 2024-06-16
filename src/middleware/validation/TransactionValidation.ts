import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Helper from "../../utils/response";

const transactionValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { vendor_id, material_id, customer_id, transaction_date } = req.body;
    const rules: Validator.Rules = {
      vendor_id: "required|numeric",
      material_id: "required|numeric",
      customer_id: "required|numeric",
      transaction_date: "required|date",
    };
    const validate = new Validator(
      { vendor_id, material_id, customer_id, transaction_date },
      rules
    );
    if (validate.fails()) {
      const { errors } = validate.errors;
      return res
        .status(400)
        .send(Helper.responseData(400, "Bad Request", errors, null));
    }
    next();
  } catch (error) {
    return res.status(500).send(Helper.responseData(500, "", error, null));
  }
};

export { transactionValidation };
