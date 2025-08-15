export class CreateBrandDto {
  name: string;
  email?: string | null;
  address?: string | null;
  phone?: string | null;
  picUrl?: string | null;
  status: string;
  brandCode?: string | null;
  brandBalance?: number | null;
}