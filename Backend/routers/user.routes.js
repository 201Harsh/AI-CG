const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const middlware = require("../middleware/user.middleware");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .isLength({ min: 8 })
      .withMessage("Email should be at least 8 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get('/profile', middlware.AuthUser, userController.getUserProfile)

router.get('/logout', middlware.AuthUser ,userController.logoutUser)

module.exports = router;
