import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AuthType {
  @Field()
  email: string;

  password: string;

  @Field((type) => [String])
  roles: string[];

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  accessToken: string;
}
