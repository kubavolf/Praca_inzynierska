const express = require('express');
const UserModel = require('./user.model');
const router = express.Router();


//rejestracja

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const newUser = new UserModel({ username, email, password });
        await newUser.save();
        res.status(201).send({ message: "Rejestracja pomyślna" })

    } catch (error) {
        console.error("Nie udało się zarejestrować", error);
        res.status(500).send({ message: "Nie udało się zarejestrować" })

    }

})









module.exports = router;