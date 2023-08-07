const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const complaintSchema = new Schema(
  {
    request: {
      type: String,
      required: true,
      trim: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    read: {
      type: Boolean,
      default: false,
    },
    adminResponse: {
      type: String,
      default: "",
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = model("Complaint", complaintSchema);

module.exports = Complaint;
