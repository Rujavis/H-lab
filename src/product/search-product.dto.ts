import { IsOptional, IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class SearchProductDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    language?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;
}
