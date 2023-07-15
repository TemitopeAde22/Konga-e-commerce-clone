const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        lastname: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "User",
        },
        cart: {
            type: Array,
            default: [],
        },
        address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
        whislist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
//Export the model
module.exports = mongoose.model("User", userSchema)
