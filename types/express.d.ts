import Express from 'express';
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      userId: string,
      User?: User
    }
  }
}

// tsconfig 설정 필요
// "typeRoots": [
//     "./types",
//     "./node_modules/@types"
//   ],   