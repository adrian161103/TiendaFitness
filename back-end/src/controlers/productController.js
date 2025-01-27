import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products.length === 0) {
      return res.status(204).json({ message: "there are no products" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error interno del servidor", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = new Product(req.body);
    const { name } = productData;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res
        .status(400)
        .json({ message: `Product ${name} already exists` });
    }
    const saveProduct = await productData.save();
    return res.status(200).json(saveProduct);
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

export const findProductByName = async (req, res) => {
  try {
    const name = req.body.name;
    const parsedName = name.trim().toLowerCase();
    const productExist = await Product.findOne({ name: parsedName });
    if (!productExist) {
      return res
        .status(400)
        .json({ message: `product ${name} does not exist` });
    }
    res.status(200).json({ productExist });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const findProductById = async (req, res) => {
  try {
    const _id = req.params.id;
    const productExist = await Product.findOne({ _id });
    if (!productExist) {
      return res.status(400).json({ message: `product ${_id} does not exist` });
    }
    res.status(200).json({ productExist });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productExist = await Product.findOne({ _id });
    if (!productExist) {
      return res.status(400).json({ message: `product ${_id} does not exist` });
    }
    const updateProduct = await Product.findByIdAndUpdate({ _id }, req.body, {
      new: true
    });
    res.status(200).json({ productExist });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;    
    const productExist = await Product.findOne({ _id: id });
    if (!productExist) {
      return res.status(400).json({ message: `product ${_id} does not exist` });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};