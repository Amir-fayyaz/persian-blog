import { UserEntity } from 'src/module/users/entities/user.entity';
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
import { PostEntity } from './post.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'post' })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies)
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  replies: CommentEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
