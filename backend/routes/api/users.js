const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName,lastName,email, username, password } = req.body;
    try {
      const user = await User.signup({ firstName,lastName,email, username, password });
      await setTokenCookie(res, user);

      console.log(firstName)
      return res.json({
        user,
      });
    } catch (e){
      console.log(e.errors)
      e.status = 403
      e.message = "User already exists"
      return res.status(403).json({
        message : e.message,
        statusCode : e.status,
        errors : {
          email:  "User with that email already exists"
        }
      })
    }

    // const user = await User.signup({ firstName,lastName,email, username, password });

  }
);



module.exports = router;
