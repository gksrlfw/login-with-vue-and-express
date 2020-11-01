const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport')  // passport/index

dotenv.config();
passportConfig(); 

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const { sequelize } = require('./models')

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

// 
sequelize.sync({ force: false})
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  })


app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // /img에서 요청하면 uploads 폴더에 있는 파일을 준다
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);


app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500);    
  // res.json({message: err.message});
  res.json(err.message);
});

module.exports = app;