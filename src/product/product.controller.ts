import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { SearchProductDto } from './search-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Get('search')
    search(@Query() searchProductDto: SearchProductDto) {
        return this.productService.search(searchProductDto);
    }
}
