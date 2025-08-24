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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto, BrandResponseDto, PaginatedBrandsResponseDto } from './dto';
import { PaginationQueryDto, PaginatedResponseDto } from '../../common/dto';
import { authorize } from 'passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get brands with pagination' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter brands by status',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (1-based)',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated brands retrieved successfully',
    type: PaginatedBrandsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAllPaginated(
    @Query('status') status?: string,
    @Query() paginationQuery?: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<BrandResponseDto>> {
    if (status) {
      return this.brandsService.findByStatusPaginated(status, paginationQuery || {});
    }
    return this.brandsService.findAllPaginated(paginationQuery || {});
  }

  @Get('code/:brandCode')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get brand by brand code' })
  @ApiParam({ name: 'brandCode', description: 'Brand code' })
  @ApiResponse({
    status: 200,
    description: 'Brand retrieved successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findByBrandCode(
    @Param('brandCode') brandCode: string,
  ): Promise<BrandResponseDto | null> {
    return this.brandsService.findByBrandCode(brandCode);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand retrieved successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findOne(@Param('id') id: string): Promise<BrandResponseDto> {
    return this.brandsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiBody({ type: CreateBrandDto })
  @ApiResponse({
    status: 201,
    description: 'Brand created successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid brand data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() brandData: CreateBrandDto): Promise<BrandResponseDto> {
    return this.brandsService.create(brandData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiBody({ type: UpdateBrandDto })
  @ApiResponse({
    status: 200,
    description: 'Brand updated successfully',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Param('id') id: string,
    @Body() brandData: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    return this.brandsService.update(id, brandData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete brand by ID' })
  @ApiParam({ name: 'id', description: 'Brand ID' })
  @ApiResponse({ status: 204, description: 'Brand deleted successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.brandsService.remove(id);
  }
}
