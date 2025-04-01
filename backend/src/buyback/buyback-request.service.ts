import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuybackRequest } from './buyback-request.entity';
import { CreateBuybackRequestDto } from './dto/create-buyback-request.dto';

@Injectable()
export class BuybackRequestService {
  constructor(
    @InjectRepository(BuybackRequest)
    private repo: Repository<BuybackRequest>,
  ) {}

  async create(createDto: CreateBuybackRequestDto): Promise<BuybackRequest> {
    const request = this.repo.create(createDto);
    return this.repo.save(request);
  }

  async findAll(): Promise<BuybackRequest[]> {
    return this.repo.find({ relations: ['processedBy'] });
  }
  async findOne(id: number): Promise<BuybackRequest> {
    // @ts-ignore
    return this.repo.findOne({
      where: { id },
      relations: ['processedBy'],
    });
  }
  async updateStatus(
    id: number,
    status: string,
    managerId: number,
  ): Promise<BuybackRequest> {
    await this.repo.update(id, {
      // @ts-ignore
      status,
      processedBy: { id: managerId },
    });
    // @ts-ignore
    return this.repo.findOneBy({ id });
  }
}
