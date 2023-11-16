import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserDTO, CreateUserInput } from './user.dto/user.dto';
import { UserEntity } from './user.entity/user.entity';
import { UserResolver } from './user.resolver';
import { ProductEntity } from '../product/product.entity/product.entity';

@Module({
  providers: [UserResolver],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProductEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity, ProductEntity])],
      dtos: [{
        DTOClass: UserDTO,
        CreateDTOClass: CreateUserInput,
      }]
    }),
  ],
})
export class UserModule {}