const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        if (!users) {
            return res.status(404).send({ message: 'No user found' })
        } else { return res.status(200).send({ userCount: users.length, users: users }) }

    }
    catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: 'missing required fields'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({
                message: 'user not found'
            })
        }

        if (!user.isActive) {
            return res.status(403).send({
                message: 'this account is inactive, contact your administrator'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).send({
                message: 'error logging in - check credentials',
            })
        }
        return res.status(201).send({
            message: 'user logged in successfully',
            user: { email, password }
        })
    }
    catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error });
    }
}