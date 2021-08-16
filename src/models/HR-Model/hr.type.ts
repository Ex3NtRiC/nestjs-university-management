import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('HR')
export class HRType {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field((type) => [String])
  roles: string[];
}
