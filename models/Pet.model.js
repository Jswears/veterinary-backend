const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    specie: {
      type: String,
      enum: ["dog", "cat", "turtle", "rabbit"],
    },
    image: {
      type: String,
    },
    customerId:
    {
        type: Schema.ObjectId,
        ref: 'User'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;