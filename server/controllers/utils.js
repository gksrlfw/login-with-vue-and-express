const path = require('path');
const fs = require('fs');
const multer = require('multer');

const checkFolder = _ => {
    try {
        fs.readdirSync('uploads');
    } catch (error) {
        console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
}
  
const uploadImage = multer({
    storage: multer.diskStorage({
    destination(req, file, cb) {  // uploads 파일에 저장
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadPost = multer();

module.exports = {
    checkFolder,
    uploadImage,
    uploadPost
}