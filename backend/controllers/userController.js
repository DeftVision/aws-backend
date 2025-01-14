const userModel = require('../models/userModel');
const res = require("express/lib/response");

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