const router = require("express").Router();
const usersRoutes = require("./user.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/user", usersRoutes);

module.exports = router;
