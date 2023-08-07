const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Form = require("../models/Form.model");
const fileUploader = require("../config/cloudinary.config");
const Feedback = require("../models/Feedback.model");
const Complaint = require("../models/Complaint.model");

// POST user/new-pet
router.post("/new-pet", fileUploader.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    const { name, age, specie, customerId, image } = req.body;
    if (!req.file) {
      return console.log("error");
    }

    if (name === "" || specie === "" || age === "") {
      return res.status(400).json({ message: "Provide name, species and age" });
    }

    const createdPet = await Pet.create({
      name,
      age,
      specie,
      image: req.file.path,
      customerId,
    });
    return res
      .status(201)
      .json({ message: "Pet created", fileUrl: req.file.path });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /user/your-pets
router.get("/your-pets/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const allPets = await Pet.find({ customerId });
    res.json(allPets);
  } catch (error) {
    res.json(error);
  }
});
// GET /user/one-pet/:id
router.get("/one-pet/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const onePet = await Pet.findById(id);
    if (!onePet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(onePet);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /user/one-pet/:id
router.put("/one-pet/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, specie, image } = req.body;
  try {
    //req.body might work, if no, deconstruct.
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { name, age, specie, image },
      { new: true }
    );
    res.json(updatedPet);
  } catch (error) {
    res.json(error);
  }
});
// POST /user/new-form
router.post("/new-form", async (req, res) => {
  try {
    const { request, customerId, petId } = req.body;

    if (request === "") {
      return res.status(400).json({ message: "Provide some text" });
    }
    const createdForm = await Form.create({
      request,
      customerId,
      petId,
    });
    return res.status(201).json({ message: "Form successfully created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
// GET /user/your-forms
router.get("/your-forms/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const allForms = await Form.find({ customerId }).populate("petId");
    res.json(allForms);
  } catch (error) {
    res.json(error);
  }
});
router.get("/feedbacks/:customerId", async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find({
      customerId: req.params.customerId,
    }).populate("formId");
    res.json(allFeedbacks);
  } catch (error) {
    res.json(error);
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

// POST /user/complaint
router.post("/new-complaint", async (req, res) => {
  try {
    const { complaint, customerId, petId } = req.body;
    if (complaint === "") {
      return res.status(400).json({ message: "Provide some text" });
    }
    const createdComplaint = await Complaint.create({
      complaint,
      customerId,
      petId,
    });
    return res.status(201).json({ message: "Complaint has been sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
