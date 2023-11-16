import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, ID } from '@nestjs/graphql';
import { ProductDTO } from 'src/product/product.dto/product.dto';

@ObjectType('UserDTO')
export class UserDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField()
  email!: string;

  @FilterableField()
  age!: number;

  @FilterableField()
  order!: ProductDTO[];
}

