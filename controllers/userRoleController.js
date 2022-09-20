import mongoose from "mongoose";
import UserRoleModel from "../models/userRoleModel.js";

export const postCreateRoleUser = async (req, res, next) => {
    const { firstName, lastName, email,  role} = req.body;

    try {
        const existUser = await UserRoleModel.findOne({ email })

        if (existUser) return res.status(400).json({ message: 'The user with this email already exists.' })

        await UserRoleModel.create({ firstName, lastName, email, role })

        res.status(201).json({ message: "Created" })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const getUsers = async (req,res,next) => {
    try {
        const users = await UserRoleModel.find();

        res.status(200).json(users);        
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const updateUser = async (req, res, next) => {

    const { id } = req.params
    const { firstName, lastName, email, role } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id ${id}`)


    const updateUser = { firstName, lastName, email, role }

    try {

        const updatedUser = await UserRoleModel.findByIdAndUpdate(id, updateUser)

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const getUser = async (req, res, next) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No rescipe with id ${id}`)

    try {

        const user = await UserRoleModel.findById(id)

        res.status(200).json(user)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const deleteUser = async (req, res, next) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id ${id}`)

    try {
        const user = await UserRoleModel.findById(id)

        await UserRoleModel.deleteOne(user);

        res.status(200);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}