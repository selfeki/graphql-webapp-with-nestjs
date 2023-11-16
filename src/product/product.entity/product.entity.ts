import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class ProductEntity {
    @PrimaryGeneratedColumn()
    id!: string;
  
    @Column()
    name!: string;

    @Column('decimal')
    price!: number;
  
  }