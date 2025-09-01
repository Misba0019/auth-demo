const bcrypt = require('bcrypt');

// Generate a salt + hash manually
const hashPassword = async(password) => {
        const salt = await bcrypt.genSalt(12); // generate a salt with 12 rounds
        const hash = await bcrypt.hash(password, salt); // hash with the generated salt
        console.log('Salt:', salt);
        console.log('Hashed Password:', hash);
}

// Hash directly with 12 salt rounds
const hashPass = async(password) => {
        const hash = await bcrypt.hash(password, 12);
        console.log('Hashed Password:', hash);
}

// Compare a password with a hashed password
const login = async(password, hashedpass) => {
        const result = await bcrypt.compare(password, hashedpass);
        if(result) {
             console.log('Logged in successfully');
        } else {
             console.log('Login Failed');
        }
};

// Example usage:
hashPass('monkey');
// hashPassword('HelloWorld');
// login('monkey', 'paste-a-hashed-password-here');