import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity/user.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/product.entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [UserEntity, ProductEntity],
      synchronize: true,
    }),
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
