import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { UserEntity } from './user.entity/user.entity';
import { UserDTO, CreateUserInput } from './user.dto/user.dto';
import { ProductEntity } from '../product/product.entity/product.entity';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    @InjectQueryService(UserEntity) readonly service: QueryService<UserEntity>
  ) {}
  private readonly logger = new Logger(UserResolver.name);

  @Mutation(() => UserDTO)
  async createOneUser(@Args('input') input: CreateUserInput): Promise<UserDTO> {
    const user = UserEntity.create(input);
    await user.save();

     // Return user entity as UserDTO
     return user as unknown as UserDTO;
  }

  @Mutation(() => UserDTO)
  async addUserOrder(
    @Args('userName') userName: string,
    @Args('productName') productName: string,
  ): Promise<UserDTO> {
    this.logger.log(`Adding order for user: ${userName} with product: ${productName}`);

    // If the user doesn't exist, create one
    let user = await UserEntity.findOne({ where: {
      name: userName },
      relations: ['order'],
    });
    if (!user) {
      user = UserEntity.create({ name: userName, order: [] });
      await user.save();
    }

    // Look for the product and return an error if it doesn't exist
    const product = await ProductEntity.findOne({ where: { name: productName } });

    if (!product) {
      throw new Error(`Product not found: ${productName}`);
    }

    // Add product to user's order if it isn't already in the there
    if (product && !user.order.some(p => p.id === product.id)) {
      user.order.push(product);
      await user.save();
    }

    // Return user entity as UserDTO
    return user as unknown as UserDTO;
  }
  
  @Query(() => [UserDTO])
  async getUsersWithOrder(): Promise<UserDTO[]> {
    const users = await UserEntity.find({ relations: ['order'] });

    // Return user entities as UserDTOs
    return users.map(user => {
      const userDto = new UserDTO();
      Object.assign(userDto, user);
      return userDto;
    });
  }

}