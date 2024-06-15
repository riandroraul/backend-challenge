import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../utils/response";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll();
    return res
      .status(200)
      .send(
        Helper.responseSuccess(true, 200, "success get all user", users, null)
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error("User not found");
    }
    return res
      .status(200)
      .send(Helper.responseSuccess(true, 200, "user founded", user, null));
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username } = req.body;
    const userCreated = await User.create({ username });
    return res
      .status(201)
      .send(
        Helper.responseSuccess(true, 201, "new user created", userCreated, null)
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id } = req.params;
    const { username } = req.body;
    const userUpdated = await User.update({ username }, { where: { user_id } });
    if (userUpdated) {
      throw new Error("User not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(true, 201, "new user created", userUpdated, null)
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { user_id } = req.params;
    const userDeleted = await User.destroy({
      where: {
        user_id,
      },
    });
    if (!userDeleted) {
      throw new Error("User not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(true, 200, "User deleted", userDeleted, null)
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
