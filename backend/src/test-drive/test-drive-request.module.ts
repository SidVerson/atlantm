import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDriveRequest } from './test-drive-request.entity';
import { TestDriveRequestService } from './test-drive-request.service';
import { TestDriveRequestController } from './test-drive-request.controller';
import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestDriveRequest, User, Car])],
  controllers: [TestDriveRequestController],
  providers: [TestDriveRequestService],
})
export class TestDriveRequestModule {}
