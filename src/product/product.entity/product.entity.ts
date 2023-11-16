import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;
  
    @Column()
    name!: string;

    @Column('decimal')
    price!: number;
  
  }