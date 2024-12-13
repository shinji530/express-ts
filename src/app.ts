import express, { RequestHandler } from 'express';
import axios from 'axios';
import multer from 'multer';
import { MongooseUserRepository } from './repositories/mongoose/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaUserRepository } from './repositories/prisma/user.repository';
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

// Hexagonal Architecture
// repository: db에 접근하는 인터페이스스
const userRepository = new MongooseUserRepository();
const prismaUserRepository = new PrismaUserRepository();

// service: 비즈니스 로직이 직성된 곳곳
const userService = new UserService(userRepository);

// controller: endpoint와 매핑해서 service를 연결해주는 곳
const userController = new UserController(userService);

app.post('/users', userController.create);
app.get('/users/:id', userController.getUserById);
app.get('/users', userController.getAllUsers);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
