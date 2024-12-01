const jwt = require('jsonwebtoken');
const UserModel = require('./user.model');
const router = require('./user.route');
const TOKEN_JWT = process.env.TOKEN;

const tokenGeneration = async (userId) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("Nie ma takiego konta");

        }

        const token = jwt.sign({ userId: user._id, level: user.level },
            TOKEN_JWT, { expiresIn: "30min" });
        return token;
    }
    catch (err) {
        console.error("Błąd podczas generowania tokenu: ", err);

    }
};
module.exports = tokenGeneration