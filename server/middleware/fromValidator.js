import { body } from "express-validator";

const formValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .escape()
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .escape()
    .trim(),
  body("message")
    .notEmpty()
    .escape()
    .withMessage("Message is required")
    .isString()
    .withMessage("Message must be a string")
    .trim(),
];

export default formValidator;
