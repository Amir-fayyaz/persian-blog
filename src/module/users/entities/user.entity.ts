import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../contracts/userRole.enum';
import { ApiProperty } from '@nestjs/swagger';
import { PostReportEntity } from 'src/module/post/entities/postReport.entity';
import { LikeEntity } from 'src/module/post/entities/like.entity';
import { CommentEntity } from 'src/module/post/entities/comment.entity';
import { NotificationEntity } from './notification.entity';
import { PaymentEntity } from 'src/module/payment/entities/payment.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false, default: 'Guest' })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  @ApiProperty()
  mobile: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  @ApiProperty()
  role: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  avatar: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  // relations..
  @OneToMany(() => PostReportEntity, (postReport) => postReport.user)
  postReports: PostReportEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payments: PaymentEntity[];
}
