export interface Product {
  id?: number;
  name: string;
  description?: string;
  sku: string;
  price: number;
  cost: number;
  stockQuantity: number;
  minimumStock: number;
  categoryId?: number;
  category?: Category;
  status: 'active' | 'inactive';
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  sku: string;
  price: number;
  cost: number;
  stockQuantity: number;
  minimumStock: number;
  categoryId?: number;
  status: 'active' | 'inactive';
  imageUrl?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
