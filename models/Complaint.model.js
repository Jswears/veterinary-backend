const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const complaintSchema = new Schema(
  {
    complaint: {
      type: String,
      required: true,
      trim: true,
    },
    customerId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    petId: {
      type: Schema.ObjectId,
      ref: "Pet",
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Complaint = model("Complaint", complaintSchema);

module.exports = Complaint;
