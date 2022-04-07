import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/users.entity";
@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean

  @Column()
  price: number;

  @Column()
  make: string; //型号

  @Column()
  model: string; //模型

  @Column()
  year: number; //年份

  @Column()
  lng: number; //经度

  @Column()
  lat: number; //纬度

  @Column()
  mileage: number; //公里数

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
