import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, ID, Float } from '@nestjs/graphql';

@ObjectType('Product')
export class ProductDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField(() => Float)
  price!: number;
}