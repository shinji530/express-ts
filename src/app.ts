import express, { RequestHandler } from 'express';
import axios from 'axios';
import multer from 'multer';
// import { User } from './mongoose';

const app = express();
const upload = multer({ dest: 'uploads/' });

const handler: RequestHandler = async (req, res, next) => {
  const response = await axios.get('https://learn.codeit.kr/api/codeitmallproducts');
  res.json(response.data);
};

const middleware: RequestHandler = async (req, res, next) => {
  // 인증 로직
  req.userId = `123`;

  next();
}

app.use(middleware);

app.get('/products', handler);

app.get('/', (req, res) => {
  const userId = req.userId;

  res.send();
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send();
});

// mongoose 연동
// app.get('/user', async (req, res) => {
//   const users = await User.find();

//   users.map(user => {
//     user.name
//   });
// });

// app.post('/user', async (req, res) => {
//   User.create({
//     email: 'a@a.com',
//     id: '123',
//     name: 'Alice',
//   })
// })

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
