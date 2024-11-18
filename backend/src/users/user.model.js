const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    status: { type: String, default: 'user' },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }

});

userSchema.pre('save', async function (done) {

    if (!this.isModified('password'))
        return done();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    done();

})


const User = new mongoose.model('User', userSchema);

module.exports = User;