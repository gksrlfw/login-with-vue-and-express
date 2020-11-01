const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserService = require('../controllers/auth');
const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

const router = express.Router();

// 회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const userServiceInstance = new UserService(User);
    const { status, message } 
    = await userServiceInstance.join(req.body.email, req.body.nick, req.body.password);
    console.log(status, message);
    if(status === 500) return next(message);
    return res.status(status).send(message);
});

// 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error("error: ",authError);
            return res.status(200).send(info.message);    
        }
        if(!user) return res.status(200).send(info.message);
        return req.login(user, (pwdError) => {
            if(pwdError) return res.send(pwdError);
            return res.status(200).send({   
                email: user.dataValues.email,
                nick: user.dataValues.nick,
                id: user.dataValues.id
            });
        });
    })(req, res, next);
});

// 새로고침
router.get('/relogin', (req, res, err) => {
    if(req.isAuthenticated()) res.status(200).send(req.user)
    else res.status(500).send('로그인 풀린상태')
})

// 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();           
    req.session.destroy();  
    res.send('succeed');
});

module.exports = router;