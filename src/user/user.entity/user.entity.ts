import {
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { ProductEntity } from '../../product/product.entity/product.entity';
  
  @Entity()
  export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string;
  
    @Column()
    name!: string;

    @Column({ nullable: true, type: 'varchar' }) // Nullable to handle user creation in UI
    email?: string;
  
    @Column({ nullable: true, type: 'int' }) // Nullable to handle user creation in UI 
    age?: number;
  
    @ManyToMany(() => ProductEntity)
    @JoinTable()
    order!: ProductEntity[];
  
  }