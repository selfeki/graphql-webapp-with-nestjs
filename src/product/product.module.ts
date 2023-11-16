import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { ProductDTO } from './product.dto/product.dto';
import { ProductEntity } from './product.entity/product.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProductEntity])],
      resolvers: [{ DTOClass: ProductDTO, EntityClass: ProductEntity }],
    }),
  ],
})
export class ProductModule {}