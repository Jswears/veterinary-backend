const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const feedbackSchema = new Schema(
  {
   medicalHistory: {
      type: String,
      required: true,
      trim: true,
    },
    terapy: {
        type: String,
        trim: true,
      },
      tips: {
        type: String,
        trim: true,
      },
    customerId:
    {
        type: Schema.ObjectId,
        ref: 'User'
    },
    formId:
    {
        type: Schema.ObjectId,
        ref: 'Form'
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

const Feedback = model("Feedback", feedbackSchema);

module.exports = Feedback;