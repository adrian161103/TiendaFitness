import mongoose from "mongoose";

const statusEnum = ["disponible", "no disponible", "descontinuado"];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nombre es requerido"],
    trim: true,
    lowercase: true,
    unique: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    minLength: 2,
    maxLength: 500,
  },

  status: {
    type: String,
    quantity: Number,
    status: {
      type: String,
      validate: {
        validator: function (status) {
          return statusEnum.includes(status);
        },
        message: (props) => `${props.value} no es un estado valido`,
      },
    },
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
      enum: {
        values: ["USD", "PESOS", "EUR"], 
        message: "{VALUE} no es una moneda válida",
      },
      default: "USD", 
      set: (value) => value.toUpperCase(),
    },
  },
  profiRate: {
    type: Number,
    default: 1.21,
    min: [1, "el margen no puede ser negativo mayor o igual a 1"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category", 
  },
  Highlighted: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    default: 0,
  },
});

productSchema.methods.decreaseStock = function (amount) {
    if ( this.stock < amount) {
        throw new Error("No hay stock suficiente");
    }
    this.stock -= amount;
    return this.save();
};




productSchema.virtual("priceWithProfiRate").get(function () {
  return this.price * this.profiRate;
});

productSchema.set("toJSON", {
  virtuals: true,
}),
  productSchema.set("toObject", {
    virtuals: true,
  });

export default mongoose.model("product", productSchema);
