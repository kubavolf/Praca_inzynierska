const express = require('express');
const UserModel = require('./user.model');
const tokenGeneration = require('./tokens');
const router = express.Router();

const multer = require('multer');
const path = require('path');


// Konfiguracja multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads')); // Ścieżka do folderu `uploads`
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    }
  });

const upload = multer({ storage });


//rejestracja
router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;


        const newUser = new UserModel({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "Rejestracja pomyślna" })

    }
    
    catch (err) {
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
                message: 'Błędne hasło lub email'
            })
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
                level: user.level,
                username: user.username,
                email: user.email,
                phoneNumb: user.phoneNumb,
                picture: user.picture
            }

        })

    }

    catch (err) {

        console.error('Błąd podczas logowania:', err);
        res.status(500).json({ message: 'Błąd podczas logowania' });

    }


})

//wylogowanie
router.post('/logout', (req, res) => {

    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(200).json({ message: 'Wylogowano' });
    }

    catch (error) {

        console.error('Nie udało się wylogować: ', error);
        res.status(500).json({ message: 'Nie udało się wylogować' })

    }
})

//wszyscy użytkownicy z bazy
router.get('/users', async (req, res) => {

    try {
        const users = await UserModel.find({}, '-password');
        res.status(200).json(users);
    }

    catch (error) {

        console.error('Nie udało się pobrać listy użytkowników: ', error);
        res.status(500).json({ message: 'Nie udało się pobrać listy użytkowników' });

    }
})




//aktualizacja levelu
router.patch('/users/:userId', async (req, res) => {

    try {

        const { userId } = req.params;
        const { level } = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { level },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Nie ma takiego użytkownika' })
        }
        res.status(200).json({ message: 'Zaktualizowano status', updatedUser })
    }

    catch (error) {
        console.error('Nie udało się zaktualizować danych')
        res.status(500).json({ message: 'Nie udało się zaktualizować danych' });

    }
})


//aktualizacja danych
router.patch('/edit-profile', upload.single('picture'), async (req, res) => {

    try {

        const { userId, username, email, phoneNumb } = req.body;
        const updatedInfo = {};

        if (username) updatedInfo.username = username;
        if (email) updatedInfo.email = email;
        if (phoneNumb) updatedInfo.phoneNumb = phoneNumb;

        if (req.file) {
            updatedInfo.picture = `/uploads/${req.file.filename}`;
        }

        console.log('Plik zdjęcia:', req.file); // Log danych przesłanego pliku
        console.log('Body żądania:', req.body); // Log innych danych

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedInfo,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Nie ma takiego użytkownika' });
        }

        res.status(200).json({
            message: 'Dane użytkownika zostały zaktualizowane.',
            updatedUser,
        });
    }
    
    catch (error) {

        console.error('Nie udało się zaktualizować danych:', error);
        res.status(500).json({ message: 'Nie udało się zaktualizować danych.' });
    }
});


//usuwanie użytkownika
router.delete('/users/:userId', async (req, res) => {

    try {
        
        const { userId } = req.params;
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Nie ma takiego użytkownika' });
        }

        res.status(200).json({ message: 'Usunięto użytkownika' });
    }

    catch (error) {
        console.error('Nie udało się usunąć użytkownika:', error);
        res.status(500).json({ message: 'Nie udało się usunąć użytkownika' });

    }
});











module.exports = router;