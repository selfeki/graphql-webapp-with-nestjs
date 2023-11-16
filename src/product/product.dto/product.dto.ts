import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, ID } from '@nestjs/graphql';

@ObjectType('ProductDTO')
export class ProductDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  price!: number;
}

