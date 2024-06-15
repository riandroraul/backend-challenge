import { Request, Response } from "express";
import Helper from "../utils/response";
import Material from "../db/models/Material";

const getMaterials = async (req: Request, res: Response): Promise<Response> => {
  try {
    const materials = await Material.findAll();
    return res
      .status(200)
      .send(
        Helper.responseSuccess(
          true,
          200,
          "success get all material",
          materials,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const getMaterialById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { material_id } = req.params;
    const material = await Material.findByPk(material_id);
    console.log(material);

    if (!material) {
      throw new Error("Material not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(true, 200, "Material founded", material, null)
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const createMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { material_name } = req.body;
    const materialCreated = await Material.create({ material_name });
    return res
      .status(201)
      .send(
        Helper.responseSuccess(
          true,
          201,
          "new material created",
          materialCreated,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const updateMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { material_id } = req.params;
    const { material_name } = req.body;
    const materialUpdated = await Material.update(
      { material_name },
      { where: { material_id } }
    );
    // console.log(materialUpdated);

    if (materialUpdated[0] == 0) {
      throw new Error("Material not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(
          true,
          201,
          "Material updated",
          materialUpdated,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

const deleteMaterial = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { material_id } = req.params;
    const materialDeleted = await Material.destroy({
      where: {
        material_id,
      },
    });
    if (!materialDeleted) {
      throw new Error("Material not found");
    }
    return res
      .status(200)
      .send(
        Helper.responseSuccess(
          true,
          200,
          "Material deleted",
          materialDeleted,
          null
        )
      );
  } catch (error: any) {
    return Helper.errorResult(error, res, 400);
  }
};

export default {
  getMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
