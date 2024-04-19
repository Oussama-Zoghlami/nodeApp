import express from "express";
import { Register, Login, Logout } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";

const router = express.Router();

//Register Route == Post Request
router.post(
    '/register',
    check("email")
        .isEmail()
        .withMessage("Email Incorrect")
        .normalizeEmail(),
    check("first_name")
        .not()
        .isEmpty()
        .withMessage("First Name Incorrect")
        .trim()
        .escape(),    
    check("last_name")
        .not()
        .isEmpty()
        .withMessage("Last Name Incorrect")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password Incorrect"),
    Validate,
    Register
    );

// Login route == POST request
router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
);

router.get("/logout", Logout);

export default router;