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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto, BrandResponseDto } from './dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all brands or filter by status' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter brands by status',
  })
  @ApiResponse({
    status: 200,
    description: 'Brands retrieved successfully',
    type: [BrandResponseDto],
  })
  async findAll(@Query('status') status?: string): Promise<BrandResponseDto[]> {
    if (status) {
      return this.brandsService.findByStatus(status);
    }
    return this.brandsService.findAll();
  }

  @Get('code/:brandCode')
  @ApiOperation({ summary: 'Get brand by brand code' })
  @ApiParam({ name: 'brandCode', description: 'Brand code' })
  @ApiResponse({
    status: 200,
    description: 'Brand retrieved successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async findByBrandCode(
    @Param('brandCode') brandCode: string,
  ): Promise<BrandResponseDto | null> {
    return this.brandsService.findByBrandCode(brandCode);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand retrieved successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async findOne(@Param('id') id: string): Promise<BrandResponseDto> {
    return this.brandsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({
    status: 201,
    description: 'Brand created successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid brand data' })
  async create(@Body() brandData: CreateBrandDto): Promise<BrandResponseDto> {
    return this.brandsService.create(brandData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiBody({ type: UpdateBrandDto })
  @ApiResponse({
    status: 200,
    description: 'Brand updated successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async update(
    @Param('id') id: string,
    @Body() brandData: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    return this.brandsService.update(id, brandData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({ status: 204, description: 'Brand deleted successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.brandsService.remove(id);
  }
}
