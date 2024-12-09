const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    level: { type: String, default: 'user' },
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phoneNumb: {type: String, reqire: true },
    picture: {type: String, default: '/uploads/default.jpg'}
    

});


// proces hashowania haseł
userSchema.pre('save', async function (done) {

    if (!this.isModified('password'))
        return done();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    done();

})



//porównywanie haseł
userSchema.methods.comparePassword = function(inputedPassword) {
    return bcrypt.compare(inputedPassword, this.password)
    
}


const UserModel = new mongoose.model('User', userSchema);

module.exports = UserModel;