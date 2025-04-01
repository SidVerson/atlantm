import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../car/car.entity';
import { User } from '../user/user.entity';

@Entity()
export class TestDriveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  preferredDate: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'canceled';

  @ManyToOne(() => Car, (car) => car.testDriveRequests)
  car: Car;

  @ManyToOne(() => User, { nullable: true })
  processedBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
