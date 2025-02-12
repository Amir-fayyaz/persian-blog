import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subcategory')
export class subCategoryEntity {
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

  @ApiProperty()
  @ManyToOne(() => CategoryEntity, (category) => category.subCategory)
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;
}
