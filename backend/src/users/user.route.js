const express = require('express');
const UserModel = require('./user.model');
const tokenGeneration = require('./tokens');
const router = express.Router();


//rejestracja

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;


        const newUser = new UserModel({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "Rejestracja pomyślna" })

    } catch (err) {
        console.error("Nie udało się zarejestrować", err);
        res.status(500).json({ message: "Nie udało się zarejestrować" })

    }

})

//logowanie

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }); //sprawdzenie czy taki email istnieje w bazie

        if (!user) {
            return res.status(404).json({ message: 'Takie konto nie istnieje' })
        }
        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Błędne hasło lub email' })
        }

        const token = await tokenGeneration(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).json({
            message: "Logowanie pomyślne", token, userData: {
                _id: user._id,
                status: user.status,
                username: user.username,
                email: user.email
            }

        })

    }
    catch (err) {
        console.error('Błąd podczas logowania:', err);
        res.status(500).json({ message: 'Błąd podczas logowania' });

    }


})









module.exports = router;