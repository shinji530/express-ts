import { User } from "../types/user";
import { IUserRepository } from "../repositories/user.repository.interface";

export class UserService {
  constructor(private userRepository: IUserRepository) {}
  async createUser (data: Pick<User, 'email' | 'name'>): Promise<User> {
    return this.userRepository.create(data);
  }
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}