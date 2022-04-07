import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

import { Report } from "src/reports/reports.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  afterInsert() {
    console.log("data Insert id ", this.id);
  }

  @AfterUpdate()
  afterUpdate() {
    console.log("data Update id ", this.id);
  }

  @AfterRemove()
  afterRemove() {
    console.log("data Remove id ", this.id);
  }
}
