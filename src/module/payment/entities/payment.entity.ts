import { SubscriptionEntity } from 'src/module/subscription/entities/subscription.entity';
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

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  authority: string;

  @Column({ type: 'numeric', nullable: false })
  amount: number;
  //relations

  @ManyToOne(() => UserEntity, (user) => user.payments, { cascade: true })
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.payments)
  @JoinColumn({ name: 'plan' })
  plan: SubscriptionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
