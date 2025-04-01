import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestDriveRequestService } from './test-drive-request.service';
import { CreateTestDriveRequestDto } from './dto/create-test-drive-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';

@Controller('test-drive-requests')
export class TestDriveRequestController {
  constructor(private readonly requestService: TestDriveRequestService) {}

  @Post()
  async create(@Body() createDto: CreateTestDriveRequestDto) {
    return this.requestService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  findAll() {
    return this.requestService.findAllForManager();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'confirmed' | 'canceled',
    @Req() req: any,
  ) {
    return this.requestService.updateStatus(+id, status, req.user.id);
  }
}
