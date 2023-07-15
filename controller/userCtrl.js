const { generateToken } = require("../config/jwToken")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        // create a new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error("User Already Exits")
    }
})

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // check if user exits or not
    const findUser = await User.findOne({ email })
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?.id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        })
    } else {
        throw new Error("Invalid Credentials")
    }
})

//get all user
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

//get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getaUser = await User.findById(id)
        res.json({
            getaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
})

//delete user
const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteaUser = await User.findByIdAndDelete(id)
        res.json({
            deleteaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
})

//update user
const updateaUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const updateaUser = await User.findByIdAndUpdate(
            id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        )
        res.json({
            updateaUser,
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    createUser,
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updateaUser,
}
