import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateBuybackRequestDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  mileage: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsPhoneNumber('RU')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  photos: string[];
}
