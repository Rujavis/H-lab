import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '',
      database: 'multilingual_product_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ใช้ synchronize สำหรับการพัฒนาเท่านั้น
    }),
    ProductModule,
  ],
})
export class AppModule { }
