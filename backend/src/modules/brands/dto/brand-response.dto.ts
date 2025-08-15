export class BrandResponseDto {
  id: string;
  name: string;
  email?: string | null;
  address?: string | null;
  phone?: string | null;
  picUrl?: string | null;
  status: string;
  brandCode?: string | null;
  brandBalance?: number | null;
  accountsCount?: number;
  storesCount?: number;
  productsCount?: number;
}