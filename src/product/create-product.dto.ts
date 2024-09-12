import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TranslationDto {
    @IsNotEmpty()
    @IsString()
    language: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description?: string;
}

export class CreateProductDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TranslationDto)
    translations: TranslationDto[];
}
