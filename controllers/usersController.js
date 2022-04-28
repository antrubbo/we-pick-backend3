const db = require("../models");
const User = db.Users;
const List = db.Lists
const jwt = require("jsonwebtoken")
const generateAccessToken = require("../helpers/authentication")


const search = async (req, res) => {
    const { username, email } = req.query
    if (username) {
        let foundUser = await User.findAll({ where: { username } })
        if (foundUser.length) res.status(200).send(foundUser)
        else res.status(404).json({ error: "No user associated with that username."})
    } else if (email) {
        const userEmail = await User.findAll({ where: { email } });
        if(userEmail.length) res.status(200).send(userEmail)
        else res.status(404).json({ error: "No user associated with that email address."})
    } 
    // This is prob not how this should function - if the user leaves the username field blank, it sends all users instead of an error msg
    else {
        let allUsers = await User.findAll({
            include: { all: true, nested: true }
        })
        res.status(200).send(allUsers)
    }
}

const getById = async (req, res) => {
    let { id } = req.params;
    let user = await User.findByPk(id)
    if (user) res.status(200).send(user)
    else res.status(404).json({ error: "No user found"})
}

const login = async (req, res) => {
    const { password, email } = req.body
    let foundUser = await User.findAll({ where: { email } })
    const accessToken = generateAccessToken(newUser);
    if (!foundUser.length) {
        // errors.email = 'User not found!';
        res.status(404).json({error: "User not found!!"})
    } else {
        let originalPassword = foundUser[0].password
        console.log("originalPassword: ", originalPassword)
        console.log("password: ", password)
    }
}

const create = async (req, res) => {
    const { username, email, password } = req.body
    try{
        let newUser = await User.create({ username, email, password })
        await List.create({name: "My Movies", user_id: newUser.id})
        // accessToken may or may not be working, keep testing - user IS being created though
        // const accessToken = generateAccessToken(newUser);
        res.status(200).json({ status: "Successful", data: newUser, token: "Bearer" + accessToken })
    } catch(error) {
        res.status(500).json(error)
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req
    let user = await User.findByPk(id)
    if (!user) res.status(400).json({ message: `No user with id ${id} found`})
    await user.update(body)
    if (user) res.status(200).send(user)
    //need to figure out error handling here - maybe validations.js function?
    else res.status(400).json({ message: "Must include all fields!" })
}   

const deleteOne = async (req, res) => {
    let { id } = req.params;
    let result = await User.destroy({ where: { id } });
    // let list = await List.destroy({ where: {user_id: id}})
    if (result) res.status(200).json({ message: "Delete successful!", list: list })
    else res.status(500).json({ message: "No User found to delete!" })

    // crashing and getting this error : error: update or delete on table "Users" violates foreign key constraint "Lists_user_id_fkey" on table "Lists"
}

module.exports = { search, getById, login, create, update, deleteOne }