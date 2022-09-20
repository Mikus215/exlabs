import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwk from 'jsonwebtoken'

export const postCreateUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const existUser = await UserModel.findOne({ email })

        if (existUser) return res.status(400).json({ message: 'The user with this email already exists.' })

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await UserModel.create({ name, email, password: hashedPassword })

        const token = jwk.sign({ user }, process.env.JWK_TOKEN, { expiresIn: '1h' })

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true })
        res.status(200).json({ userId: user._id, userName: user.name })
    } catch (error) {
        res.clearCookie("token")
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const postLoginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (!user) return res.status(404).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" })

        const token = jwk.sign({ user }, process.env.JWK_TOKEN, { expiresIn: '1h' })

        res.cookie("token", token, { httpOnly: true, sameSite: 'none', secure: true })
        res.status(200).json({ userId: user._id, userName: user.name })
    } catch (error) {
        console.log(error);
        res.clearCookie("token")
        res.status(401).json({ message: 'Unauthorized' })
    }
}

export const deleteCookie = (req, res, next) => {
    res
        .status(202)
        .clearCookie("token").json({ message: 'Clear Cookie' })
}

export const getUsers = (req, res, next) => {
    
}