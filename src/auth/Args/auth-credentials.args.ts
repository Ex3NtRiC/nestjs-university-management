import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class AuthCredentialsDto {
  @IsNotEmpty()
  @MinLength(4)
  @IsEmail()
  @Field()
  email!: string;

  @IsNotEmpty()
  @MinLength(4)
  @Field()
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is weak',
  // })
  password!: string;
}
