import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductTranslation } from './product-translation.entity';
import { CreateProductDto } from './create-product.dto';
import { SearchProductDto } from './search-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(ProductTranslation) private translationRepo: Repository<ProductTranslation>,
    ) { }

    async create(createProductDto: CreateProductDto) {
        const product = new Product();
        product.translations = createProductDto.translations.map((t) => {
            const translation = new ProductTranslation();
            translation.language = t.language;
            translation.name = t.name;
            translation.description = t.description;
            return translation;
        });
        return await this.productRepo.save(product);
    }

    async findOne(id: number) {
        return await this.productRepo.findOne({ where: { id }, relations: ['translations'] });
    }

    async search(searchProductDto: SearchProductDto) {
        const query = this.translationRepo
            .createQueryBuilder('translation')
            .leftJoinAndSelect('translation.product', 'product');

        if (searchProductDto.name) {
            query.andWhere('translation.name ILIKE :name', { name: `%${searchProductDto.name}%` });
        }

        if (searchProductDto.language) {
            query.andWhere('translation.language = :language', { language: searchProductDto.language });
        }

        return await query
            .skip((searchProductDto.page - 1) * 10)
            .take(10)
            .getMany();
    }
}
