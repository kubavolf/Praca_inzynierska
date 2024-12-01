const jwt = require('jsonwebtoken');
const TOKEN_JWT = process.env.TOKEN;

const tokenVerify = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Nie otrzymano tokenu' })
        }

        const decoded = jwt.verify(token, TOKEN_JWT);
        if(!decoded){
            return res.status(401).json({message: 'Błędny token'})
        }
        req.userId = decoded.userId;
        req.level = decoded.level;
        next();
    }
    catch (error) {
        console.error('Podczas procesu weryfikacji wystąpił błąd', err);
        res.status(401).json({message: 'Podczas procesu weryfikacji wystąpił błąd'})

    }
};
module.exports = tokenVerify