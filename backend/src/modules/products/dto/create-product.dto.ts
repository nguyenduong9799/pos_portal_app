export class CreateProductDto {
  code: string;
  name: string;
  sellingPrice: number;
  picUrl?: string;
  status: string;
  historicalPrice: number;
  discountPrice: number;
  description?: string;
  displayOrder: number;
  size?: string;
  type: string;
  brandId?: string;
  categoryId?: string;
  parentProductId?: string;
}
