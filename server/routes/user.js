const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');
const User = require('../models/user');
const Post = require('../models/post');
const { addFollowing } = require('../controller/user');
const UserService = require('../controllers/auth');
const router = express.Router();

// id번 사용자를 팔로잉한다
// /user/${userid}/follow 에서 온다
router.post('/:id/follow', async (req, res, next) => {
    const userServiceInstance = new UserService(User);
    const status = await userServiceInstance.follow(req.user.id, req.params.id);
    if(status === 200) res.status(200).json(req.user.Followings);
    // if(status === 404) res.status(404).send('no user');
    // if(status === 500) res.status(404).send('no user');
});

router.post('/:id/unfollow', async (req, res, next) => {
    const userServiceInstance = new UserService(User);
    const status = await userServiceInstance.unfollow(req.user.id, req.params.id);
    if(status === 200) res.status(200).json(req.user.Followings)
});

// followings 리스트를 보여줌
router.get('/followings', (req, res) => {
    res.status(200).json(req.user.Followings);
});





module.exports = router