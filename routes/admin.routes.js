const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Form = require("../models/Form.model");
const Feedback = require("../models/Feedback.model");
const Complaint = require("../models/Complaint.model");
const Medication = require("../models/Medication.model");
const fileUploader = require("../config/cloudinary.config");

// GET /all form
router.get("/all-forms", async (req, res) => {
  try {
    const allForms = await Form.find()
      .populate("petId")
      .populate("customerId")
      .sort([["createdAt", -1]]);
    res.json(allForms);
  } catch (error) {
    res.json(error);
  }
});
// GET /all pets
router.get("/all-pets", async (req, res) => {
  try {
    const allPets = await Pet.find().populate("customerId");
    res.json(allPets);
  } catch (error) {
    res.json(error);
  }
});
// GET /all feedback
router.get("/all-feedback", async (req, res) => {
  try {
    const allFeedback = await Feedback.find()
      .populate("formId")
      .sort([["createdAt", -1]]);
    res.json(allFeedback);
  } catch (error) {
    res.json(error);
  }
});
// GET /one form
router.get("/form/:formId", async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId)
      .populate("petId")
      .populate("customerId");
    res.json(form);
  } catch (error) {
    res.json(error);
  }
});

// PATCH form
router.patch("/form/:formId", async (req, res) => {
  try {
    const updateRead = await Form.findByIdAndUpdate(
      req.params.formId,
      { read: true },
      { new: true }
    );
    res.status(202).json({ message: "UPDATED" });
  } catch (error) {
    console.log(error);
  }
});

// GET /one feedback
router.get("/feedback/:feedbackId", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.feedbackId).populate(
      "formId"
    );
    res.json(feedback);
  } catch (error) {
    res.json(error);
  }
});
// POST new feedback
router.post("/new-feedback", async (req, res) => {
  try {
    const { medicalHistory, terapy, tips, customerId, formId } = req.body;

    if (medicalHistory === "" || terapy === "") {
      return res.status(400).json({ message: "Provide some text" });
    }
    const createdFeedback = await Feedback.create({
      medicalHistory,
      terapy,
      tips,
      customerId,
      formId,
    });
    return res.status(201).json({ message: "Feedback successfully created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH feedback
router.patch("/feedback/:id", async (req, res) => {
  try {
    const updateRead = await Feedback.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.status(202).json({ message: "UPDATED" });
  } catch (error) {
    console.log(error);
  }
});

// PUT  feedback
router.put("/edit-feedback/:feedbackId", async (req, res) => {
  try {
    const { medicalHistory, terapy, tips, customerId, formId } = req.body;

    if (medicalHistory === "" || terapy === "") {
      return res.status(400).json({ message: "Provide some text" });
    }
    const createdFeedback = await Feedback.findByIdAndUpdate(
      req.params.feedbackId,
      {
        medicalHistory,
        terapy,
        tips,
        customerId,
        formId,
      }
    );
    return res.status(201).json({ message: "Feedback successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//DELETE  Feedback
router.delete("/feedback/:feedbackId", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.feedbackId);
    return res.status(201).json({ message: "Feedback successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET admin/all-complaints
router.get("/all-complaints", async (req, res) => {
  try {
    const allComplaintForms = await Complaint.find()
      .populate("customerId")
      .populate("petId")
      .sort([["createdAt", -1]]);
    res.json(allComplaintForms);
  } catch (error) {
    res.json(error);
  }
});

// PATCH complaint
router.patch("/complaint/:complaintId", async (req, res) => {
  try {
    const updateRead = await Complaint.findByIdAndUpdate(
      req.params.complaintId,
      { read: true },
      { new: true }
    );
    res.status(202).json({ message: "UPDATED" });
  } catch (error) {
    console.log(error);
  }
});

// MEDICATION

// POST medication
router.post("/medication", async (req, res) => {
  const { medName, amount, description, price, image } = req.body;

  try {
    const createdMed = await Medication.create({
      medName,
      amount,
      description,
      price,
      image,
    });
    res.status(201).json(createdMed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.put(
  "/one-medication/:id",
  fileUploader.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    delete payload.image;

    if (req.file) {
      payload.image = req.file.path;
    }

    try {
      const updatedMedication = await Medication.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
        }
      );
      res.status(201).json(updatedMedication);
    } catch (error) {
      res.json(error);
    }
  }
);

//DELETE  Feedback
router.delete("/one-medication/:id", async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Medication Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
