import { subCategoryEntity } from 'src/module/catogory/entities/subCategory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar' })
  thumbnail: string;

  @Column({ type: 'json' })
  gallery: string[];

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'json' })
  tags: string[];

  // reloations
  @ManyToOne(() => subCategoryEntity, (subcategory) => subcategory.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategory' })
  subcategory: subCategoryEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
