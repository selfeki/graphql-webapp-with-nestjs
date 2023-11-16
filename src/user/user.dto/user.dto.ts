import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { InputType, ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ProductDTO, } from '../../product/product.dto/product.dto';

@InputType()
export class CreateUserInput {
  @FilterableField()
  name!: string;

  @Field()
  email!: string;

  @Field(() => Int)
  age!: number;
}

@ObjectType('User')
export class UserDTO {
  @IDField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @Field({ nullable: true }) // Can be null if user was created via UI
  email?: string;

  @Field(() => Int, { nullable: true })  // Can be null if user was created via UI
  age?: number;

  @Field(() => [ProductDTO])
  order!: ProductDTO[];
}

