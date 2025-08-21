import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from '../../entities';

describe('ProductsService Pagination', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockRepository = {
    findAndCount: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll with pagination', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', code: 'P001' },
      { id: '2', name: 'Product 2', code: 'P002' },
    ] as Product[];

    it('should return paginated products with default pagination', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockProducts, 50]);

      const result = await service.findAll();

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        relations: ['category', 'brand'],
        skip: 0,
        take: 10,
        order: {
          displayOrder: 'ASC',
          name: 'ASC',
        },
      });

      expect(result.data).toEqual(mockProducts);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.total).toBe(50);
      expect(result.meta.totalPages).toBe(5);
    });

    it('should return paginated products with custom pagination', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockProducts, 50]);

      const result = await service.findAll({ page: 2, limit: 5 });

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        relations: ['category', 'brand'],
        skip: 5,
        take: 5,
        order: {
          displayOrder: 'ASC',
          name: 'ASC',
        },
      });

      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(5);
      expect(result.meta.total).toBe(50);
      expect(result.meta.totalPages).toBe(10);
      expect(result.meta.hasPreviousPage).toBe(true);
      expect(result.meta.hasNextPage).toBe(true);
    });

    it('should handle edge cases for pagination metadata', async () => {
      mockRepository.findAndCount.mockResolvedValue([mockProducts, 2]);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.meta.totalPages).toBe(1);
      expect(result.meta.hasPreviousPage).toBe(false);
      expect(result.meta.hasNextPage).toBe(false);
    });
  });
});