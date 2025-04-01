import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { Car } from './car/car.entity';
import { CarModule } from './car/car.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TestDriveRequestModule } from './test-drive/test-drive-request.module';
import { TestDriveRequest } from './test-drive/test-drive-request.entity';
import { BuybackRequest } from './buyback/buyback-request.entity';
import { BuybackRequestModule } from './buyback/buyback-request.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'buyback'),
      serveRoot: '/uploads/buyback',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      // @ts-ignore
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Car, TestDriveRequest, BuybackRequest],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CarModule,
    TestDriveRequestModule,
    BuybackRequestModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private userService: UserService) {}

  async onModuleInit() {
    // Ждем 5 секунд перед инициализацией
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log('Starting admin initialization...');
    try {
      await this.userService.createAdminIfNotExists();
      console.log('Admin user initialized successfully');
    } catch (error) {
      console.error('Admin initialization failed:', error);
    }
  }
}
