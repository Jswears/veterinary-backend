const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware"); // <== IMPORT
const router = express.Router();

router.get("/signup", (req, res) => {
  res.json("All good in signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    if (password === "" || fullname === "" || email === "") {
      return res
        .status(400)
        .json({ message: "Provide email,  password and full name " });
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    //REGEX for password
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
    }

    // Check if user with same username exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //If username unique, hash password
    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //Create new user in database
    await User.create({
      email,
      fullname,
      password: hashedPassword,
    });

    //New object without password
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; // { email: 'someEmail', password '1234'}
  /* Check if the user exists */
  try {
    const potentialUser = await User.findOne({ email });
    if (potentialUser) {
      /* Check if the password is correct */
      if (bcrypt.compareSync(password, potentialUser.password)) {
        /* Sign the JWT */
        const authToken = jwt.sign(
          { userId: potentialUser._id },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "24h",
          }
        );
        // Sending back the token to the front
        res.status(202).json({ token: authToken });
      } else {
        /* Incorrect password */
        res.status(401).json({ message: "Incorrect password or email" });
      }
    } else {
      /* No user found */
      res.status(401).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server problems" });
  }
});

/* GET route to verify the token */
router.get("/verify", isAuthenticated, async (req, res) => {
  console.log(req.payload);
  const currentUser = await User.findById(req.payload.userId);
  console.log(currentUser);
  res.status(200).json({ message: "Token is valid", currentUser });
});

module.exports = router;
