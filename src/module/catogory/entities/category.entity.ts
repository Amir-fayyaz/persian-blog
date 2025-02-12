import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { subCategoryEntity } from './subCategory.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('category')
export class CategoryEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => subCategoryEntity, (subCategory) => subCategory.category)
  subCategory: subCategoryEntity[];
}
