import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { UserDTO } from './user.dto/user.dto';
import { UserEntity } from './user.entity/user.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [{ DTOClass: UserDTO, EntityClass: UserEntity }],
    }),
  ],
})
export class UserModule {}