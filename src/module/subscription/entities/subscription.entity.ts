import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSubscriptionEntity } from './user-subscription.entity';
import { PaymentEntity } from 'src/module/payment/entities/payment.entity';

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

  @OneToMany(() => PaymentEntity, (payment) => payment.plan)
  payments: PaymentEntity[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
