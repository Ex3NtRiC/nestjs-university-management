import { Args, Mutation, Parent, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';
import { AuthCredentialsArg } from './Args/auth-credentials.args';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './jwt-auth.guard';

@Resolver((of) => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthType)
  signup(@Args() authCredentialsArg: AuthCredentialsArg) {
    return this.authService.signup(authCredentialsArg);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation((returns) => AuthType)
  login(@Args() authCredentialsArg: AuthCredentialsArg) {
    return this.authService.login(authCredentialsArg);
  }
}
