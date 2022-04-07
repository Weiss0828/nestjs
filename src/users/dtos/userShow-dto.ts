import { Expose } from 'class-transformer';
//Expose表示要暴露的字段，用来获取信息时不让用户直接获得密码字段
export class userShowDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}
