import { UserEntity } from 'src/module/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubscriptionEntity } from './subscription.entity';

@Entity('user-subscription')
export class UserSubscriptionEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: Boolean;
  //relations

  @ManyToOne(() => UserEntity, (user) => user.Usersubscriptions, {
    cascade: true,
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(
    () => SubscriptionEntity,
    (subscription) => subscription.Usersubscriptions,
    { cascade: true },
  )
  @JoinColumn({ name: 'plan' })
  plan: SubscriptionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
