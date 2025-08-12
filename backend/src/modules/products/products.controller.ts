import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: Partial<Product>,
  ): Promise<Product | null> {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}