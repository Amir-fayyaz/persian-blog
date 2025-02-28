import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ImageDetailsDto } from 'src/module/post/admin/dto/image.dto';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'json', nullable: true })
  thumbnail: /*{ position: number; fullPath: string };*/ ImageDetailsDto;

  @Column({ type: 'boolean', default: false })
  SeenStatus: Boolean;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
