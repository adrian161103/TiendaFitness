import mongoose from "mongoose";

export const statusEnum = ["AVAILABLE", "NOT AVAILABLE", "DISCONTINUED", ];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nombre es requerido"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: statusEnum,
    required: true,
    default: "AVAILABLE",
  },
  price: {
    amount: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "El precio no puede ser negativo"],
    },
    currency: {
      type: String,
      required: [true, "La moneda es requerida"],
      enum: ["USD", "PESOS", "EUR"], // Corregido: ya no se necesita `values`
      default: "USD",
      set: (value) => value.toUpperCase(),
    },
  },
  profiRate: {
    type: Number,
    default: 1,
    min: [1, "el margen no puede ser menor a 1"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
});

// Método para disminuir stock
productSchema.methods.decreaseStock = async function (amount) {
  if (this.stock < amount) {
    throw new Error("No hay stock suficiente");
  }
  this.stock -= amount;
  return this.save();
};

// Virtual para calcular precio con margen de ganancia
productSchema.virtual("priceWithProfiRate").get(function () {
  return this.price.amount * this.profiRate; // Corregido
});

// Configuración para incluir virtuals en JSON
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("product", productSchema);