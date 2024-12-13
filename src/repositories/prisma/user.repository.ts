import { PrismaClient } from '@prisma/client';
import { User } from '../../types/user';
import { IUserRepository } from '../user.repository.interface';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Pick<User, 'email' | 'name'>): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }
}