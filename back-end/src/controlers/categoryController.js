import Category from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(204).json({ message: "there are no categoriesd" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error intero del servidor", error });
  }
};

export const createCategory = async (req, res) => {
  try {
    //verificamos que la categoria sea unica (que no exista)
    const name = req.body.name;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({ name });
    //creamos una constante llamada response (solo para que nos retorne el estado), si no el await va con lo demas sin la const
    const response = await newCategory.save();
    return res.status(201).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error interno del servidor", error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const categoryExist = await Category.findOne({ _id });
    if (!categoryExist) {
      return res.status(400).json({ message: "Category does not exists" });
    }
    const response = await Category.findByIdAndDelete(_id);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error interno del servidor", error });
  }
};
