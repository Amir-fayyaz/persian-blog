import { Column, Entity, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otp')
export class OtpEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: Date;

  @BeforeInsert()
  setExpiresAt() {
    this.expiresAt = new Date(Date.now() + 2 * 60 * 1000);
  }
}
