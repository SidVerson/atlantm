import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Car } from '../car/car.entity';
import { BuybackRequest } from './buyback-request.entity';
import { BuybackRequestController } from './buyback-request.controller';
import { BuybackRequestService } from './buyback-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([BuybackRequest, User, Car])],
  controllers: [BuybackRequestController],
  providers: [BuybackRequestService],
})
export class BuybackRequestModule {}
