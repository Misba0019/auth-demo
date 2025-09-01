const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new  mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});

userSchema.statics.findAndValidate = async function(username, password) {
    const user = await this.findOne({ username });
    if(!user) return false;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : false;
};

// Middleware to hash password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next(); // If the password is not modified, skip hashing
    this.password = await bcrypt.hash(this.password, 12); // Hash the password with a salt round of 12
    next();
});
// Set the password to be whatever bcrypt hashes it to

module.exports = mongoose.model('User', userSchema);