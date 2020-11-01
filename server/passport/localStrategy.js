//  로그인을 어떻게 할 지 전략

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const UserService = require('../controllers/auth');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        const userServiceInstance = new UserService(User);
        const { status, message } = await userServiceInstance.login(email, password);
        if(status === 404) done(null, false, { message });
        if(status === 400) done(null, false, { message });
        if(status === 500) done(message);
        if(status === 200) done(null, message); // message: exUser
    }));
}