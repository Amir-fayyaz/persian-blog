import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from 'src/module/post/entities/post.entity';

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

  @OneToMany(() => PostEntity, (post) => post.subcategory)
  posts: PostEntity[];
}
