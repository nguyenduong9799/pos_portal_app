import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../../entities';
import { CreateBrandDto, UpdateBrandDto, BrandResponseDto } from './dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.brandRepository.find({
      relations: ['brandAccounts', 'stores', 'products'],
    });

    return brands.map(brand => this.mapToResponseDto(brand));
  }

  async findOne(id: string): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['brandAccounts', 'stores', 'products', 'categories', 'menus'],
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return this.mapToResponseDto(brand);
  }

  async create(brandData: CreateBrandDto): Promise<BrandResponseDto> {
    const brand = this.brandRepository.create(brandData);
    const savedBrand = await this.brandRepository.save(brand);
    
    return this.findOne(savedBrand.id);
  }

  async update(id: string, brandData: UpdateBrandDto): Promise<BrandResponseDto> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    await this.brandRepository.update(id, brandData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const brand = await this.brandRepository.findOne({ where: { id } });
    
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    await this.brandRepository.delete(id);
  }

  async findByStatus(status: string): Promise<BrandResponseDto[]> {
    const brands = await this.brandRepository.find({
      where: { status },
      relations: ['brandAccounts', 'stores', 'products'],
    });

    return brands.map(brand => this.mapToResponseDto(brand));
  }

  async findByBrandCode(brandCode: string): Promise<BrandResponseDto | null> {
    const brand = await this.brandRepository.findOne({
      where: { brandCode },
      relations: ['brandAccounts', 'stores', 'products'],
    });

    return brand ? this.mapToResponseDto(brand) : null;
  }

  private mapToResponseDto(brand: Brand): BrandResponseDto {
    return {
      id: brand.id,
      name: brand.name,
      email: brand.email,
      address: brand.address,
      phone: brand.phone,
      picUrl: brand.picUrl,
      status: brand.status,
      brandCode: brand.brandCode,
      brandBalance: brand.brandBalance,
      accountsCount: brand.brandAccounts?.length || 0,
      storesCount: brand.stores?.length || 0,
      productsCount: brand.products?.length || 0,
    };
  }
}