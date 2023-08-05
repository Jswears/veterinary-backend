const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const formSchema = new Schema(
  {
   request: {
      type: String,
      required: true,
      trim: true,
    },
    customerId:
    {
        type: Schema.ObjectId,
        ref: 'User'
    },
    petId:
    {
        type: Schema.ObjectId,
        ref: 'Pet'
    },
    read:{
        type: Boolean,
        default: false 
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Form = model("Form", formSchema);

module.exports = Form;