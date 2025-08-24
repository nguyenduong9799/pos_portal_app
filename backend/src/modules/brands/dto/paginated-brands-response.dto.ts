import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto, PaginationMetaDto } from '../../../common/dto';
import { BrandResponseDto } from './brand-response.dto';

export class PaginatedBrandsResponseDto extends PaginatedResponseDto<BrandResponseDto> {
    @ApiProperty({
        description: 'Array of brands',
        type: [BrandResponseDto],
    })
    declare data: BrandResponseDto[];

    @ApiProperty({
        description: 'Pagination metadata',
        type: PaginationMetaDto,
    })
    declare meta: PaginationMetaDto;
}
