import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(
    createCarDto: CreateCarDto & { photos: string[] },
    userId: number,
  ): Promise<Car> {
    const car = this.carRepository.create({
      ...createCarDto,
      photos: createCarDto.photos,
      createdBy: { id: userId },
    });
    return this.carRepository.save(car);
  }
  async findAll(): Promise<Car[]> {
    return this.carRepository.find({ relations: ['createdBy'] });
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.carRepository.delete({ id, createdBy: { id: userId } });
  }

  async findOne(id: number): Promise<Car> {
    //@ts-ignore
    return this.carRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
  }

  async update(
    id: number,
    updateData: Partial<Car>,
    userId: number,
  ): Promise<Car> {
    await this.carRepository.update(
      { id, createdBy: { id: userId } },
      updateData,
    );
    return this.findOne(id);
  }
}
