const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Form = require("../models/Form.model");
const fileUploader = require("../config/cloudinary.config");
const Feedback = require("../models/Feedback.model");
const Complaint = require("../models/Complaint.model");
const Medication = require("../models/Medication.model");
const stripe = require("stripe")("sk_test_Y17KokhC3SRYCQTLYiU5ZCD2");

// POST user/new-pet
router.post("/new-pet", fileUploader.single("image"), async (req, res) => {
 
  try {
   // const { name, age, specie, customerId, image } = req.body;
   const payload = { ...req.body }

   if (req.file) {
    payload.image = req.file.path;
 }
 else{
   delete payload.image;
 }

    if (payload.name === "" || payload.specie === "" || payload.age === "") {
      return res.status(400).json({ message: "Provide name, species and age" });
    }
    const createdPet = await Pet.create(
      payload
    );
    return res
      .status(201)
      .json({ message: "Pet created" });
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
router.put("/one-pet/:id", fileUploader.single("image"), async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body }


  if (req.file) {
     payload.image = req.file.path;
  }
  else{
    delete payload.image;
  }
console.log(payload)
  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, payload, { new: true });
    res.status(201).json(updatedPet);
  } catch (error) {
    res.json(error);
  }
});

// DELETE pet
router.delete("/one-pet/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Pet.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
    const allForms = await Form.find({ customerId })
      .populate("petId")
      .sort([["createdAt", -1]]);
    res.json(allForms);
  } catch (error) {
    res.json(error);
  }
});

router.get("/feedbacks/:customerId", async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find({
      customerId: req.params.customerId,
    })
      .populate("formId")
      .sort([["createdAt", -1]]);
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

// GET all medication
router.get("/medication", async (req, res) => {
  try {
    const allMedication = await Medication.find();
    res.status(200).json(allMedication);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//GET one medication
router.get("/medication/:medId", async (req, res) => {
  try {
    const oneMedication = await Medication.findById(req.params.medId);
    res.status(200).json(oneMedication);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const calculateOrderAmount = (items) => {
  return 1400;
};

router.post("/medication/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
module.exports = router;
