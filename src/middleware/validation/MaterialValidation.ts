import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Helper from "../../utils/response";

const materialValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { material_name } = req.body;
    const rules: Validator.Rules = {
      material_name: "required|string",
    };
    const validate = new Validator({ material_name }, rules);
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

export { materialValidation };
