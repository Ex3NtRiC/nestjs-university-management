import { Field, ObjectType } from '@nestjs/graphql';
import { roles } from './roles.enum';

@ObjectType()
export class AuthType {
  @Field()
  email: string;

  password: string;

  @Field()
  role: roles;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  accessToken: string;
}
