import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private dataSource: DataSource,
    ) {}

    async onModuleInit() {
        const connection = this.dataSource;
        await connection.dropDatabase();
        await connection.synchronize();
    }

    async seed() {        
        await this.categoryRepository.save(categories);
        
        // Seed products
        for await (const product of products) {
            const category = await this.categoryRepository.findOneBy({ id: product.categoryId });
            const productInstance = new Product();
            productInstance.name = product.name;
            productInstance.image = product.image;
            productInstance.price = product.price;
            productInstance.inventory = product.inventory;
            productInstance.category = category!;

            await this.productRepository.save(productInstance);
        }
    }
}
