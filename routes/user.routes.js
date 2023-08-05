const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Form = require("../models/Form.model");
const fileUploader = require("../config/cloudinary.config");

// POST /api/new-pet
router.post("/new-pet", fileUploader.single("image"), async (req, res) => {
  try {
    const { name, age, specie, customerId } = req.body;
    let image=''
    if (req.file) {
      image = req.file.path;
    }

    if (name === "" || specie === "" || age === "") {
      return res.status(400).json({ message: "Provide name, species and age" });
    }
    
    const createdPet = await Pet.create({
      name,
      age,
      specie,
      image,
      customerId,
    });
    return res.status(201).json({ message: "Pet created" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/your-pets
router.get("/your-pets/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const allPets = await Pet.find({ customerId });
    res.json(allPets);
  } catch (error) {
    res.json(error);
  }
});
// GET /api/one-pet/:id
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

// PUT /api/one-pet/:id
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
// POST /api/new-form
router.post("/new-form", async (req, res) => {
  try {
    const { request, customerId, petId } = req.body;

    if (request === "") {
      return res.status(400).json({ message: "Provide some text" });
    }
    const createdForm = await Form.create({
      request,
      customerId,
      petId
    });
    return res.status(201).json({ message: "Form successfully created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
// GET /api/your-forms
router.get("/your-forms/:customerId", async (req, res) => {

  const { customerId } = req.params;
  try {
    const allForms = await Form.find({ customerId }).populate('petId');
    res.json(allForms);
  } catch (error) {
    res.json(error);
  }


});
// GET /api/your-feedback

module.exports = router;
