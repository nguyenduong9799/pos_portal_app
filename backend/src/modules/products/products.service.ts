import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationQueryDto, PaginatedResponseDto, PaginationMetaDto } from '../../common/dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(paginationQuery?: PaginationQueryDto): Promise<PaginatedResponseDto<Product>> {
    const page = paginationQuery?.page || 1;
    const limit = paginationQuery?.limit || 10;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      relations: ['category', 'brand'],
      skip,
      take: limit,
      order: {
        displayOrder: 'ASC', // Order by display order
        name: 'ASC', // Then by name
      },
    });

    const meta = new PaginationMetaDto(page, limit, total);
    return new PaginatedResponseDto(products, meta);
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });
  }

  async create(productData: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(
    id: string,
    productData: UpdateProductDto,
  ): Promise<Product | null> {
    await this.productRepository.update(id, productData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
