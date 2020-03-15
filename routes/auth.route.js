const { Router } = require('express')
const { check, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs')
const JWT = require("jsonwebtoken")
const config = require('config')

const router = Router()

const User = require("../models/user")

router.post(
  '/register',
  [
    check('email', "Email incorrect").isEmail(),
    check('password', "Password should content minimum 6 symbols").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Your data didn't validate"
      })
    }

    try {
      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      
      if (candidate) {
        res.status(400).json({ message: "this user already exist" })
      }

      const hashedPassword = await bcrypt.hash(password, 8)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: "user created" })

    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  })

router.post(
  '/login',
  [
    check('email', "Email incorrect").normalizeEmail().isEmail(),
    check('password', "Password should exist").isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Your data didn't validate"
      })
    }

    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (user === undefined) {
        return res.status(400).json({ message: "email or password is incorrect" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: "email or password is incorrect" })
      }

      const token = JWT.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ message: "login success" })

    } catch (e) {
      res.status(500).json({ message: "something went wrong, try again" })
    }
  })


module.exports = router