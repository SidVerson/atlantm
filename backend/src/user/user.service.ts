import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAdminIfNotExists() {
    const adminExists = await this.userRepository.findOneBy({
      role: UserRole.ADMIN,
    });

    if (!adminExists) {
      const admin = new User();
      admin.username = 'admin';
      admin.password = await bcrypt.hash('admin', 10);
      admin.role = UserRole.ADMIN;
      await this.userRepository.save(admin);
    }
  }
  // user.service.ts
  async findById(id: number): Promise<User | undefined> {
    // @ts-ignore
    return this.userRepository.findOne({ where: { id } });
  }
  // user.service.ts
  async findOneByUsername(username: string): Promise<User | undefined> {
    // @ts-ignore
    return this.userRepository.findOne({ where: { username } });
  }

  async createManager(userData: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: UserRole.MANAGER,
    });
    return this.userRepository.save(user);
  }

  async findAllManagers() {
    return this.userRepository.find({ where: { role: UserRole.MANAGER } });
  }

  async updateManager(id: number, updateData: Partial<User>) {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOneBy({ id });
  }

  async deleteManager(id: number) {
    return this.userRepository.delete(id);
  }
  // Другие методы...
}
