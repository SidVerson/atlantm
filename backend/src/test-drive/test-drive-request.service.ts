import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDriveRequest } from './test-drive-request.entity';
import { CreateTestDriveRequestDto } from './dto/create-test-drive-request.dto';

@Injectable()
export class TestDriveRequestService {
  constructor(
    @InjectRepository(TestDriveRequest)
    private requestRepository: Repository<TestDriveRequest>,
  ) {}

  async create(
    createDto: CreateTestDriveRequestDto,
  ): Promise<TestDriveRequest> {
    const request = this.requestRepository.create({
      ...createDto,
      car: { id: createDto.carId },
    });
    return this.requestRepository.save(request);
  }

  async findAllForManager(): Promise<TestDriveRequest[]> {
    return this.requestRepository.find({
      relations: ['car', 'processedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(
    id: number,
    status: string,
    managerId: number,
  ): Promise<TestDriveRequest> {
    await this.requestRepository.update(id, {
      // @ts-ignore
      status,
      processedBy: { id: managerId },
    });
    // @ts-ignore
    return this.requestRepository.findOneBy({ id });
  }
}
