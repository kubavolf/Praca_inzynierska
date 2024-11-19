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

//logowanie

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }); //sprawdzenie czy taki email istnieje w bazie

        if (!user) {
            return res.status(404).send({ message: 'Takie konto nie istnieje' })
        }
        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).send({ message: 'Błędne hasło lub email' })
        }

        res.status(200).send({ message: "Logowanie pomyślne", user })
    
    }
    catch (err) {
        console.error('Błąd podczas logowania:', err);
        res.status(500).json({message: 'Błąd podczas logowania'});

    }

    
})







module.exports = router;