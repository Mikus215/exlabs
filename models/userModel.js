import mongoose from "mongoose";

const userSchema = ({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        default: false
    }
})

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel