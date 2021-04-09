const mongoose = require('mongoose');
const config = require('../config/Config')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, config.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (name, password) => {
    const user = await User.findOne({ name })

    if (!user) {
        throw new Error('Unable to login')
    }

    // const isMatch = await bcrypt.compare(password, user.password)
    const isMatch = (password==user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
const User = mongoose.model('User', userSchema);

module.exports = User;
