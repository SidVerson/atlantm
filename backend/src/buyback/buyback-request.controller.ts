import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BuybackRequestService } from './buyback-request.service';
import { CreateBuybackRequestDto } from './dto/create-buyback-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

@Controller('buyback-requests')
export class BuybackRequestController {
  constructor(private readonly service: BuybackRequestService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10, multerConfig))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createDto: CreateBuybackRequestDto,
  ) {
    return this.service.create({
      ...createDto,
      photos: files.map((f) => f.filename),
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'in_progress' | 'completed',
    @Req() req: any,
  ) {
    return this.service.updateStatus(+id, status, req.user.id);
  }
}
