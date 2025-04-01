import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { TestDriveRequest } from '../test-drive/test-drive-request.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column()
  mileage: number;

  @Column('text')
  description: string;

  @Column('simple-array')
  photos: string[];

  @Column({ default: 'active' })
  status: 'active' | 'sold';

  @ManyToOne(() => User, (user) => user.cars)
  createdBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'varchar', length: 50 })
  engineType: string; // бензин, дизель, электро

  @Column()
  enginePower: number; // в л.с.

  @Column({ type: 'varchar', length: 20 })
  driveType: string; // передний, задний, полный

  @Column('decimal', { precision: 3, scale: 1 })
  engineVolume: number; // в литрах

  @Column({ type: 'varchar', length: 50 })
  bodyType: string; // седан, хэтчбек и т.д.

  @Column()
  seatsNumber: number;

  @Column()
  width: number; // в мм

  @Column()
  doorsNumber: number;

  @Column()
  length: number; // в мм

  @Column()
  height: number; // в мм

  @Column({ type: 'varchar', length: 50 })
  transmission: string; // автомат, механика

  @Column()
  curbWeight: number; // в кг

  @Column()
  gearsNumber: number;

  @Column()
  grossWeight: number; // в кг

  @Column({ type: 'varchar', length: 100 })
  showroomLocation: string;

  @OneToMany(() => TestDriveRequest, (request: any) => request.car)
  testDriveRequests: TestDriveRequest[];
}
