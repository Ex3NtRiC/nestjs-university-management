import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { GqlRolesGuard } from 'src/auth/graphql-roles.guard';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { CreateHRArgs } from '../models/Args/create-hr.args';
import { HRService } from './hr.service';
import { HRType } from './hr.type';

@Resolver((of) => HRType)
export class HRResolver {
  constructor(
    private readonly hrService: HRService,
    private readonly authService: AuthService,
  ) {}

  @Query((returns) => HRType)
  getHRByEmail(@Args('email') email: string) {
    return this.hrService.getHRByEmail(email);
  }

  @Roles(Role.HR)
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @Query((returns) => [HRType])
  getHRs() {
    return this.hrService.getHRs();
  }
  @Mutation((returns) => HRType)
  createHR(@Args() createHRArgs: CreateHRArgs) {
    return this.hrService.createHR(createHRArgs);
  }
}
