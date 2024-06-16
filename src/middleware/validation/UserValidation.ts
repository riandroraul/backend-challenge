import { NextFunction, Request, Response } from "express";
import Validator from "validatorjs";
import Helper from "../../utils/response";

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const rules: Validator.Rules = {
      username: "required|string",
    };
    const validate = new Validator({ username }, rules);
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

export { userValidation };
