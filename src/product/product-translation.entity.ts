import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_translations')
export class ProductTranslation {
    @PrimaryColumn()
    product_id: number;

    @PrimaryColumn({ length: 2 })
    language: string; // ISO 639-1 language code

    @Column({ length: 255 })
    name: string;

    @Column('text', { nullable: true })
    description: string;

    @ManyToOne(() => Product, (product) => product.translations)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
