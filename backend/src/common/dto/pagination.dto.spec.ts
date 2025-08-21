import { PaginationMetaDto, PaginatedResponseDto } from './pagination.dto';

describe('Pagination DTOs', () => {
  describe('PaginationMetaDto', () => {
    it('should calculate correct metadata for first page', () => {
      const meta = new PaginationMetaDto(1, 10, 50);

      expect(meta.page).toBe(1);
      expect(meta.limit).toBe(10);
      expect(meta.total).toBe(50);
      expect(meta.totalPages).toBe(5);
      expect(meta.hasPreviousPage).toBe(false);
      expect(meta.hasNextPage).toBe(true);
    });

    it('should calculate correct metadata for middle page', () => {
      const meta = new PaginationMetaDto(3, 10, 50);

      expect(meta.page).toBe(3);
      expect(meta.limit).toBe(10);
      expect(meta.total).toBe(50);
      expect(meta.totalPages).toBe(5);
      expect(meta.hasPreviousPage).toBe(true);
      expect(meta.hasNextPage).toBe(true);
    });

    it('should calculate correct metadata for last page', () => {
      const meta = new PaginationMetaDto(5, 10, 50);

      expect(meta.page).toBe(5);
      expect(meta.limit).toBe(10);
      expect(meta.total).toBe(50);
      expect(meta.totalPages).toBe(5);
      expect(meta.hasPreviousPage).toBe(true);
      expect(meta.hasNextPage).toBe(false);
    });

    it('should handle edge case with single page', () => {
      const meta = new PaginationMetaDto(1, 10, 5);

      expect(meta.totalPages).toBe(1);
      expect(meta.hasPreviousPage).toBe(false);
      expect(meta.hasNextPage).toBe(false);
    });

    it('should handle edge case with empty results', () => {
      const meta = new PaginationMetaDto(1, 10, 0);

      expect(meta.totalPages).toBe(0);
      expect(meta.hasPreviousPage).toBe(false);
      expect(meta.hasNextPage).toBe(false);
    });
  });

  describe('PaginatedResponseDto', () => {
    it('should create correct response structure', () => {
      const data = [{ id: 1, name: 'Test' }];
      const meta = new PaginationMetaDto(1, 10, 50);
      const response = new PaginatedResponseDto(data, meta);

      expect(response.data).toBe(data);
      expect(response.meta).toBe(meta);
    });
  });
});
