import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class CreateTestDriveRequestDto {
  @IsNotEmpty()
  fullName: string;

  @IsPhoneNumber('RU')
  phone: string;

  @IsEmail()
  email: string;

  @IsDateString()
  preferredDate: Date;

  @IsNotEmpty()
  carId: number;
}
