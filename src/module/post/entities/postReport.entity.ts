import { UserEntity } from 'src/module/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('post_reports')
export class PostReportEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.postReports)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.postReports)
  @JoinColumn({ name: 'post' })
  post: PostEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
