const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const medicationSchema = new Schema(
  {
    medName: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Medication = model("Medication", medicationSchema);

module.exports = Medication;
