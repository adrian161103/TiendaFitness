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
      .json({ message: "Internal server error", error });
  }
};

export const createProduct = async (req, res) => {
  console.log("Contenido de req.body:", req.body);
  try {
    const data = { ...req.body };

    if (data["price[amount]"] && data["price[currency]"]) {
      data.price = {
        amount: Number(data["price[amount]"]),
        currency: data["price[currency]"].toUpperCase(),
      };
      delete data["price[amount]"];
      delete data["price[currency]"];
    }

    if (req.file) {
      data.imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }

    if (data.name) {
      data.name = data.name.trim().toLowerCase();
    }

    if (!data.name) {
      return res.status(400).json({ message: "El nombre es requerido" });
    }
    if (!data.price || data.price.amount === undefined) {
      return res.status(400).json({ message: "El precio es requerido" });
    }

    const productExist = await Product.findOne({ name: data.name });
    if (productExist) {
      return res
        .status(400)
        .json({ message: `El producto ${data.name} ya existe` });
    }

    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
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
      return res.status(400).json({ message: `product  does not exist` });
    }
    res.status(200).json( productExist );
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productExist = await Product.findOne({ _id });
    if (!productExist) {
      return res.status(400).json({ message: `product  does not exist` });
    }
    const updateProduct = await Product.findByIdAndUpdate({ _id }, req.body, {
      new: true
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;    
    const productExist = await Product.findOne({ _id });
    if (!productExist) {
      return res.status(400).json({ message: `product  does not exist` });
    }
    await Product.findByIdAndDelete({ _id });
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};