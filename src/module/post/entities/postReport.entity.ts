import { UserEntity } from 'src/module/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('post_reports')
export class PostReportEntity {
  @ManyToOne(() => UserEntity, (user) => user.postReports)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.postReports)
  @JoinColumn({ name: 'post' })
  post: PostEntity;
}
