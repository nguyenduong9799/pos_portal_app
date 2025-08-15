import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from '../../entities/Brand';

describe('BrandsService', () => {
  let service: BrandsService;
  let repository: Repository<Brand>;

  const mockBrandRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockBrand = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Brand',
    email: 'test@testbrand.com',
    address: '123 Test Street',
    phone: '+1234567890',
    picUrl: 'https://example.com/logo.png',
    status: 'Active',
    brandCode: 'TB001',
    brandBalance: 10000.50,
    brandAccounts: [],
    stores: [],
    products: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: mockBrandRepository,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    repository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      mockBrandRepository.find.mockResolvedValue([mockBrand]);

      const result = await service.findAll();

      expect(result).toEqual([
        {
          id: mockBrand.id,
          name: mockBrand.name,
          email: mockBrand.email,
          address: mockBrand.address,
          phone: mockBrand.phone,
          picUrl: mockBrand.picUrl,
          status: mockBrand.status,
          brandCode: mockBrand.brandCode,
          brandBalance: mockBrand.brandBalance,
          accountsCount: 0,
          storesCount: 0,
          productsCount: 0,
        },
      ]);
      expect(mockBrandRepository.find).toHaveBeenCalledWith({
        relations: ['brandAccounts', 'stores', 'products'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a brand when found', async () => {
      mockBrandRepository.findOne.mockResolvedValue(mockBrand);

      const result = await service.findOne(mockBrand.id);

      expect(result.id).toBe(mockBrand.id);
      expect(result.name).toBe(mockBrand.name);
      expect(mockBrandRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockBrand.id },
        relations: ['brandAccounts', 'stores', 'products', 'categories', 'menus'],
      });
    });

    it('should throw NotFoundException when brand not found', async () => {
      mockBrandRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create and return a new brand', async () => {
      const createBrandDto = {
        name: 'New Brand',
        email: 'new@brand.com',
        status: 'Active',
      };

      mockBrandRepository.create.mockReturnValue(mockBrand);
      mockBrandRepository.save.mockResolvedValue(mockBrand);
      mockBrandRepository.findOne.mockResolvedValue(mockBrand);

      const result = await service.create(createBrandDto);

      expect(result.name).toBe(mockBrand.name);
      expect(mockBrandRepository.create).toHaveBeenCalledWith(createBrandDto);
      expect(mockBrandRepository.save).toHaveBeenCalledWith(mockBrand);
    });
  });

  describe('update', () => {
    it('should update and return the brand', async () => {
      const updateBrandDto = { name: 'Updated Brand' };

      mockBrandRepository.findOne.mockResolvedValue(mockBrand);
      mockBrandRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(mockBrand.id, updateBrandDto);

      expect(result.id).toBe(mockBrand.id);
      expect(mockBrandRepository.update).toHaveBeenCalledWith(mockBrand.id, updateBrandDto);
    });

    it('should throw NotFoundException when brand not found for update', async () => {
      mockBrandRepository.findOne.mockResolvedValue(null);

      await expect(service.update('nonexistent-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the brand', async () => {
      mockBrandRepository.findOne.mockResolvedValue(mockBrand);
      mockBrandRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(mockBrand.id);

      expect(mockBrandRepository.delete).toHaveBeenCalledWith(mockBrand.id);
    });

    it('should throw NotFoundException when brand not found for deletion', async () => {
      mockBrandRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByStatus', () => {
    it('should return brands with specific status', async () => {
      mockBrandRepository.find.mockResolvedValue([mockBrand]);

      const result = await service.findByStatus('Active');

      expect(result).toHaveLength(1);
      expect(mockBrandRepository.find).toHaveBeenCalledWith({
        where: { status: 'Active' },
        relations: ['brandAccounts', 'stores', 'products'],
      });
    });
  });

  describe('findByBrandCode', () => {
    it('should return brand with specific brand code', async () => {
      mockBrandRepository.findOne.mockResolvedValue(mockBrand);

      const result = await service.findByBrandCode('TB001');

      expect(result?.brandCode).toBe('TB001');
      expect(mockBrandRepository.findOne).toHaveBeenCalledWith({
        where: { brandCode: 'TB001' },
        relations: ['brandAccounts', 'stores', 'products'],
      });
    });

    it('should return null when brand code not found', async () => {
      mockBrandRepository.findOne.mockResolvedValue(null);

      const result = await service.findByBrandCode('NONEXISTENT');

      expect(result).toBeNull();
    });
  });
});