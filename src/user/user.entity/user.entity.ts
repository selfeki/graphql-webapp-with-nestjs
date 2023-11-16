import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { ProductEntity } from '../../product/product.entity/product.entity';
  
  @Entity()
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: string;
  
    @Column()
    name!: string;

    @Column()
    email!: string;
  
    @Column()
    age!: number;
  
    @ManyToMany(() => ProductEntity)
    @JoinTable()
    order!: ProductEntity[];
  
  }