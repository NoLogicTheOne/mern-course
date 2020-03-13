const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator")

const router = Router()

const User = require("../models/user")

router.post(
    '/register',
    [
        check('email', "Email incorrect").isEmail(),
        check('password', "Password should content minimum 6 symbols").isLength({min: 6})
    ], 
    async (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Your data didn't validate"
            })
        }
        try {
            const { email, password } = req.body

            const candidate = await User.findOne({email})

            if(candidate !== undefined){
                res.status(400).json({message: "this user already exist"})
            }

            const hashedPassword = await bcrypt.hash(password, email)
            const user = new User({email, password: hashedPassword})
            
            await user.save()

            res.status(201).json({message: "user created"})

        } catch (e) {
            res.status(500).json({message: "something went wrong, try again"})
        }
})

router.post(
    '/login', 
    [
        check('email', "Email incorrect").normalizeEmail().isEmail(),
        check('password', "Password should exist").isExist()
    ], 
async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Your data didn't validate"
        })
    }

    try {
        const { email, password } = req.body

        const user = await User.findOne({email})

        if(user === undefined) {
            return res.status(400).json({message: "email or password is incorrect"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "email or password is incorrect"})
        }

        res.status(200).json({message: "login success"})

    } catch (e) {
        res.status(500).json({message: "something went wrong, try again"})
    }
})


module.exports = router