import { ApiProperty } from '@nestjs/swagger';
import { AdminEntity } from 'src/module/auth/entities/admin.entity';
import { subCategoryEntity } from 'src/module/catogory/entities/subCategory.entity';
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
import { PostReportEntity } from './postReport.entity';

@Entity('post')
export class PostEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  thumbnail: string;

  @ApiProperty()
  @Column({ type: 'json' })
  gallery: string[];

  @ApiProperty()
  @Column({ type: 'varchar' })
  slug: string;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  views: number;

  @ApiProperty()
  @Column({ type: 'json' })
  tags: string[];

  // reloations
  @ManyToOne(() => subCategoryEntity, (subcategory) => subcategory.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subcategory' })
  subcategory: subCategoryEntity;

  @ManyToOne(() => AdminEntity, (admin) => admin.posts)
  @JoinColumn({ name: 'author' })
  author: AdminEntity;

  @OneToMany(() => PostReportEntity, (postReport) => postReport.post)
  postReports: PostReportEntity[];

  //timeStamps
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
