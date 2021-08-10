import { Args, Mutation, Parent, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';
import { AuthCredentialsDto } from './Args/auth-credentials.args';

@Resolver((of) => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthType)
  signup(@Args() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signup(authCredentialsDto);
  }

  @Mutation((returns) => AuthType)
  login(@Args() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }
}
