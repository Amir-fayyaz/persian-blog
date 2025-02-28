import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSubscriptionEntity } from './user-subscription.entity';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'numeric', nullable: false })
  price: number;

  @Column({ type: 'numeric', nullable: false })
  durationDays: number;

  //relations
  @OneToMany(
    () => UserSubscriptionEntity,
    (Usersubscriptions) => Usersubscriptions.plan,
  )
  Usersubscriptions: UserSubscriptionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
