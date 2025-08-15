import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto, BrandResponseDto } from './dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  async findAll(@Query('status') status?: string): Promise<BrandResponseDto[]> {
    if (status) {
      return this.brandsService.findByStatus(status);
    }
    return this.brandsService.findAll();
  }

  @Get('code/:brandCode')
  async findByBrandCode(@Param('brandCode') brandCode: string): Promise<BrandResponseDto | null> {
    return this.brandsService.findByBrandCode(brandCode);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BrandResponseDto> {
    return this.brandsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() brandData: CreateBrandDto): Promise<BrandResponseDto> {
    return this.brandsService.create(brandData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() brandData: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    return this.brandsService.update(id, brandData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.brandsService.remove(id);
  }
}