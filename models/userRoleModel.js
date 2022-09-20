import mongoose from "mongoose";

const userRoleSchema = ({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: true
    }
})

const UserRoleModel = mongoose.model('UserRoleModel', userRoleSchema)

export default UserRoleModel