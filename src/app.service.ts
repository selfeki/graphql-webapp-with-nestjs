import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProductEntity } from './product/product.entity/product.entity';

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const count = await ProductEntity.count();
    if (count === 0) {
      // Seed sample data into Products entity if it's empty
      const products = [
        { name: 'Product1', price: 12.99 },
        { name: 'Product2', price: 29.99 },
      ];

      for (const productData of products) {
        const product = new ProductEntity();
        Object.assign(product, productData);
        await product.save();
      }

      console.log('Database Products table seeded with Product1 and Product2');
    }
  }
}