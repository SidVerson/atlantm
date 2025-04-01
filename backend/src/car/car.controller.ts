import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';
import { multerConfig } from '../config/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @UseInterceptors(FilesInterceptor('photos', 10, multerConfig)) // Исправлено на FilesInterceptor
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createCarDto: CreateCarDto,
    @Req() req: any,
  ) {
    return this.carService.create(
      {
        ...createCarDto,
        photos: files?.map((file) => file.filename) || [], // Добавлена проверка
      },
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  delete(@Param('id') id: string, @Req() req: any) {
    return this.carService.delete(+id, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  @UseInterceptors(FilesInterceptor('photos', 10, multerConfig))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateData: UpdateCarDto, // Используем новый DTO
    @Req() req: any,
  ) {
    const updatePayload = {
      ...updateData,
      ...(files?.length && { photos: files.map((f) => f.filename) }),
    };
    return this.carService.update(+id, updatePayload, req.user.id);
  }
}
