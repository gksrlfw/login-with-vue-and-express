const express = require('express');
const postService = require('../controllers/post');
const { Post } = require('../models');
const { checkFolder, uploadImage, uploadPost } = require('../controllers/utils');
const { isLoggedIn, isNotLoggedIn } = require('../controllers/middlewares');

const router = express.Router();

checkFolder();

// 이미지 업로드
router.post('/img', isLoggedIn, uploadImage.single('image'), (req, res) => {
    res.json({ url: `/img/${req.file.filename}` });
});

// 포스트 업로드
router.post('/', isLoggedIn, uploadPost.none(), async (req, res, next) => {
    const postServiceInstance = new postService(Post);
    const status = await postServiceInstance.uploadPost(req.body.content, req.body.url, req.user.id);
    if(status === 200) res.status(200).send('ok');  // send를 안하면 프론트로 응답이 안간다...
    else res.status(500);
});

router.get('/list', async (req, res, next) => {
    const postServiceInstance = new postService(Post);
    const postList = await postServiceInstance.getPostList();
    if(postList === 500) res.status(500);
    else res.status(200).json(postList);
});

// 게시글 삭제
router.delete('/:id/delete', async (req, res, next) => {
    const postServiceInstance = new postService(Post);
    const status = await postServiceInstance.deletePost(req.user.id, req.params.id);
    if(status === 200) res.status(200).send('ok');
    else res.status(500);
});

module.exports = router;