const router = require("express").Router();
const User = require("../models/User.model");
const Pet = require("../models/Pet.model");
const Form = require("../models/Form.model");
const Feedback = require("../models/Feedback.model");


// GET /all form
router.get("/all-forms", async (req, res) => {

 
    try {
      const allForms = await Form.find().populate('petId').populate('customerId');
      res.json(allForms);
    } catch (error) {
      res.json(error);
    }
  
  
  });
// GET /all pets
  router.get("/all-pets", async (req, res) => {

 
    try {
      const allPets = await Pet.find().populate('customerId');
      res.json(allPets);
    } catch (error) {
      res.json(error);
    }
  
  
  });
// GET /all feedback
router.get("/all-feedback", async (req, res) => {

 
    try {
      const allFeedback = await Feedback.find().populate('formId');
      res.json(allFeedback);
    } catch (error) {
      res.json(error);
    }
  
  
  });
  // GET /one form
router.get("/form/:formId", async (req, res) => {

 
    try {
      const form = await Form.findById(req.params.formId).populate('petId').populate('customerId');
      res.json(form);
    } catch (error) {
      res.json(error);
    }
  
  
  });
// GET /one feedback
router.get("/feedback/:feedbackId", async (req, res) => {

 
    try {
      const feedback = await Feedback.findById(req.params.feedbackId).populate('formId');
      res.json(feedback);
    } catch (error) {
      res.json(error);
    }
  
  
  });
  // POST new feedback
  router.post("/new-feedback", async (req, res) => {
    try {
      const { medicalHistory, terapy, tips, customerId, formId } = req.body;
  
      if (medicalHistory === "" || terapy ==="" ) {
        return res.status(400).json({ message: "Provide some text" });
      }
      const createdFeedback = await Feedback.create({
        medicalHistory, 
        terapy, 
        tips, 
        customerId, 
        formId
      });
      return res.status(201).json({ message: "Feedback successfully created" });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  // PUT  feedback
  router.put("/edit-feedback/:feedbackId", async (req, res) => {
    try {
      const { medicalHistory, terapy, tips, customerId, formId } = req.body;
  
      if (medicalHistory === "" || terapy ==="" ) {
        return res.status(400).json({ message: "Provide some text" });
      }
      const createdFeedback = await Feedback.findByIdAndUpdate(req.params.feedbackId,  {
        medicalHistory, 
        terapy, 
        tips, 
        customerId, 
        formId
      });
      return res.status(201).json({ message: "Feedback successfully updated" });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  //DELETE  Feedback
  router.delete("/feedback/:feedbackId", async (req, res) => {
    try {
      await Feedback.findByIdAndDelete(req.params.feedbackId);
      return res.status(201).json({ message: "Feedback successfully deleted" });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports = router;
