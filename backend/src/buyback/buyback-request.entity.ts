import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class BuybackRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column({ nullable: true })
  vin: string;

  @Column('text')
  description: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column('simple-array')
  photos: string[];

  @Column({ default: 'new' })
  status: 'new' | 'in_progress' | 'completed';

  @ManyToOne(() => User, { nullable: true })
  processedBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
