const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/", (req, res) => {
  res.json({ message: "rota auth funcionando" });
});

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;