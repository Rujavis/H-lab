import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @OneToMany(() => ProductTranslation, (translation) => translation.product, { cascade: true })
    translations: ProductTranslation[];
}
